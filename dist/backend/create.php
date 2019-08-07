<?php
include ('connect.php');


$type = $_POST['type'];
if ($type == "project") { $query = createProject(); }
else if ($type == "document") { $query = createDocument(); }
else if ($type == "client") { $query = createClient(); }
else if ($type == "employee") { $query = createEmployee(); }
else if ($type == "comment") { $query = createComment(); }
else if ($type == "line") { $query = createLines(); }
else if ($type == "mail") { $query = createMails(); }


function createProject() {
    $projectName = $_POST['projectName'];
    $projectStatus = $_POST['projectStatus'];
    $employeeId = $_POST['employeeId'];
    $clientId = $_POST['clientId'];
    $hours = $_POST['hours'];
    $rate = $_POST['rate'];
    $discount = $_POST['discount'];
    $currency = $_POST['currency'];
    $year = $_POST['year'];
    $finished = $_POST['finished'];
    $query="INSERT INTO projects
    (projectName, projectStatus, employeeId, clientId, hours, rate, discount, currency, year, finished)
    VALUES (
    '". $projectName ."'  ,
    '". $projectStatus ."' ,
    '". $employeeId ."' ,
    '". $clientId ."' ,
    '". $hours ."'  ,
    '". $rate ."' ,
    '". $discount ."'  ,
    '". $currency ."'  ,
    '". $year ."' ,
    '". $finished ."'
    )";
    return $query;
}

function createDocument() {
    $clientName = $_POST['clientName'];
    $projectId = $_POST['projectId'];
    $doctype = $_POST['doctype'];
    $currency = $_POST['currency'];
    $english = $_POST['english'];
    $hideTotal = $_POST['hideTotal'];
    $locked = $_POST['locked'];
    $nr = $_POST['nr'];
    $paid = $_POST['paid'];
    $employeeId = $_POST['employeeId'];
    $title = $_POST['title'];
    $vat = $_POST['vat'];
    $year = $_POST['year'];
    $month = $_POST['month'];
    $day = $_POST['day'];
    $rate = $_POST['rate'];
    $query = "INSERT INTO documents
    (clientName, projectId, doctype, currency, english, hideTotal, locked, nr, paid, employeeId, title, vat, year, month, day, rate)
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
    '". $employeeId ."'  ,
    '". $title ."'  ,
    '". $vat ."'  ,
    '". $year ."'  ,
    '". $month ."'  ,
    '". $day ."'  ,
    '". $rate ."'
    )";
    return $query;
}

function createClient() {
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
    $query = "INSERT INTO clients
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

function createEmployee() {
    $name = $_POST['name'];
    $initials = $_POST['initials'];
    $email = $_POST['email'];
    $mailFooter = $_POST['mailFooter'];
    $query= "INSERT INTO employees
    (name, initials, email, mailFooter)
    VALUES (
    '". $name ."'  ,
    '". $initials ."' ,
    '". $email ."' ,
    '". $mailFooter ."'
    )";
    return $query;
}

function createComment() {
    $projectId = $_POST['projectId'];
    $comment = $_POST['comment'];
    $query="INSERT INTO comments 
    (projectId, comment)
    VALUES (
    '". $projectId ."' ,
    '". nlToBreak($comment) ."'
    )";
    return $query;
}

function createLines() {
    $documentId = $_POST['documentId'];
    $lineType = $_POST['lineType'];
    $text = $_POST['text'];
    $hours = $_POST['hours'];
    $amount = $_POST['amount'];
    $arrayOrder = $_POST['arrayOrder'];
    $rate = $_POST['rate'];
    $query="INSERT INTO documentLines
    (documentId, lineType , text, hours, amount, arrayOrder, rate)
    VALUES (
    '". $documentId ."' ,
    '". $lineType ."'  ,
    '". $text ."',
    '". $hours ."',
    '". $amount ."',
    '". $arrayOrder ."',
    '". $rate ."'
    )";
    return $query;
}

function createMails() {
    $subject = $_POST['subject'];
    $content = $_POST['content'];
    $employeeId = $_POST['employeeId'];
    $receiver = $_POST['receiver'];
    $date = $_POST['date'];
    $mailType = $_POST['mailType'];
    $documentId = $_POST['documentId'];
    $query = "INSERT INTO mails
    (subject, content, employeeId, receiver, date, mailType, documentId)
    VALUES (
    '". $subject ."' ,
    '". $content ."' ,
    '". $employeeId ."' ,
    '". $receiver ."' ,
    '". $date ."' ,
    '". $mailType ."' ,
    '". $documentId ."'
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