<?php
include ('connect.php');

$type = $_POST['type'];

if ($type == "project") { $query = updateProject(); }
else if ($type == "client") { $query = updateClient(); }
else if ($type == "employee") { $query = updateEmployee(); }
else if ($type == "comment") { $query = updateComment(); }
else if ($type == "document") { $query = updateDocument(); }
else if ($type == "line") { $query = updateLine(); }
else if ($type == "mail") { $query = updateMail(); }
else if ($type == "company") { $query = updateCompany(); }


function updateProject() {
    $id = $_POST['id'];
    $projectName = $_POST['projectName'];
    $projectStatus = $_POST['projectStatus'];
    $clientId = $_POST['clientId'];
    $employeeId = $_POST['employeeId'];
    $hours = $_POST['hours'];
    $rate = $_POST['rate'];
    $discount = $_POST['discount'];
    $currency = $_POST['currency'];
    $year = $_POST['year'];
    $finished = $_POST['finished'];
    $query = "UPDATE projects SET
    id = '" . $id . "' ,
    projectName = '" . $projectName . "' ,
    projectStatus = '" . $projectStatus . "' ,
    clientId = '" . $clientId . "' ,
    employeeId = '" . $employeeId . "' ,
    hours = '" . $hours . "' ,
    rate = '" . $rate . "' ,
    discount = '" . $discount . "' ,
    currency = '" . $currency . "' ,
    year = '" . $year . "' ,
    finished = '" . $finished . "'
    WHERE
    id = '" . $id. "'";
    return $query;
}

function updateDocument() {
    $id = $_POST['id'];
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
    $query = "UPDATE documents SET
    id = '" . $id . "',
    clientName = '" . $clientName . "',
    projectId = '" . $projectId . "',
    doctype = '" . $doctype . "',
    currency = '" . $currency . "',
    english = '" . $english . "',
    hideTotal = '" . $hideTotal . "',
    locked = '" . $locked . "',
    nr = '" . $nr . "',
    paid = '" . $paid . "',
    employeeId = '" . $employeeId . "',
    title = '" . $title . "',
    vat = '" . $vat . "',
    year = '" . $year . "',
    month = '" . $month . "',
    day = '" . $day . "',
    rate = '" . $rate . "'
    WHERE
    id = '" . $id. "'";
    return $query;
}

function updateClient() {
    $id = $_POST['id'];
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
    $vat = $_POST['vat'];
    $international = $_POST['international'];

    $query = "UPDATE clients SET
    name = '" . $name . "' ,
    contactPerson = '" . $contactPerson . "' ,
    street = '" . $street . "' ,
    zipcode = '" . $zipcode . "' ,
    city = '" . $city . "' ,
    web = '" . $web . "' ,
    email = '" . $email . "' ,
    telephone = '" . $telephone . "' ,
    rate = '" . $rate . "' ,
    info = '" . $info . "' ,
    vat = '" . $vat . "' ,
    international = '" . $international . "'
    WHERE
    id = '" . $id. "'";
    return $query;
}

function updateEmployee() {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $initials = $_POST['initials'];
    $email = $_POST['email'];
    $mailFooter = $_POST['mailFooter'];
    $query = "UPDATE employees SET
    name = '" . $name . "' ,
    initials = '" . $initials . "' ,
    email = '" . $email . "' ,
    mailFooter = '" . $mailFooter . "'
    WHERE
    id = '" . $id. "'";
    return $query;
}

function updateComment() {
    $id = $_POST['id'];
    $id = $_POST['id'];
    $projectId = $_POST['projectId'];
    $comment = $_POST['comment'];
    $query = "UPDATE comments SET
    projectId = '" . $projectId . "' ,
    id = '" . $id . "' ,
    comment = '" . nlToBreak($comment) . "'
    WHERE
    id = '" . $id. "'";
    return $query;
}

function updateMail() {
    $id = $_POST['id'];
    $subject = $_POST['subject'];
    $content = $_POST['content'];
    $employeeId = $_POST['employeeId'];
    $receiver = $_POST['receiver'];
    $date = $_POST['date'];
    $mailType = $_POST['mailType'];
    $documentId = $_POST['documentId'];
    $query = "UPDATE mails SET
    id = '" . $id . "' ,
    subject = '" . $subject . "' ,
    content = '" . $content . "' ,
    employeeId = '" . $employeeId . "' ,
    receiver = '" . $receiver . "' ,
    date = '" . $date . "' ,
    mailType = '" . $mailType . "' ,
    documentId = '" . $documentId . "'
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

function updateCompany() {
    $id = $_POST['id'];
    $startingYear = $_POST['startingYear'];
    $title = $_POST['title'];
    $name = $_POST['name'];
    $companyNameNice = $_POST['companyNameNice'];
    $address = $_POST['address'];
    $addressExtra = $_POST['addressExtra'];
    $zipcode = $_POST['zipcode'];
    $city = $_POST['city'];
    $country = $_POST['country'];
    $standardRate = $_POST['standardRate'];
    $invoiceText = $_POST['invoiceText'];
    $invoiceTextEnglish = $_POST['invoiceTextEnglish'];
    $color1 = $_POST['color1'];
    $color2 = $_POST['color2'];
    $logoUrl = $_POST['logoUrl'];
    $footerImageUrl = $_POST['footerImageUrl'];
    $usesMail = $_POST['usesMail'];
    $usesGoogleDrive = $_POST['usesGoogleDrive'];
    $usesAcumulus = $_POST['usesAcumulus'];
    $coc = $_POST['coc'];
    $vat = $_POST['vat'];
    $bankName = $_POST['bankName'];
    $bankAddress = $_POST['bankAddress'];
    $iban = $_POST['iban'];
    $bic = $_POST['bic'];

    $query = "UPDATE companies SET
    startingYear = '" . $startingYear . "' ,
    title = '" . $title . "' ,
    name = '" . $name . "',
    companyNameNice = '" . $companyNameNice . "',
    address = '" . $address . "' ,
    addressExtra = '" . $addressExtra . "' ,
    zipcode = '" . $zipcode . "' ,
    city = '" . $city . "' ,
    country = '" . $country . "' ,
    standardRate = '" . $standardRate . "' ,
    invoiceText = '" . $invoiceText . "' ,
    invoiceTextEnglish = '" . $invoiceTextEnglish . "' ,
    color1 = '" . $color1 . "' ,
    color2 = '" . $color2 . "' ,
    logoUrl = '" . $logoUrl . "' ,
    footerImageUrl = '" . $footerImageUrl . "' ,
    usesMail = '" . $usesMail . "' ,
    usesGoogleDrive = '" . $usesGoogleDrive . "' ,
    usesAcumulus = '" . $usesAcumulus . "' ,
    coc = '" . $coc . "' ,
    vat = '" . $vat . "' ,
    bankName = '" . $bankName . "' ,
    bankAddress = '" . $bankAddress . "' ,
    iban = '" . $iban . "' ,
    bic = '" . $bic . "'

    WHERE
    id = '" . $id. "'";
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
    echo $result;
}
$mysqli->close();
?>