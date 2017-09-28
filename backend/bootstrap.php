<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include ('connect.php');

$bootstrap = [
    "configuration" => [],
    "projects"      => [],
    "contacts"      => [],
    "members"       => [],
    "comments"      => [],
    "documents"     => [],
    "lines"         => [],
    "jobCategories" => [],
    "jobs"          => [],
    "blocks"        => [],
    "clocks"        => []
];

// read configuration table
$query = "SELECT * FROM configuration ORDER BY id";
$result = $mysqli -> query($query);
while ($record = $result -> fetch_array(MYSQLI_ASSOC)) {
    $bootstrap["configuration"] = $record;
}

// projects
$query = "SELECT * FROM projects ORDER BY projectId";
$result = $mysqli -> query($query);
while ($record = $result -> fetch_array(MYSQLI_ASSOC)) {
    $bootstrap["projects"][] = $record;
}

// contacts
$query = "SELECT * FROM contacts ORDER BY contactid";
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

// jobCategories
$query = "SELECT * FROM jobCategories";
$result = $mysqli -> query($query);
while ($record = $result -> fetch_array(MYSQLI_ASSOC)) {
    $bootstrap["jobCategories"][] = $record;
}

// jobs
$query = "SELECT * FROM jobs";
$result = $mysqli -> query($query);
while ($record = $result -> fetch_array(MYSQLI_ASSOC)) {
    $bootstrap["jobs"][] = $record;
}

// blocks
$query = "SELECT * FROM blocks";
$result = $mysqli -> query($query);
while ($record = $result -> fetch_array(MYSQLI_ASSOC)) {
    $bootstrap["blocks"][] = $record;
}

// clocks
$query = "SELECT * FROM clocks";
$result = $mysqli -> query($query);
while ($record = $result -> fetch_array(MYSQLI_ASSOC)) {
    $bootstrap["clocks"][] = $record;
}

$mysqli -> close();

echo json_encode($bootstrap);
?>
