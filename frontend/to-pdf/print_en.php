<?php
require_once ("dompdf/dompdf_config.inc.php");
include("../branding/branding.php");

$data = file_get_contents("php://input");
$objData = json_decode($data);

$jaar = $objData->data->{'jaar'}; 
$nr = $objData->data->{'nr'}; 

$klant_naam = $objData->data->klant->{'naam'}; 
$klant_contact = $objData->data->klant->{'contact'}; 
$klant_adres = $objData->data->klant->{'adres'}; 
$klant_postcode = $objData->data->klant->{'postcode'}; 

$bedrijf_contact = $objData->data->bedrijf->{'contact'}; 
$bedrijf_adres = $objData->data->bedrijf->{'adres'}; 
$bedrijf_postcode = $objData->data->bedrijf->{'postcode'}; 

$dag = $objData->data->datum->{'d'}; 
$maand = $objData->data->datum->{'m'}; 
$months = array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
$datum_maand = $months[$maand - 1];
$datum_jaar = $objData->data->datum->{'j'}; 

$btw = $objData->data->{'btw'}; 
$currency = $objData->data->{'currency'}; 

$omschrijving = $objData->data->{'omschrijving'}; 
$posten = $objData->data->{'posten'}; 

$type = $objData->data->{'type'}; 
$totaal = 0;

function nrToCur ($nr) {
    $cur = number_format($nr, 2);
    return $cur;
}

$html = "
    <HTML>
        <HEAD>
            <TITLE></TITLE>
            <meta charset='utf-8'>
            <link rel='StyleSheet' href='../css/style_pdf.css' type='text/css' media='all'>
        </HEAD>
        
        <BODY>
            <table id='header-table'>
                <tr>
                    <td class='half'>
                        <img class='header-logo' src='../branding/img/logo-big.png'>
                    </td>
                    <td id='info' class='half'>     
                        <b>Invoice " . $jaar . " - " . $nr . "</b><br>
                        " . $datum_maand . " " . $dag . " " . $datum_jaar . "</td>
                </tr>
                <tr>
                    <td>
                        <div id='klant'>
                            <b>" . $klant_naam . "</b><br>
                            " . $klant_contact . "<br>
                            " . $klant_adres . "<br>
                            " . $klant_postcode . "
                        </div>
                    </td>
                    <td>        
                        <div id='bedrijf'>
                            <b>" . $company_name ."</b><br>
                            " . $bedrijf_contact . "<br>
                            " . $bedrijf_adres . "<br>
                            " . $bedrijf_postcode . ", the Netherlands       
                        </div>      
                    </td>
                </tr>
                <tr>
                    <td colspan='2'>
                        <div id='betreft'>
                            <b>Concerns</b><br>
                            " . $omschrijving . "
                        </div>
                    </td>
                </tr>
            </table>
            
            <table id='werkzaamheden-table'><tr>
                    <td colspan='3' class='cell5'>
                        <b>Description</b>
                    </td>
                </tr>";
            
    for ($i = 0; $i < count($posten); $i++) {
        if ($posten[$i]->{'type'} == 'uren') {
            $titel = $posten[$i]->{'titel'};
            $uren = $posten[$i]->{'uren'};
            $tarief = $posten[$i]->{'tarief'};
            $totaal += $tarief * $uren;
            $html .= "
                <tr>
                    <td class='cell1'>
                        " . $titel . "
                    </td>
                    <td class='cell2'>
                        " . $uren . " x " . $tarief . " " . $currency ."
                    </td>
                    <td class='cell3'>
                        " . nrToCur($uren * $tarief) . " " . $currency ."
                    </td>
                </tr>";
        }
        else if ($posten[$i]->{'type'} == 'bedrag') {
            $titel = $posten[$i]->{'titel'};
            $bedrag = $posten[$i]->{'bedrag'};
            $totaal += $bedrag;
            $html .= "
                <tr>
                    <td colspan='2' class='cell4'>
                        " . $titel  . "
                    </td>
                    <td class='cell3'>
                        " . nrToCur($bedrag)  . " " . $currency ."
                    </td>
                </tr>";
        }
        else if ($posten[$i]->{'type'} == 'kopje') {
            $titel = $posten[$i]->{'titel'};
            $html .= "
                <tr>
                    <td colspan='3' class='cell5'>
                        " . $titel . "
                    </td>
                </tr>";
        }
        else if ($posten[$i]->{'type'} == 'text') {
            $content = $posten[$i]->{'content'};
            $html .= "
                <tr>
                    <td colspan='3' class='cell5'>
                        " . $content . "
                    </td>
                </tr>";
        }
        else if ($posten[$i]->{'type'} == 'enter') {
            $html .= "
                <tr>
                    <td colspan='3' class='cell5 spacer'>
                        &nbsp;
                    </td>
                </tr>";
        }
    } 
    
    $html .= "  
                <tr>
                    <td colspan='3' class='cell5 spacer'>
                        &nbsp;
                    </td>
                </tr>
                <tr>
                    <td colspan='2' class='cell4'>
                        Total
                    </td>
                    <td class='cell3'>
                        " . nrToCur($totaal) . " " . $currency ."
                    </td>
                </tr>";
                
    if ($type == "Factuur" && $btw == false) {
        $html .=
                "<tr>
                    <td colspan='2' class='cell4'>
                        VAT 21%
                    </td>
                    <td class='cell3'>
                        " . nrToCur($totaal * 0.21) . " EUR
                    </td>
                </tr>
                <tr>
                    <td colspan='2' class='cell4'>
                        <b>Total incl. VAT</b>
                    </td>
                    <td class='cell3'>
                        <b>" . nrToCur($totaal * 1.21) . " EUR</b>
                    </td>
                </tr>";
    }
                        
    $html .= "  
                
                
            </table>
            
            <table id='footer-table'>
                <tr>
                    <td>
                        <div id='footer'>";
                        
    if ($type == "Factuur") {
        $html .= "Please pay this amout to NL68INGB0006574232.";
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

$dompdf = new DOMPDF();
$dompdf -> load_html($html);
$dompdf -> set_paper("a4", "portrait");
$dompdf -> render();
$pdf = $dompdf->output();
$link = "../branding/uploads/" . $type . "-" . $jaar . "-" . $nr . ".pdf";
file_put_contents($link, $pdf);
echo $link;
//$dompdf -> stream($type . "-" . $jaar . "-" . $nr . ".pdf");
?>