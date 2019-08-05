<?php
include ('connect.php');

$type = $_POST['type'];
if ($type == "project") { $query = deleteProject(); }
else if ($type == "document") { $query = deleteDocument(); }
else if ($type == "contact") { $query = deleteContact(); }
else if ($type == "member") { $query = deleteEmployee(); }
else if ($type == "comment") { $query = deleteComment(); }
else if ($type == "hour") { $query = deleteHour(); }
else if ($type == "line") { $query = deleteLine(); }
else if ($type == "block") { $query = deleteBlock(); }
else if ($type == "activity") { $query = deleteActivity(); }
else if ($type == "todo") { $query = deleteTodo(); }
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

function deleteContact() {
    $id = $_POST['id'];
    $query = "DELETE FROM contacts WHERE id = '" . $id . "'";
    return $query;
}

function deleteEmployee() {
    $id = $_POST['id'];
    $query = "DELETE FROM team WHERE id = '" . $id . "'";
    return $query;
}

function deleteComment() {
    $id = $_POST['id'];
    $query = "DELETE FROM comments WHERE id = '" . $id . "'";
    return $query;
}

function deleteHour() {
    $hourId = $_POST['hourId'];
    $query = "DELETE FROM hours WHERE hourId = '" . $hourId . "'";
    return $query;
}

function deleteLine() {
    $id = $_POST['id'];
    $query = "DELETE FROM documentLines WHERE id = '" . $id . "'";
    return $query;
}

function deleteActivity() {
    $id = $_POST['id'];
    $query = "DELETE FROM activities WHERE id = '" . $id . "'";
    return $query;
}

function deleteBlock() {
    $id = $_POST['id'];
    $query = "DELETE FROM blocks WHERE id = '" . $id . "'";
    return $query;
}

function deleteTodo() {
    $id = $_POST['id'];
    $query = "DELETE FROM todos WHERE id = '" . $id . "'";
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
    echo $type. " verwijderd uit database";
}
$mysqli->close();
?>



