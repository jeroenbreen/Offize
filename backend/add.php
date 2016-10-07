<?php
include ('connect.php');


$type = $_POST['type'];
if ($type == "projects") { $query = insertProject(); }
else if ($type == "contacts") { $query = insertContact(); }
else if ($type == "team") { $query = insertTeam(); }
else if ($type == "comments") { $query = insertComment(); }
else if ($type == "hours") { $query = insertHours(); }


function insertProject() {
    $projectId = $_POST['projectId'];
    $projectName = $_POST['projectName'];
    $projectStatus = $_POST['projectStatus'];
    $contactId = $_POST['contactId'];
    $memberId = $_POST['memberId'];
    $hours = $_POST['hours'];
    $rate = $_POST['rate'];
    $discount = $_POST['discount'];
    $fixedTotal = $_POST['fixedTotal'];
    $currency = $_POST['currency'];
    $tenders = $_POST['tenders'];
    $invoices = $_POST['invoices'];
    $year = $_POST['year'];
    $week = $_POST['week'];
    $distributionWeeks = $_POST['distributionWeeks'];
    $finished = $_POST['finished'];
    $comments = $_POST['comments'];
    $query="INSERT INTO projects 
    (projectId, projectName, projectStatus, contactId, memberId, hours, rate, discount, fixedTotal, currency, tenders, invoices, year, week, distributionWeeks, finished, comments)
    VALUES (
    '". $projectId ."' ,
    '". $projectName ."'  ,
    '". $projectStatus ."' ,
    '". $contactId ."'  ,
    '". $memberId ."' ,
    '". $hours ."'  ,
    '". $rate ."' ,
    '". $discount ."'  ,
    '". $fixedTotal ."' ,
    '". $currency ."'  ,
    '". $tenders ."',
    '". $invoices ."',
    '". $year ."' ,
    '". $week ."' ,
    '". $distributionWeeks ."' ,
    '". $finished ."' ,
    '". comments ."'
    )";
    return $query;
}

function insertContact() {
    $contactId = $_POST['contactId'];
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
    (contactId, name, contactPerson, street, zipcode, city, web, email, telephone, rate, info)
    VALUES (
    '". $contactId ."' ,
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
    $day = $_POST['day'];
    $month = $_POST['month'];
    $year = $_POST['year'];
    $query="INSERT INTO hours 
    (projectId, memberId , description, time, day, month, year)
    VALUES (
    '". $projectId ."' ,
    '". $memberId ."'  ,
    '". $description ."',
    '". $time ."',
    '". $day ."',
    '". $month ."',
    '". $year ."'
    )";
    return $query;
}

function nlToBreak ($string) {
    $newstring = preg_replace("/\r\n|\r|\n/", "<br>", $string);
    return $newstring;
}

$result = $mysqli->query ($query);
if ($result === false) {
    echo '<p>Er is een fout opgetreden:
          <br />Foutmelding: ' . mysql_error() . '
          <br />Query: ' . $query . '</p>';
} else {
    echo $type . " toegevoegd in database";
}
$mysqli->close();
?>