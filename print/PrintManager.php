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
    protected $data;
    //, $type, $year, $nr, $address, $hideTotal, $doctype;

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

        $link = "pdf/" . $this->data->prefix . "-" . $this->data->slug . ".pdf";

        file_put_contents($link, $dompdf->output());
        echo $link;
    }

    protected function getHMTL()
    {
        $total = 0;
        $subtotal = 0;

        $months = array("januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december");
        $this->month_nice = $months[$this->data->month - 1];

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
                                <b>" . $this->data->prefix . " " . $this->data->slug . "</b><br>
                                  " . $this->data->day . " " . $this->month_nice . " " . $this->data->year . "
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div id='client'>
                                  <b>" . $this->data->contact->name . "</b><br>
                                  " . $this->data->contact->contactName . "<br>
                                  " . $this->data->contact->address  . "<br>
                                  " . $this->data->contact->zipcode . " " . $this->data->contact->city . "
                            </div>
                        </td>
                        <td>
                            &nbsp;
                        </td>
                        <td>
                            <div id='sender'>
                                  <b>" . $this->data->company->name . "</b><br>
                                  " . $this->data->member . "<br>
                                  " . $this->data->company->address . "<br>
                                  " . $this->data->company->zipcode . " " . $this->data->company->city . "
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
                    if ($this->data->{'doctype'} === "invoice") {
                        $html .= $this->data->company->invoiceText;
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
    $total = 0;
    $subtotal = 0;
        $html = "
            <div id='lines'>
                <table id='lines-table'>
                    <tr>
                        <td colspan='3' class='cell5'>
                            <b>Werkzaamheden</b>
                        </td>
                    </tr>";

            for ($i = 0; $i < count($this->data->lines); $i++) {
                $line = $this->data->lines[$i];
                $text = $line->{'text'};
                $hours = $line->{'hours'};
                $rate = $line->{'rate'};
                $amount = $line->{'amount'};
                $lineType = $line->{'lineType'};

                if ($lineType == 'count') {
                    $total += $rate * $hours;
                    $subtotal += $rate * $hours;
                    $html .= "
                    <tr>
                        <td class='cell1'>
                            " . $text . "
                        </td>
                        <td class='cell2'>
                            " . $hours . " × " . $rate . " EUR
                        </td>
                        <td class='cell3'>
                            " . $this->nrToCur($hours * $rate) . " EUR
                        </td>
                    </tr>";
                }
                else if ($lineType == 'amount') {
                    $total += $amount;
                    $subtotal += $amount;
                    $html .= "
                    <tr>
                        <td colspan='2' class='cell4'>
                            " . $text  . "
                        </td>
                        <td class='cell3'>
                            " . $this->nrToCur($amount)  . " EUR
                        </td>
                    </tr>";
                }
                else if ($lineType == 'text') {
                    $html .= "
                    <tr>
                        <td colspan='3' class='cell5'>
                            " . $text . "
                        </td>
                    </tr>";
                }
                else if ($lineType == 'enter') {
                    $html .= "
                    <tr>
                        <td colspan='3' class='cell5 spacer'>
                            &nbsp;
                        </td>
                    </tr>";
                }
                else if ($lineType == 'subtotal') {
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

            if (!$this->data->hideTotal){
                $html .= "
                        <tr>
                            <td colspan='3' class='cell5 spacer'>
                                &nbsp;
                            </td>
                        </tr>
                        <tr>
                            <td colspan='2' class='cell4'>
                                Totaal";
                if ($this->data->doctype == "quotation") {
                    $html .= " (excl. 21% BTW)";
                }

                $html .= "      </td>
                            <td class='cell3'>
                                " . $this->nrToCur($total) . " EUR
                            </td>
                        </tr>";
                if ($this->data->doctype === "invoice") {
                    $html .=
                        "<tr>
                            <td colspan='2' class='cell4'>
                                BTW " .$this->data->vat . "%
                            </td>
                            <td class='cell3'>
                                " . $this->nrToCur($total * ($this->data->vat / 100)) . " EUR
                            </td>
                        </tr>
                        <tr>
                            <td colspan='2' class='cell4'>
                                <b>Te betalen</b>
                            </td>
                            <td class='cell3'>
                                <b>" . $this->nrToCur($total * (1 + ($this->data->vat / 100))) . " EUR</b>
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

