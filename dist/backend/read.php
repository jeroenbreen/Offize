<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include ('connect.php');

$data = [];

$type = $_POST['type'];
$id = $_POST['id'];

if ($type == "documentLines")   { $query = readDocumentLines($id); } else
if ($type == "comments")   { $query = readComments($id); }



function readDocumentLines($documentId) {
    return "SELECT * FROM documentLines WHERE documentId = '" . $documentId . "'";
}

function readComments($projectId) {
    return "SELECT * FROM comments WHERE projectId = '" . $projectId . "'";
}


$result = $mysqli -> query($query);

while ($record = $result -> fetch_array(MYSQLI_ASSOC)) {
    $data[] = $record;
}

$mysqli -> close();

echo json_encode($data);
?>
