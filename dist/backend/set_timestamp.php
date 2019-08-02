<?php
include ('connect.php');
$timestamp = date("U");

// write stuff in database
$query="INSERT INTO timestamp (timestamp) VALUES ('$timestamp')";


$result = $mysqli->query($query);
if ($result === false) {
    echo '<p>Er is een fout opgetreden:
          <br />Foutmelding: ' . mysql_error() . '
          <br />Query: ' . $query . '</p>';
} else {
    echo $timestamp;
}
$mysqli->close();
