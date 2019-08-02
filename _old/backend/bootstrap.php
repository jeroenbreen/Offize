<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include ('connect.php');

$bootstrap = [
    "company"     => [],
    "projects"      => [],
    "contacts"      => [],
    "members"       => [],
    "comments"      => [],
    "documents"     => [],
    "lines"         => [],
    "todos"         => [],
    "mails"         => []
];

// companies
$query = "SELECT * FROM companies ORDER BY id";
$result = $mysqli -> query($query);
while ($record = $result -> fetch_array(MYSQLI_ASSOC)) {
    $bootstrap["company"] = $record;
}

// projects
$query = "SELECT * FROM projects ORDER BY projectId";
$result = $mysqli -> query($query);
while ($record = $result -> fetch_array(MYSQLI_ASSOC)) {
    $bootstrap["projects"][] = $record;
}

// contacts
$query = "SELECT * FROM contacts ORDER BY id";
$result = $mysqli -> query($query);
while ($record = $result -> fetch_array(MYSQLI_ASSOC)) {
    $bootstrap["contacts"][] = $record;
}

// members
$query = "SELECT * FROM team ORDER BY memberId";
$result = $mysqli -> query($query);
while ($record = $result -> fetch_array(MYSQLI_ASSOC)) {
    $bootstrap["members"][] = $record;
}

// comments
$query = "SELECT * FROM comments ORDER BY date DESC";
$result = $mysqli -> query($query);
while ($record = $result -> fetch_array(MYSQLI_ASSOC)) {
    $bootstrap["comments"][] = $record;
}

// documents
$query = "SELECT * FROM documents ORDER BY YEAR, NR DESC";
$result = $mysqli -> query($query);
while ($record = $result -> fetch_array(MYSQLI_ASSOC)) {
    $bootstrap["documents"][] = $record;
}

// lines
$query = "SELECT * FROM documentLines ORDER BY arrayOrder";
$result = $mysqli -> query($query);
while ($record = $result -> fetch_array(MYSQLI_ASSOC)) {
    $bootstrap["lines"][] = $record;
}

// todos
$query = "SELECT * FROM todos";
$result = $mysqli -> query($query);
while ($record = $result -> fetch_array(MYSQLI_ASSOC)) {
    $bootstrap["todos"][] = $record;
}

// mails
$query = "SELECT * FROM mails";
$result = $mysqli -> query($query);
while ($record = $result -> fetch_array(MYSQLI_ASSOC)) {
    $bootstrap["mails"][] = $record;
}

$mysqli -> close();

echo json_encode($bootstrap);
?>