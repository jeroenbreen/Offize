<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include ('connect.php');

$bootstrap = [
    "company"     => [],
    "projects"      => [],
    "clients"      => [],
    "employees"       => [],
    "comments"      => [],
    "documents"     => [],
    "lines"         => [],
    "mails"         => []
];

// companies
$query = "SELECT * FROM companies ORDER BY id";
$result = $mysqli -> query($query);
while ($record = $result -> fetch_array(MYSQLI_ASSOC)) {
    $bootstrap["company"] = $record;
}

// projects
$query = "SELECT * FROM projects ORDER BY id";
$result = $mysqli -> query($query);
while ($record = $result -> fetch_array(MYSQLI_ASSOC)) {
    $bootstrap["projects"][] = $record;
}

// clients
$query = "SELECT * FROM clients ORDER BY id";
$result = $mysqli -> query($query);
while ($record = $result -> fetch_array(MYSQLI_ASSOC)) {
    $bootstrap["clients"][] = $record;
}

// employees
$query = "SELECT * FROM employees ORDER BY id";
$result = $mysqli -> query($query);
while ($record = $result -> fetch_array(MYSQLI_ASSOC)) {
    $bootstrap["employees"][] = $record;
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

// mails
$query = "SELECT * FROM mails";
$result = $mysqli -> query($query);
while ($record = $result -> fetch_array(MYSQLI_ASSOC)) {
    $bootstrap["mails"][] = $record;
}

$mysqli -> close();

echo json_encode($bootstrap);
?>
