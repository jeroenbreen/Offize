<?php
$server = "localhost";
$gebruiker = "root";
$wachtwoord = "root";
$db = "inn_office";

$mysqli = mysqli_connect($server,$gebruiker,$wachtwoord, $db); 
if($mysqli->set_charset("utf8")) {
    
}
?>
