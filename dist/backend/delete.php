<?php
include ('connect.php');

$type = $_POST['type'];

if ($type == "project") { $query = deleteProject(); }
else if ($type == "document") { $query = deleteDocument(); }
else if ($type == "client") { $query = deleteClient(); }
else if ($type == "employee") { $query = deleteEmployee(); }
else if ($type == "comment") { $query = deleteComment(); }
else if ($type == "line") { $query = deleteLine(); }
else if ($type == "mail") { $query = deleteMail(); }


function deleteProject() {
    $id = $_POST['id'];
    $query = "DELETE FROM projects WHERE id = '" . $id . "'";
    return $query;
}

function deleteDocument() {
    $id = $_POST['id'];
    $query = "DELETE FROM documents WHERE id = '" . $id . "'";
    return $query;
}

function deleteClient() {
    $id = $_POST['id'];
    $query = "DELETE FROM clients WHERE id = '" . $id . "'";
    return $query;
}

function deleteEmployee() {
    $id = $_POST['id'];
    $query = "DELETE FROM employees WHERE id = '" . $id . "'";
    return $query;
}

function deleteComment() {
    $id = $_POST['id'];
    $query = "DELETE FROM comments WHERE id = '" . $id . "'";
    return $query;
}

function deleteLine() {
    $id = $_POST['id'];
    $query = "DELETE FROM documentLines WHERE id = '" . $id . "'";
    return $query;
}

function deleteMail() {
    $id = $_POST['id'];
    $query = "DELETE FROM mails WHERE id = '" . $id . "'";
    return $query;
}


$result = $mysqli->query ($query);
if ($result === false) {
    echo $mysqli->error;
} else {
$response = [];
    $response['id'] = mysqli_insert_id($mysqli);
    $response['message'] = $type . " verwijderd uit database";
    echo json_encode($response);
}
$mysqli->close();
?>



