<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include ('connect.php');


// read timestamp
$query = "SELECT * FROM timestamp ORDER BY id DESC LIMIT 1";
$result = $mysqli -> query($query);
while ($record = $result -> fetch_array()) {
    $timestamp = $record["timestamp"];
}

// read Projects table
$projects = [];
$fetch = "SELECT * FROM projects ORDER BY projectId";
while ($row = mysql_fetch_array($fetch, MYSQL_ASSOC)) {
    array_push($projects, $row);
}



$query = "SELECT * FROM projects ORDER BY projectId";
$result = $mysqli -> query($query);
$projects = "[";
while ($record = $result -> fetch_array(MYSQLI_ASSOC)) {
    if ($projects != "[") {$projects .= ",";}
    $projects .= '{"projectId":' . $record["projectId"] . ',';
    $projects .= '"projectName":"' . $record["projectName"] . '",';
    $projects .= '"projectStatus":' . $record["projectStatus"] . ',';
    $projects .= '"contactId":' . $record["contactId"] . ',';
    $projects .= '"memberId":' . $record["memberId"] . ',';
    $projects .= '"hours":' . $record["hours"] . ',';
    $projects .= '"rate":' . $record["rate"] . ',';
    $projects .= '"discount":' . $record["discount"] . ',';
    $projects .= '"currency":"' . $record["currency"] . '",';
    $projects .= '"tenders":' . $record["tenders"] . ',';
    $projects .= '"invoices":' . $record["invoices"] . ',';
    $projects .= '"year":' . $record["year"] . ',';
    $projects .= '"week":' . $record["week"] . ',';
    $projects .= '"distributionWeeks":' . stringToArray($record["distributionWeeks"]) . ',';
    $projects .= '"finished":' . toBoolean($record["finished"]) . ',';
    $projects .= '"comments":"' . breakToNl($record["comments"]) . '"}';
}
$projects .="]"; 


// read Contacts table
$query = "SELECT * FROM contacts ORDER BY contactid";
$result = $mysqli -> query($query);
$contacts = "[";
while ($record = $result -> fetch_array(MYSQLI_ASSOC)) {
    if ($contacts != "[") {$contacts .= ",";}
    $contacts .= '{"contactId":' . $record["contactId"] . ',';
    $contacts .= '"name":"' . $record["name"] . '",';
    $contacts .= '"contactPerson":"' . $record["contactPerson"] . '",';    
    $contacts .= '"street":"' . $record["street"] . '",';    
    $contacts .= '"zipcode":"' . $record["zipcode"] . '",';    
    $contacts .= '"city":"' . $record["city"] . '",';    
    $contacts .= '"email":"' . $record["email"] . '",';
    $contacts .= '"rate":"' . $record["rate"] . '",';
    $contacts .= '"telephone":"' . $record["telephone"] . '",';
    $contacts .= '"web":"' . $record["web"] . '",';
    $contacts .= '"info":"' . $record["info"] . '"}';
}
$contacts .="]"; 

// read Team table
$query = "SELECT * FROM team ORDER BY memberId";
$result = $mysqli -> query($query);
$team = "[";
while ($record = $result -> fetch_array(MYSQLI_ASSOC)) {
    if ($team != "[") {$team .= ",";}
    $team .= '{"memberId":' . $record["memberId"] . ',';
    $team .= '"initials":"' . $record["initials"] . '",';
    $team .= '"name":"' . $record["name"] . '"}';
}
$team .="]"; 

// read Hours table
$query = "SELECT * FROM hours ORDER BY hourId";
$result = $mysqli -> query($query);
$hours= "[";
while ($record = $result -> fetch_array(MYSQLI_ASSOC)) {
    if ($hours != "[") {$hours .= ",";}
    $hours .= '{"hourId":' . $record["hourId"] . ',';
    $hours .= '"projectId":' . $record["projectId"] . ',';
    $hours .= '"memberId":' . $record["memberId"] . ',';
    $hours .= '"date":"' . $record["date"] . '",';
    $hours .= '"description":"' . $record["description"] . '",';
    $hours .= '"time":'. $record["time"] . '}';
}
$hours .="]"; 

// read Cofiguration table
$query = "SELECT * FROM configuration ORDER BY id";
$result = $mysqli -> query($query);
$configuration = "{";
while ($record = $result -> fetch_array(MYSQLI_ASSOC)) {
    $configuration .= '"addTenders":' . $record["addTenders"] . ',';
    $configuration .= '"addInvoices":' . $record["addInvoices"] . ',';
    $configuration .= '"startingYear":' . $record["startingYear"] . ',';
    $configuration .= '"showTotals":' . $record["showTotals"] . ',';
    $configuration .= '"autoCalc":' . $record["autoCalc"] . ',';
    $configuration .= '"title":"' . $record["title"] . '",';
    $configuration .= '"welcome":"' . $record["welcome"] . '",';
    $configuration .= '"companyName":"' . $record["companyName"] . '",';
    $configuration .= '"companyAddress":"' . $record["companyAddress"] . '",';
    $configuration .= '"companyZipcode":"' . $record["companyZipcode"] . '",';
    $configuration .= '"companyCity":"' . $record["companyCity"] . '",';
    $configuration .= '"standardRate":' . $record["standardRate"];

}
$configuration .= "}";

// read Comments table
$query = "SELECT * FROM comments ORDER BY date DESC";
$result = $mysqli -> query($query);
$comments = "[";
while ($record = $result -> fetch_array(MYSQLI_ASSOC)) {
    if ($comments != "[") {$comments .= ",";}
    $comments .= '{"id":' . $record["id"] . ',';
    $comments .= '"contactId":' . $record["contactId"] . ',';
    $comments .= '"projectId":' . $record["projectId"] . ',';
    $comments .= '"date":"' . $record["date"] . '",';        
    $comments .= '"comment":"' . breakToNl($record["comment"]) . '"}';
}
$comments .="]";


function breakToNl ($string) {
    $newstring = str_replace("<br/>", "<br/>", $string);
    return $newstring;
}

function stringToArray ($string) {
    if (strlen($string) == 0) {
        return "[]";
    } else {
        return $string;
    }
}

function toBoolean ($string) {
    if (strlen($string) == 0) {
        return 'false';
    } else {
        return $string;
    }
}


// Output
$output = '{"timestamp":' . $timestamp . ',"projects":' . $projects . ',"contacts":' . $contacts . ',"team":' . $team . ',"hours":' . $hours . ',"configuration":' . $configuration . ',"comments":' . $comments .'}';
$mysqli -> close();
echo $output;