<?php
$server = "localhost";
$user = "root";
$password = "root";
$db = "inn_office";

$mysqli = mysqli_connect($server,$user,$password,$db);
if($mysqli->set_charset("utf8")) {

}
?>
