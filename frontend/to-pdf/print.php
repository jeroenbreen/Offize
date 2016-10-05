<?php
require_once ("dompdf/dompdf_config.inc.php");

$data = file_get_contents("php://input");
$objData = json_decode($data);

$year = $objData->data->{'year'};
$nr = $objData->data->{'nr'};

$client_name = $objData->data->client->{'name'};
$client_contact_person = $objData->data->client->{'contactPerson'};
$client_address = $objData->data->client->{'address'};
$client_zipcode = $objData->data->client->{'zipcode'};

$sender_contact_person = $objData->data->sender->{'contactPerson'};
$sender_address = $objData->data->sender->{'address'};
$sender_zipcode = $objData->data->sender->{'zipcode'};

$day = $objData->data->date->{'day'};
$month = $objData->data->date->{'month'};
$months = array("januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december");
$date_month = $months[$month - 1];
$date_year = $objData->data->date->{'year'};

$vat = $objData->data->{'vat'};
$title = $objData->data->{'title'};
$lines = $objData->data->{'lines'};

$doctype= $objData->data->{'doctype'};
if ($doctype == 'invoices') {
    $type = 'Factuur';
} else {
    $type = 'Offerte';
}

$total = 0;
$subtotal = 0;

$hideTotal = $objData->data->{'hideTotal'};

function nrToCur ($nr) {
    $cur = number_format($nr, 2);
    return $cur;
}


$html = "
    <HTML>
        <HEAD>
            <TITLE></TITLE>
            <meta charset='utf-8'>
            <link rel='StyleSheet' href='style.css' type='text/css' media='all'>
        </HEAD>

        <BODY>
            <table id='header-table'>
                <tr>
                    <td class='half'>
                        <img class='header-logo' src='../../frontend/assets/img/logo-big.png'>
                    </td>
                    <td id='info' class='half'>
                        <b>" . $type . " " . $year . " - " . $nr . "</b><br>
                        " . $day . " " . $date_month . " " . $date_year . "</td>
                </tr>
                <tr>
                    <td>
                        <div id='client'>
                            <b>" . $client_name . "</b><br>
                            " . $client_contact_person . "<br>
                            " . $client_address . "<br>
                            " . $client_zipcode . "
                        </div>
                    </td>
                    <td>
                        <div id='sender'>
                            <b>Innouveau</b><br>
                            " . $sender_contact_person . "<br>
                            " . $sender_address . "<br>
                            " . $sender_zipcode . "
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan='2'>
                        <div id='title'>
                            <b>Betreft</b><br>
                            " . $title . "
                        </div>
                    </td>
                </tr>
            </table>

            <table id='lines-table'><tr>
                    <td colspan='3' class='cell5'>
                        <b>Werkzaamheden</b>
                    </td>
                </tr>";

    for ($i = 0; $i < count($lines); $i++) {
        if ($lines[$i]->{'type'} == 'count') {
            $title = $lines[$i]->{'title'};
            $hours = $lines[$i]->{'hours'};
            $rate = $lines[$i]->{'rate'};
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
                        " . nrToCur($hours * $rate) . " EUR
                    </td>
                </tr>";
        }
        else if ($lines[$i]->{'type'} == 'amount') {
            $title = $lines[$i]->{'title'};
            $amount = $lines[$i]->{'amount'};
            $total += $amount;
            $subtotal += $amount;
            $html .= "
                <tr>
                    <td colspan='2' class='cell4'>
                        " . $title  . "
                    </td>
                    <td class='cell3'>
                        " . nrToCur($amount)  . " EUR
                    </td>
                </tr>";
        }
        else if ($lines[$i]->{'type'} == 'text') {
            $title = $lines[$i]->{'text'};
            $html .= "
                <tr>
                    <td colspan='3' class='cell5'>
                        " . $title . "
                    </td>
                </tr>";
        }
        else if ($lines[$i]->{'type'} == 'enter') {
            $html .= "
                <tr>
                    <td colspan='3' class='cell5 spacer'>
                        &nbsp;
                    </td>
                </tr>";
        }
        else if ($lines[$i]->{'type'} == 'subtotal') {
            $html .= "
            <tr class='sub-spacer'>
                <td colspan='2'></td>
            </tr>
            <tr class='subtotal-1'>
                <td colspan='2' class='cell4'>
                    <b>Subtotaal</b>
                </td>
                <td class='cell3 subtotal-sum'>
                    <b>" . nrToCur($subtotal)  . "</b> EUR
                </td>
            </tr>
            <tr class='subtotal-2'>
                <td colspan='2' class='cell4'>
                    BTW 21%
                </td>
                <td class='cell3'>
                    " . nrToCur($subtotal * 0.21)  . " EUR
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
                            " . nrToCur($total) . " EUR
                        </td>
                    </tr>";
        if ($type == "Factuur" && $vat == false) {
            $html .=
                    "<tr>
                        <td colspan='2' class='cell4'>
                            BTW 21%
                        </td>
                        <td class='cell3'>
                            " . nrToCur($total * 0.21) . " EUR
                        </td>
                    </tr>
                    <tr>
                        <td colspan='2' class='cell4'>
                            <b>Te betalen</b>
                        </td>
                        <td class='cell3'>
                            <b>" . nrToCur($total * 1.21) . " EUR</b>
                        </td>
                    </tr>";
        }
    }

    $html .= "

            </table>

            <table id='footer-table'>
                <tr>
                    <td>
                        <div id='footer'>";

    if ($type == "Factuur") {
        $html .= "Gelieve dit bedrag binnen 4 weken over te maken o.v.v. factuurnr en afzender op NL 68 ING B000 657 42 32 t.n.v. Innouveau, te Rotterdam<br>Innouveau | KvK 61118389 | BTW NL854214902B01";
    }
    if ($type == "Offerte") {
        $html .= "Handtekening voor akkoord:";
    }

    $html .= "
                        </div>
                    </td>
                </tr>
            </table>

        </BODY>
    </HTML>";

//echo $html;

$dompdf = new DOMPDF();
$dompdf -> load_html($html);
$dompdf -> set_paper("a4", "portrait");
$dompdf -> render();
$pdf = $dompdf->output();
$link = "uploads/" . $type . "-" . $year . "-" . $nr . ".pdf";
file_put_contents("../" . $link, $pdf);
echo "frontend/" . $link;
?>