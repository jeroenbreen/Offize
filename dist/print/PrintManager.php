<?php
/**
 * Created by PhpStorm.
 * User: Arjen
 * Date: 03/04/2017
 * Time: 15:35
 */

use Dompdf\Dompdf;
use Dompdf\Options;

require __DIR__ . '/vendor/autoload.php';

class PrintManager
{
    protected $data, $total = 0, $subtotal = 0;

    public function handlePrint()
    {
        $data = file_get_contents("php://input");
        $this->data = json_decode($data);
        $this->data = $this->data->data;

        $options = new Options();
        $options->set('isRemoteEnabled', true);

        $dompdf = new Dompdf($options);

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

        $months = array("januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december");
        $this->month_nice = $months[$this->data->month - 1];

        $html = "";
        //$html .= $this->getGrid();
        $html .= $this->getTop();
        $html .= $this->getBody();
        $html .= $this->getTotal();
        $html .= $this->getFooter();
        $html .= $this->getClosing();
        return $html;
    }

    protected function getTop()
    {
        $html = "
             <HTML>
                 <HEAD>
                     <TITLE></TITLE>
                     <meta charset='utf-8'>
                     <link rel='StyleSheet' href='style.css' type='text/css' media='all'>
                 </HEAD>

                 <BODY>
                     <div class='pagewrap'>
                        <div class='document__header'>
                             <div id='identity'>
                                 <img src='" . $this->data->company->logoUrl . "'>
                             </div>

                             <div class='document__info'>
                                 <div class='document__date'>
                                     " . $this->data->day . " " . $this->month_nice . " " . $this->data->year . "
                                 </div>
                                 <div class='document__id'>
                                     " . $this->data->prefix . " <b>" . $this->data->slug . "</b>
                                 </div>
                             </div>
                        </div>

                        <div class='document__addresses'>
                            <div class='relative-wrapper'>
                                 <div class='document__addresses--left'>
                                     <div><b>" . $this->data->client->name . "</b></div>
                                     <div>" . $this->data->client->clientName . "</div>
                                     <div>" . $this->data->client->street  . "</div>
                                     <div>" . $this->data->client->zipcode . " " . $this->data->client->city . "</div>";
        if ($this->data->client->international == '1') {
             $html .= "<div>VAT: " . $this->data->client->vat . "</div>";
         }
         $html .= "
                                 </div>
                                 <div class='document__addresses--right'>
                                    <div><b>" . $this->data->company->name . "</b></div>";
        if ($this->data->company->companySameAsEmployee != '1') {
            $html .= "<div>" . $this->data->employee . "</div>";
        }
        $html .= "<div>" . $this->data->company->address . "</div>";
        if (strlen($this->data->company->addressExtra) > 0) {
            $html .= "<div>" . $this->data->company->addressExtra . "</div>";
        }
        $html .= "                   <div>" . $this->data->company->zipcode . " " . $this->data->company->city . "</div>";
        if ($this->data->client->international == '1') {
            $html .= "<div>" . $this->data->company->country . "</div>";
        }
        $html .= "

                                 </div>
                             </div>
                         </div>

                         <div class='document__title'>
                             <b>Betreft:</b> " . $this->data->title . "
                         </div>
         ";
        return $html;
    }

    protected function getGrid()
    {
        $html = "";
        $width = 9;
        $height = 8;
        $space = 20;
        $widthSz = 104.5;
        $heightSz = 184;

        for ($x = 0; $x < $width; $x++) {

            for ($y = 0; $y < $height; $y++) {
                $thisX = $x * ($widthSz + $space);
                $thisY = $y * ($heightSz + $space);
                $html .= "
                    <div class='grid-block' style='width:" . $widthSz . "px; height:" . $heightSz . "px; left:" . $thisX . "px; top:" . $thisY . "px;'></div>
                ";
            }
        }
        return $html;
    }


    protected function getFooter()
    {
        $html = "
            <div class='document__footer'>
                <div class='document__invoice-text'>";
                    if ($this->data->doctype == "invoice") {
                        if ($this->data->client->international == "1") {
                            $html .= $this->data->company->invoiceTextEnglish;
                        } else {
                            $html .= $this->data->company->invoiceText;
                        }
                    } else {
                        $html .= "Handtekening voor akkoord:";
                    }
                    $html .= "
                </div>
                <img src='" . $this->data->company->footerImageUrl . "'>
            </div>

            <div class='document__legal'>
                <div>
                    " . $this->data->company->name . " | KvK " . $this->data->company->coc . " | BTW " . $this->data->company->vat . "
                </div>
                <div>
                    <b>" . $this->data->company->bankName . "</b> | " . $this->data->company->bankAddress . " | IBAN: " . $this->data->company->iban . " | BIC: " . $this->data->company->bic . "
                </div>
            </div>";
        return $html;
    }

    protected function getClosing()
    {
        $html = "</div></BODY></HTML>";
        return $html;
    }

    protected function printLine($line) {
        $text = $line->{'text'};
        $hours = $line->{'hours'};
        $rate = $line->{'rate'};
        $amount = $line->{'amount'};
        $lineType = $line->{'lineType'};
        $html = "";
        if ($lineType == 'count') {
            $this->total += $rate * $hours;
            $this->subtotal += $rate * $hours;
            $html .= "
                <div class='lines-row'>
                    <div class='line-title'>
                        " . $text . "
                    </div>
                    <div class='line-amount'>
                        " . $hours . "
                    </div>
                    <div class='line-sign'>
                        ×
                    </div>
                    <div class='line-rate'>
                        " . $rate . "
                    </div>
                    <div class='line-sum'>
                        " . $this->nrToCur($hours * $rate) . " EUR
                    </div>
                </div>";
        }

        else if ($lineType == 'amount') {
        $this->total += $amount;
        $this->subtotal += $amount;
            $html .= "
                <div class='lines-row'>
                    <div class='line-title'>
                        " . $text  . "
                    </div>
                    <div class='line-right-part'>
                        " . $this->nrToCur($amount)  . " EUR
                    </div>
                </div>";
        }
        else if ($lineType == 'text') {
            $html .= "
                <div class='lines-row'>
                    <div class='line-full'>
                        " . $text . "
                    </div>
                </div>";
            }
            else if ($lineType == 'enter') {
            $html .= "<div class='line-break'></div>";
        }
        else if ($lineType == 'subtotal') {
            $html .= "
                <div class='subtotal-block'>
                    <div class='lines-row'>
                        <div class='line-title'>
                            Subtotaal
                        </div>
                        <div class='line-right-part'>
                            <b>" . $this->nrToCur($this->subtotal)  . "</b> EUR
                        </div>
                    </div>
                    <div class='lines-row'>
                        <div class='line-title'>
                            BTW 21%
                        </div>
                        <div class='line-right-part'>
                            " . $this->nrToCur($this->subtotal * 0.21)  . " EUR
                        </div>
                    </div>
                </div>";
                $this->subtotal = 0;
        }
        return $html;
    }

    protected function getBody()
    {
    $total = 0;
    $subtotal = 0;
        $html = "
            <div class='document__lines'>";
        for ($i = 0; $i < count($this->data->documentLines); $i++) {
            $line = $this->data->documentLines[$i];
                $html .= $this->printLine($line);
        }
        $html .= "</div>";
        return $html;
    }

    protected function getTotal()
    {
        $html = "";
        if (!$this->data->hideTotal){
            $html .= "
                <div id='total'>
                    <div class='lines-row'>
                        <div class='line-title'>
                            Totaal";
                        if ($this->data->doctype == "quotation") {
                            $html .= " (excl. 21% BTW)";
                        }

                        $html .= "
                        </div>
                        <div class='line-right-part'>
                            " . $this->nrToCur($this->total) . " EUR
                        </div>
                    </div>";
            if ($this->data->doctype === "invoice") {
                $html .= "
                    <div class='lines-row'>
                        <div class='line-title'>
                            BTW " .$this->data->vat . "%
                        </div>
                        <div class='line-right-part'>
                            " . $this->nrToCur($this->total * ($this->data->vat / 100)) . " EUR
                        </div>
                    </div>
                    <div class='lines-row'>
                        <div class='line-title'>
                            <div class='total-labal'>
                                Te betalen
                            </div>
                        </div>
                        <div class='line-right-part'>
                            <div class='total-labal'>
                                " . $this->nrToCur($this->total * (1 + ($this->data->vat / 100))) . " EUR
                            </div>
                        </div>
                    </div>
                ";

            }
            $html .= "</div>";
            return $html;
        }
    }

    protected function nrToCur ($value) {
        //setlocale("LC_MONETARY", "de_DE");
        return money_format("%!n", $value);
    }
}

