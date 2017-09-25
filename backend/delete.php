<?php
include ('connect.php');

$type = $_POST['type'];
if ($type == "project") { $query = deleteProject(); }
else if ($type == "document") { $query = deleteDocument(); }
else if ($type == "contact") { $query = deleteContact(); }
else if ($type == "team") { $query = deleteTeam(); }
else if ($type == "comments") { $query = deleteComment(); }
else if ($type == "hours") { $query = deleteHours(); }


function deleteProject() {
    $projectId = $_POST['projectId'];
    $query = "DELETE FROM projects WHERE projectId = '" . $projectId . "'";
    return $query;
}

function deleteDocument() {
    $id = $_POST['id'];
    $query = "DELETE FROM documents WHERE id = '" . $id . "'";
    return $query;
}

function deleteContact() {
    $contactId = $_POST['contactId'];
    $query = "DELETE FROM contacts WHERE contactId = '" . $contactId . "'";
    return $query;
}

function deleteTeam() {
    $memberId = $_POST['memberId'];
    $query = "DELETE FROM team WHERE memberId = '" . $memberId . "'";
    return $query;
}

function deleteComment() {
    $id = $_POST['id'];
    $query = "DELETE FROM comments WHERE id = '" . $id . "'";
    return $query;
}

function deleteHours() {
    $hourId = $_POST['hourId'];
    $query = "DELETE FROM hours WHERE hourId = '" . $hourId . "'";
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



