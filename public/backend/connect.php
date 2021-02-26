<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$server = "localhost";
$user = "root";
$password = "root";
$db = "inn_office";

$mysqli = mysqli_connect($server,$user,$password,$db);
if($mysqli->set_charset("utf8")) {

}
?>
