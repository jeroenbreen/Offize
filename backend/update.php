<?php
include ('connect.php');

$type = $_POST['type'];
if ($type == "project") { $query = updateProject(); }
else if ($type == "contact") { $query = updateContact(); }
else if ($type == "team") { $query = updateTeam(); }
else if ($type == "hours") { $query = updateHours(); }
else if ($type == "comment") { $query = updateComment(); }
else if ($type == "configuration") { $query = updateConfiguration(); }
else if ($type == "line") { $query = updateLine(); }

function updateProject() {
    $projectId = $_POST['projectId'];
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
    $query = "UPDATE projects SET
    projectId = '" . $projectId . "' , 
    projectName = '" . $projectName . "' , 
    projectStatus = '" . $projectStatus . "' , 
    contactId = '" . $contactId . "' , 
    memberId = '" . $memberId . "' , 
    hours = '" . $hours . "' , 
    rate = '" . $rate . "' , 
    discount = '" . $discount . "' , 
    currency = '" . $currency . "' ,
    year = '" . $year . "' ,
    finished = '" . $finished . "'
    WHERE
    projectId = '" . $projectId. "'";
    return $query;
}

function updateContact() {
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
    $query = "UPDATE contacts SET 
    name = '" . $name . "' , 
    contactPerson = '" . $contactPerson . "' , 
    street = '" . $street . "' , 
    zipcode = '" . $zipcode . "' , 
    city = '" . $city . "' , 
    web = '" . $web . "' , 
    email = '" . $email . "' , 
    telephone = '" . $telephone . "' , 
    rate = '" . $rate . "' , 
    info= '" . $info . "' 
    WHERE 
    contactId = '" . $contactId. "'";
    return $query;
}

function updateTeam() {
    $memberId = $_POST['memberId'];
    $name = $_POST['name'];
    $initials = $_POST['initials'];
    $query = "UPDATE team SET 
    name = '" . $name . "' , 
    initials = '" . $initials . "' 
    WHERE 
    memberId = '" . $memberId. "'";
    return $query;
}

function updateHours() {
    $hourId = $_POST['hourId'];
    $projectId = $_POST['projectId'];
    $memberId = $_POST['memberId'];
    $description = $_POST['description'];
    $time = $_POST['time'];
    $query = "UPDATE hours SET
    projectId = '" . $projectId . "' , 
    memberId = '" . $memberId . "' ,
    description = '" . $description . "' ,
    time = '" . $time . "' ,
    WHERE
    hourId = " . $hourId;
    return $query;
}

function updateComment() {
    $id = $_POST['id'];
    $contactId = $_POST['contactId'];
    $projectId = $_POST['projectId'];
    $comment = $_POST['comment'];
    $query = "UPDATE comments SET 
    projectId = '" . $projectId . "' , 
    contactId = '" . $contactId . "' , 
    comment = '" . nlToBreak($comment) . "' 
    WHERE 
    id = '" . $id. "'";
    return $query;
}

function updateLine() {
    $id = $_POST['id'];
    $documentId = $_POST['documentId'];
    $lineType = $_POST['lineType'];
    $text = $_POST['text'];
    $hours = $_POST['hours'];
    $amount = $_POST['amount'];
    $arrayOrder = $_POST['arrayOrder'];
    $rate = $_POST['rate'];
    $query = "UPDATE documentLines SET
    documentId = '" . $documentId . "' ,
    lineType = '" . $lineType . "' ,
    text = '" . $text . "' ,
    hours = '" . $hours . "' ,
    amount = '" . $amount . "' ,
    arrayOrder = '" . $arrayOrder . "' ,
    rate = '" . $rate . "'
    WHERE
    id = '" . $id. "'";
    return $query;
}

function updateConfiguration() {
    $addTenders = $_POST['addTenders'];
    $addInvoices = $_POST['addInvoices'];
    $startingYear = $_POST['startingYear'];
    $showTotals = $_POST['showTotals'];
    $autoCalc = $_POST['autoCalc'];
    $title = $_POST['title'];
    $welcome = $_POST['welcome'];
    $companyName = $_POST['companyName'];
    $companyAddress = $_POST['companyAddress'];
    $companyZipcode = $_POST['companyZipcode'];
    $companyCity = $_POST['companyCity'];
    $standardRate = $_POST['standardRate'];
    $query = "UPDATE configuration SET 
    addTenders = '" . $addTenders . "' , 
    addInvoices = '" . $addInvoices . "' ,
    startingYear = '" . $startingYear . "' ,
    showTotals = '" . $showTotals . "',
    autoCalc = '" . $autoCalc . "',
    title = '" . $title . "' ,
    welcome = '" . $welcome . "',
    companyName = '" . $companyName . "',
    companyAddress = '" . $companyAddress . "' , 
    companyZipcode = '" . $companyZipcode . "' ,
    companyCity = '" . $companyCity . "' ,
    standardRate = " . $standardRate . "
    WHERE 
    id = 1";
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
    echo $type . " gewijzigd in database";
}
$mysqli->close();
?>