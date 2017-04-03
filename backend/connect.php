<?php
//$server = "localhost";
//$user = "root";
//$password = "root";
//$db = "inn_office";

$server = "localhost";
$user = "homestead";
$password = "secret";
$db = "office";

$mysqli = mysqli_connect($server,$user,$password,$db);
if($mysqli->set_charset("utf8")) {

}
?>
