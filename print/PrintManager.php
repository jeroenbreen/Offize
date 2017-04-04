<?php
/**
 * Created by PhpStorm.
 * User: Arjen
 * Date: 03/04/2017
 * Time: 15:35
 */

use Dompdf\Dompdf;

require __DIR__ . '/../vendor/autoload.php';

class PrintManager
{
    protected $data, $type, $year, $nr, $address, $hideTotal;

    public function handlePrint()
    {
        $data = file_get_contents("php://input");
        $this->data = json_decode($data);
        $this->data = $this->data->data;

        $dompdf = new Dompdf();

        $dompdf->loadHtml($this->getHMTL());

        $dompdf->setPaper('A4', 'portrait');
        $dompdf->set_option( 'dpi' , '150' );
        $dompdf->render();

        $link = "pdf/" . $this->type . "-" . $this->year . "-" . $this->nr . ".pdf";

        file_put_contents($link, $dompdf->output());
        echo $link;
    }

    protected function getHMTL()
    {
        $total = 0;
        $subtotal = 0;

        $months = array("januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december");
        $this->date_month = $months[$this->data->date->month - 1];
        $this->year = $this->data->date->year;
        $this->nr = $this->data->nr;

        $this->address = (isset($this->data->client->address))? $this->data->client->address : '-';

        $doctype = $this->data->{'doctype'};
        $hideTotal = false;
        if ($doctype == 'invoices') {
            $type = 'Factuur';
            $this->type = $type;
        } else {
            $hideTotal = $this->data->{'hideTotal'};
            $type = 'Offerte';
            $this->type = $type;
        }


        $html = "";
        $html .= $this->getHead();
        $html .= $this->getTop();
        $html .= $this->getBody();
        $html .= $this->getFooter();
        $html .= $this->getClosing();
        return $html;
    }

    protected function getHead()
    {
        $html = "
             <HTML>
                 <HEAD>
                     <TITLE></TITLE>
                     <meta charset='utf-8'>
                     <link rel='StyleSheet' href='style.css' type='text/css' media='all'>
                 </HEAD>

                 <BODY>
                     <div class='pagewrap'>";
        return $html;
    }

    protected function getTop()
    {
        $html = "
            <div id='header'>
                <table id='header-table'>
                    <tr>
                        <td valign='top' class='half'>
                            <img id='header-logo' src='logo-print.png'>
                        </td>
                        <td class='header-table-spacer'>
                            &nbsp;
                        </td>
                        <td valign='top' class='half'>
                            <div id='document-info'>
                                <b>" . $this->type . " " . $this->data->date->year . " - " . $this->data->nr . "</b><br>
                                  " . $this->data->date->day . " " . $this->date_month . " " . $this->data->date->year . "
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div id='client'>
                                  <b>" . $this->data->client->name . "</b><br>
                                  " . $this->data->client->contactPerson . "<br>
                                  " . $this->address  . "<br>
                                  " . $this->data->client->zipcode . "
                            </div>
                        </td>
                        <td>
                            &nbsp;
                        </td>
                        <td>
                            <div id='sender'>
                                  <b>Innouveau</b><br>
                                  " . $this->data->sender->contactPerson . "<br>
                                  " . $this->data->sender->address . "<br>
                                  " . $this->data->sender->zipcode . "
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan='3'>
                            <div id='title'>
                                  <b>Betreft</b><br>
                                  " . $this->data->title . "
                            </div>
                        </td>
                    </tr>
                </table>
            </div>";
        return $html;
    }

    protected function getFooter()
    {
        $html = "
            <div id='footer'>
                <div id='footer-text'>";
                    if ($this->data->{'doctype'} === "invoices") {
                        $html .= "Gelieve dit bedrag binnen 4 weken over te maken o.v.v. factuurnr en afzender op NL 68 ING B000 657 42 32 t.n.v. Innouveau, te Rotterdam<br>Innouveau | KvK 61118389 | BTW NL854214902B01";
                    } else {
                        $html .= "Handtekening voor akkoord:";
                    }
                    $html .= "
                </div>
            </div>";
        return $html;
    }

    protected function getClosing()
    {
        $html = "</div></BODY></HTML>";
        return $html;
    }

    protected function getBody()
    {
        $html = "
            <div id='lines'>
                <table id='lines-table'>
                    <tr>
                        <td colspan='3' class='cell5'>
                            <b>Werkzaamheden</b>
                        </td>
                    </tr>";

            for ($i = 0; $i < count($this->data->lines); $i++) {
                if ($this->data->lines[$i]->{'type'} == 'count') {
                    $title = $this->data->lines[$i]->{'title'};
                    $hours = $this->data->lines[$i]->{'hours'};
                    $rate = $this->data->lines[$i]->{'rate'};
                    $total += $rate * $hours;
                    $subtotal += $rate * $hours;
                    $html .= "
                    <tr>
                        <td class='cell1'>
                            " . $title . "
                        </td>
                        <td class='cell2'>
                            " . $hours . " × " . $rate . " EUR
                        </td>
                        <td class='cell3'>
                            " . $this->nrToCur($hours * $rate) . " EUR
                        </td>
                    </tr>";
                }
                else if ($this->data->lines[$i]->{'type'} == 'amount') {
                    $title = $this->data->lines[$i]->{'title'};
                    $amount = $this->data->lines[$i]->{'amount'};
                    $total += $amount;
                    $subtotal += $amount;
                    $html .= "
                    <tr>
                        <td colspan='2' class='cell4'>
                            " . $title  . "
                        </td>
                        <td class='cell3'>
                            " . $this->nrToCur($amount)  . " EUR
                        </td>
                    </tr>";
                }
                else if ($this->data->lines[$i]->{'type'} == 'text') {
                    $title = $this->data->lines[$i]->{'text'};
                    $html .= "
                    <tr>
                        <td colspan='3' class='cell5'>
                            " . $title . "
                        </td>
                    </tr>";
                }
                else if ($this->data->lines[$i]->{'type'} == 'enter') {
                    $html .= "
                    <tr>
                        <td colspan='3' class='cell5 spacer'>
                            &nbsp;
                        </td>
                    </tr>";
                }
                else if ($this->data->lines[$i]->{'type'} == 'subtotal') {
                    $html .= "
                <tr class='sub-spacer'>
                    <td colspan='2'></td>
                </tr>
                <tr class='subtotal-1'>
                    <td colspan='2' class='cell4'>
                        <b>Subtotaal</b>
                    </td>
                    <td class='cell3 subtotal-sum'>
                        <b>" . $this->nrToCur($subtotal)  . "</b> EUR
                    </td>
                </tr>
                <tr class='subtotal-2'>
                    <td colspan='2' class='cell4'>
                        BTW 21%
                    </td>
                    <td class='cell3'>
                        " . $this->nrToCur($subtotal * 0.21)  . " EUR
                    </td>
                </tr>
                <tr class='sub-spacer'>
                    <td colspan='2'></td>
                </tr>";
                    $subtotal = 0;
                }
            }

            if (!$hideTotal){
                $html .= "
                        <tr>
                            <td colspan='3' class='cell5 spacer'>
                                &nbsp;
                            </td>
                        </tr>
                        <tr>
                            <td colspan='2' class='cell4'>
                                Totaal";

                if ($type == "Offerte") {
                    $html .= " (excl. 21% BTW)";
                }

                $html .= "      </td>
                            <td class='cell3'>
                                " . $this->nrToCur($total) . " EUR
                            </td>
                        </tr>";
                if ($this->data->{'doctype'} === "invoices" && $this->data->vat == false) {
                    $html .=
                        "<tr>
                            <td colspan='2' class='cell4'>
                                BTW 21%
                            </td>
                            <td class='cell3'>
                                " . $this->nrToCur($total * 0.21) . " EUR
                            </td>
                        </tr>
                        <tr>
                            <td colspan='2' class='cell4'>
                                <b>Te betalen</b>
                            </td>
                            <td class='cell3'>
                                <b>" . $this->nrToCur($total * 1.21) . " EUR</b>
                            </td>
                        </tr>";
                }
            }

            $html .= "</table></div>";
        return $html;
    }

    protected function nrToCur ($nr) {
        $cur = number_format($nr, 2);
        return $cur;
    }
}

