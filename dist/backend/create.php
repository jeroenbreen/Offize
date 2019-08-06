<?php
include ('connect.php');


$type = $_POST['type'];
if ($type == "project") { $query = createProject(); }
else if ($type == "document") { $query = createDocument(); }
else if ($type == "contact") { $query = createContact(); }
else if ($type == "employee") { $query = createEmployee(); }
else if ($type == "comment") { $query = createComment(); }
else if ($type == "hours") { $query = createHours(); }
else if ($type == "line") { $query = createLines(); }
else if ($type == "block") { $query = createBlocks(); }
else if ($type == "activity") { $query = createActivity(); }
else if ($type == "todo") { $query = createTodos(); }
else if ($type == "mail") { $query = createMails(); }


function createProject() {
    $projectName = $_POST['projectName'];
    $projectStatus = $_POST['projectStatus'];
    $id = $_POST['id'];
    $employeeId = $_POST['employeeId'];
    $hours = $_POST['hours'];
    $rate = $_POST['rate'];
    $discount = $_POST['discount'];
    $currency = $_POST['currency'];
    $year = $_POST['year'];
    $finished = $_POST['finished'];
    $query="INSERT INTO projects
    (projectName, projectStatus, id, employeeId, hours, rate, discount, currency, year, finished)
    VALUES (
    '". $projectName ."'  ,
    '". $projectStatus ."' ,
    '". $id ."'  ,
    '". $employeeId ."' ,
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
    $id = $_POST['id'];
    $contactName = $_POST['contactName'];
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
    (id, contactName, projectId, doctype, currency, english, hideTotal, locked, nr, paid, employeeId, title, vat, year, month, day, rate)
    VALUES (
    '". $id ."'  ,
    '". $contactName ."'  ,
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

function createContact() {
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
    $query = "INSERT INTO contacts
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
    $id = $_POST['id'];
    $name = $_POST['name'];
    $initials = $_POST['initials'];
    $email = $_POST['email'];
    $mailFooter = $_POST['mailFooter'];
    $query= "INSERT INTO team
    (id, name, initials, email, mailFooter)
    VALUES (
    '". $id ."' ,
    '". $name ."'  ,
    '". $initials ."' ,
    '". $email ."' ,
    '". $mailFooter ."'
    )";
    return $query;
}

function createComment() {
    $id = $_POST['id'];
    $projectId = $_POST['projectId'];
    $comment = $_POST['comment'];
    $query="INSERT INTO comments 
    (id, projectId, comment)
    VALUES (
    '". $id ."'  ,
    '". $projectId ."' ,
    '". nlToBreak($comment) ."'
    )";
    return $query;
}

function createHours() {
    $projectId = $_POST['projectId'];
    $employeeId = $_POST['employeeId'];
    $description = $_POST['description'];
    $time = $_POST['time'];
    $query="INSERT INTO hours
    (projectId, employeeId , description, time)
    VALUES (
    '". $projectId ."' ,
    '". $employeeId ."'  ,
    '". $description ."',
    '". $time ."'
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
    $jobId = $_POST['jobId'];
    $query="INSERT INTO documentLines
    (documentId, lineType , text, hours, amount, arrayOrder, rate, jobId)
    VALUES (
    '". $documentId ."' ,
    '". $lineType ."'  ,
    '". $text ."',
    '". $hours ."',
    '". $amount ."',
    '". $arrayOrder ."',
    '". $rate ."' ,
    '". $jobId ."'
    )";
    return $query;
}

function createBlocks() {
    $date = $_POST['date'];
    $employeeId = $_POST['employeeId'];
    $projectId = $_POST['projectId'];
    $time = $_POST['time'];
    $done = $_POST['done'];
    $query="INSERT INTO blocks
    (date, employeeId, projectId, time, done)
    VALUES (
    '". $date ."' ,
    '". $employeeId ."' ,
    '". $projectId ."' ,
    '". $time ."' ,
    '". $done ."'
    )";
    return $query;
}

function createActivity() {
    $time = $_POST['time'];
    $text = $_POST['text'];
    $lineId = $_POST['lineId'];
    $blockId = $_POST['blockId'];

    $jobId = $_POST['jobId'];
    $query="INSERT INTO activities
    (time, text, lineId, blockId, jobId)
    VALUES (
    '". $time ."' ,
    '". $text ."' ,
    '". $lineId ."' ,
    '". $blockId ."' ,
    '". $jobId ."'
    )";
    return $query;
}

function createTodos() {
    $employeeId = $_POST['employeeId'];
    $title = $_POST['title'];
    $done = $_POST['done'];
    $date = $_POST['date'];
    $query = "INSERT INTO todos
    (employeeId, title, done, date)
    VALUES (
    '". $employeeId ."' ,
    '". $title ."' ,
    '". $done ."' ,
    '". $date ."'
    )";
    return $query;
}

function createMails() {
    $id = $_POST['id'];
    $subject = $_POST['subject'];
    $content = $_POST['content'];
    $member_id = $_POST['member_id'];
    $receiver = $_POST['receiver'];
    $date = $_POST['date'];
    $mailType = $_POST['mailType'];
    $query = "INSERT INTO mails
    (id, subject, content, member_id, receiver, date, mailType)
    VALUES (
    '". $id ."' ,
    '". $subject ."' ,
    '". $content ."' ,
    '". $member_id ."' ,
    '". $receiver ."' ,
    '". $date ."' ,
    '". $mailType ."'
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