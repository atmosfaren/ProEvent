<?php
mb_internal_encoding("UTF-8");
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Hämta indata
    $formType = isset($_POST["formType"]) ? trim($_POST["formType"]) : "Unknown";
    $name     = isset($_POST["name"]) ? trim($_POST["name"]) : "Anonymous";
    $email    = isset($_POST["email"]) ? trim($_POST["email"]) : "no-reply@proevnt.com";
    $message  = isset($_POST["message"]) ? trim($_POST["message"]) : "";
    $topic    = isset($_POST["topic"]) ? trim($_POST["topic"]) : "Not Specified";

    if ($formType == "join-us") {
        $topic = "application for joining ProEvnts team!";
    }

    if (empty($name) || empty($email)) {
        echo json_encode(["status" => "error", "message" => "All required fields must be filled."]);
        exit;
    }

    // Mottagare av e-post
    $proeventEmails = ["info@proevnt.com"];
    if ($formType == "join-us") {
        $proeventEmails = ["alexa@proevnt.com", "info@proevnt.com"];
    }

    // Ämnesrad
    $subject = "New Inquiry: $topic from $name";
    $fromEmail = "info@proevnt.com";
    $returnPath = "bounce@proevnt.com";

    // Konfigurera e-posthuvuden korrekt
    $headers  = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Return-Path: $returnPath\r\n";
    $headers .= "Sender: $fromEmail\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    
    // Skapa e-postinnehållet
    $emailBody = "$name has reached out to ProEvent regarding \"$topic\".\n\n";
    if (!empty($message)) {
        $emailBody .= "$message\n\n";
    }
    $emailBody .= "Best regards,\n$name";
    
    // Hantera bilagor
    $boundary = md5(time());
    if ($formType == "join-us" && isset($_FILES['attachment']) && $_FILES['attachment']['error'] == UPLOAD_ERR_OK) {
        $headers .= "Content-Type: multipart/mixed; boundary=$boundary\r\n";
        
        $emailContent  = "--$boundary\r\n";
        $emailContent .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
        $emailContent .= $emailBody . "\r\n";

        $fileName    = basename($_FILES['attachment']['name']);
        $fileData    = file_get_contents($_FILES['attachment']['tmp_name']);
        $fileEncoded = chunk_split(base64_encode($fileData));

        $emailContent .= "--$boundary\r\n";
        $emailContent .= "Content-Type: application/octet-stream; name=\"$fileName\"\r\n";
        $emailContent .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n";
        $emailContent .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $emailContent .= "$fileEncoded\r\n";
        $emailContent .= "--$boundary--\r\n";
    } else {
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $emailContent = $emailBody;
    }
    
    // Skicka e-post till mottagarna
    $allSent = true;
    foreach ($proeventEmails as $recipient) {
        if (!mail($recipient, $subject, $emailContent, $headers, "-f $fromEmail")) {
            $allSent = false;
            error_log("❌ Failed to send email to $recipient.");
        }
    }

    // Skicka bekräftelsemail till användaren
    if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $confirmationSubject = "Your Inquiry Has Been Received - ProEvent";
        $confirmationHeaders  = "From: ProEvent <$fromEmail>\r\n";
        $confirmationHeaders .= "Reply-To: no-reply@proevnt.com\r\n";
        $confirmationHeaders .= "Return-Path: $returnPath\r\n";
        $confirmationHeaders .= "MIME-Version: 1.0\r\n";
        $confirmationHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";

        $confirmationBody = "Dear $name,\n\n";
        $confirmationBody .= "Thank you for reaching out to ProEvent.\n";
        $confirmationBody .= "We have received your inquiry regarding \"$topic\" and will get back to you as soon as possible.\n\n";
        $confirmationBody .= "Best Regards,\nProEvent Team";

        if (!mail($email, $confirmationSubject, $confirmationBody, $confirmationHeaders, "-f $fromEmail")) {
            error_log("❌ Failed to send confirmation email to $email.");
        }
    }

    // Skicka JSON-svar baserat på resultatet
    if ($allSent) {
        echo json_encode(["status" => "success", "message" => "Email sent successfully!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Some emails failed to send."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>