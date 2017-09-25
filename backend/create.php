<?php
include ('connect.php');


$type = $_POST['type'];
if ($type == "project") { $query = insertProject(); }
else if ($type == "document") { $query = insertDocument(); }
else if ($type == "contact") { $query = insertContact(); }
else if ($type == "team") { $query = insertTeam(); }
else if ($type == "comments") { $query = insertComment(); }
else if ($type == "hours") { $query = insertHours(); }


function insertProject() {
    $projectName = $_POST['projectName'];
    $projectStatus = $_POST['projectStatus'];
    $contactId = $_POST['contactId'];
    $memberId = $_POST['memberId'];
    $hours = $_POST['hours'];
    $rate = $_POST['rate'];
    $discount = $_POST['discount'];
    $currency = $_POST['currency'];
    $year = $_POST['year'];
    $finished = $_POST['finished'];
    $query="INSERT INTO projects
    (projectName, projectStatus, contactId, memberId, hours, rate, discount, currency, year, finished)
    VALUES (
    '". $projectName ."'  ,
    '". $projectStatus ."' ,
    '". $contactId ."'  ,
    '". $memberId ."' ,
    '". $hours ."'  ,
    '". $rate ."' ,
    '". $discount ."'  ,
    '". $currency ."'  ,
    '". $year ."' ,
    '". $finished ."'
    )";
    return $query;
}

function insertDocument() {
    $clientName = $_POST['clientName'];
    $projectId = $_POST['projectId'];
    $doctype = $_POST['doctype'];
    $currency = $_POST['currency'];
    $english = $_POST['english'];
    $hideTotal = $_POST['hideTotal'];
    $locked = $_POST['locked'];
    $nr = $_POST['nr'];
    $paid = $_POST['paid'];
    $memberId = $_POST['memberId'];
    $title = $_POST['title'];
    $vat = $_POST['vat'];
    $year = $_POST['year'];
    $month = $_POST['month'];
    $day = $_POST['day'];
    $rate = $_POST['rate'];
    $query="INSERT INTO documents
    (clientName, projectId, doctype, currency, english, hideTotal, locked, nr, paid, memberId, title, vat, year, month, day, rate)
    VALUES (
    '". $clientName ."'  ,
    '". $projectId ."'  ,
    '". $doctype ."'  ,
    '". $currency ."'  ,
    '". $english ."'  ,
    '". $hideTotal ."'  ,
    '". $locked ."'  ,
    '". $nr ."'  ,
    '". $paid ."'  ,
    '". $memberId ."'  ,
    '". $title ."'  ,
    '". $vat ."'  ,
    '". $year ."'  ,
    '". $month ."'  ,
    '". $day ."'  ,
    '". $rate ."'
    )";
    return $query;
}

function insertContact() {
    $name = $_POST['name'];
    $contactPerson = $_POST['contactPerson'];
    $street = $_POST['street'];
    $zipcode = $_POST['zipcode'];
    $city = $_POST['city'];
    $web = $_POST['web'];
    $email = $_POST['email'];
    $telephone = $_POST['telephone'];
    $rate = $_POST['rate'];
    $info = $_POST['info'];
    $query="INSERT INTO contacts 
    (name, contactPerson, street, zipcode, city, web, email, telephone, rate, info)
    VALUES (
    '". $name ."'  ,
    '". $contactPerson ."' ,
    '". $street ."'  ,
    '". $zipcode ."' ,
    '". $city ."'  ,
    '". $web ."' ,
    '". $email ."'  ,
    '". $telephone ."' ,
    '". $rate ."'  ,
    '". $info ."'
    )";
    return $query;
}

function insertTeam() {
    $memberId = $_POST['memberId'];
    $name = $_POST['name'];
    $initials = $_POST['initials'];
    $query="INSERT INTO team 
    (memberId, name, initials)
    VALUES (
    '". $memberId ."' ,
    '". $name ."'  ,
    '". $initials ."'
    )";
    return $query;
}

function insertComment() {
    $id = $_POST['id'];
    $contactId = $_POST['contactId'];
    $projectId = $_POST['projectId'];
    $comment = $_POST['comment'];
    $query="INSERT INTO comments 
    (id, contactId, projectId, comment)
    VALUES (
    '". $id ."' ,
    '". $contactId ."'  ,
    '". $projectId ."' ,
    '". nlToBreak($comment) ."'
    )";
    return $query;
}

function insertHours() {
    $projectId = $_POST['projectId'];
    $memberId = $_POST['memberId'];
    $description = $_POST['description'];
    $time = $_POST['time'];
    $query="INSERT INTO hours
    (projectId, memberId , description, time)
    VALUES (
    '". $projectId ."' ,
    '". $memberId ."'  ,
    '". $description ."',
    '". $time ."'
    )";
    return $query;
}

function nlToBreak ($string) {
    $newstring = preg_replace("/\r\n|\r|\n/", "<br>", $string);
    return $newstring;
}

$result = $mysqli->query ($query);
if ($result === false) {
    echo $mysqli->error;
} else {
    $response = [];
    $response['id'] = mysqli_insert_id($mysqli);
    $response['message'] = $type . " toegevoegd in database";
    echo json_encode($response);
}
$mysqli->close();
?>