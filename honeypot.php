<?php
// Din Secret Key från Google reCAPTCHA
$recaptcha_secret = 'DIN-SECRET-KEY';

// Kontrollera om reCAPTCHA-fältet skickades
if (isset($_POST['g-recaptcha-response'])) {
    $recaptcha_response = $_POST['g-recaptcha-response'];

    // Skicka en begäran till Google för validering
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = [
        'secret' => $recaptcha_secret,
        'response' => $recaptcha_response
    ];

    // Använd cURL för att skicka POST-begäran
    $options = [
        CURLOPT_URL => $url,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query($data),
        CURLOPT_RETURNTRANSFER => true
    ];

    $ch = curl_init();
    curl_setopt_array($ch, $options);
    $result = curl_exec($ch);
    curl_close($ch);

    $response = json_decode($result, true);

    // Kontrollera om valideringen lyckades
    if ($response['success']) {
        // Hantera formulärdata och spara/skicka e-post
        $name = $_POST['name'] ?? '';
        $email = $_POST['email'] ?? '';
        $message = $_POST['message'] ?? '';

        // Här kan du lägga till din logik för att skicka e-post eller spara i databasen
        echo "Formuläret har skickats!";
    } else {
        // Misslyckad validering
        echo "reCAPTCHA validering misslyckades. Försök igen.";
    }
} else {
    echo "reCAPTCHA svar saknas.";
}
?>
