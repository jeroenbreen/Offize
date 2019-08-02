<?php
include ('connect.php');



// read timestamp
$query = "SELECT * FROM timestamp ORDER BY id DESC LIMIT 1";
$result = $mysqli -> query($query);
while ($record = $result -> fetch_array()) {
    $timestamp = $record["timestamp"];
}

// Output
$mysqli -> close();
echo $timestamp;