<?php
include('../vendor/autoload.php');

$data = file_get_contents("php://input");
$json_decoded = json_decode($data);

$sender = $json_decoded->data->sender;
$receiver = $json_decoded->data->receiver;
// remove 'mail' from url
$site_url = substr(getcwd(), 0, -4);
$attachment = $site_url . $json_decoded->data->attachment;
$attachment_name = $json_decoded->data->attachmentName;
$subject = $json_decoded->data->subject;
$content = $json_decoded->data->content;
$footer = $json_decoded->data->footer;
$mail_content = nl2br($content) . '<br><br>' . $footer;

$headers = "From:" . $sender . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;




try {
    $email = new PHPMailer();
    //$email = new PHPMailer\PHPMailer\PHPMailer();

    $email->Host       = 'smtp-relay.gmail.com';                 // Specify main and backup SMTP servers
    $email->SMTPAuth   = true;                                   // Enable SMTP authentication
    //$email->Username   = 'user@example.com';                   // SMTP username
    //$email->Password   = 'secret';                             // SMTP password
    $email->SMTPSecure = 'tls';                                  // Enable TLS encryption, `ssl` also accepted
    $email->Port       = 587;

    $email->SetFrom($sender);
    $email->SMTPDebug = 2;
    $email->Subject = $subject;
    $email->Body = $mail_content;
    $email->AddAddress($receiver);
    $email->isHTML(true);
    $email->AddAttachment($attachment, $attachment_name);

    echo $email->Send();
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

?>
