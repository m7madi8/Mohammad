<?php
declare(strict_types=1);

// Force JSON responses
header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

// Allow only POST
if (strtoupper($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

// Do not expose errors to clients
ini_set('display_errors', '0');
ini_set('log_errors', '1');

require_once __DIR__ . '/mail_config.php';

// Try to load Composer autoloader for PHPMailer
$autoloadPath = __DIR__ . '/vendor/autoload.php';
if (!file_exists($autoloadPath)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server mailer is not installed. Please run composer install.']);
    exit;
}
require_once $autoloadPath;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Read JSON body if present; fallback to POST form
$rawBody = file_get_contents('php://input');
$data = json_decode($rawBody ?: '', true);
if (!is_array($data)) {
    $data = $_POST; // allow regular form posts
}

// Extract and sanitize inputs
function sanitize_string(?string $value, int $maxLength = 5000): string {
    $clean = trim((string)($value ?? ''));
    $clean = strip_tags($clean);
    if (mb_strlen($clean) > $maxLength) {
        $clean = mb_substr($clean, 0, $maxLength);
    }
    return $clean;
}

$hpField = sanitize_string($data['hp_field'] ?? '', 100);
if ($hpField !== '') {
    // Honeypot filled → treat as success without sending
    echo json_encode(['success' => true, 'message' => 'Thank you! Your message has been sent.']);
    exit;
}

$name    = sanitize_string($data['name'] ?? '', 100);
$email   = sanitize_string($data['email'] ?? '', 200);
$phone   = sanitize_string($data['phone'] ?? '', 50);
$subject = sanitize_string($data['subject'] ?? '', 150);
$message = sanitize_string($data['message'] ?? '', 5000);

// Server-side validations
if ($name === '' || mb_strlen($name) < 2) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Please provide a valid name.']);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Please provide a valid email address.']);
    exit;
}
if ($phone !== '' && !preg_match('/^[+()\-\d\s]{7,20}$/', $phone)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Please provide a valid phone number.']);
    exit;
}
if ($subject === '' || mb_strlen($subject) < 3) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Please provide a subject (min 3 characters).']);
    exit;
}
if ($message === '' || mb_strlen($message) < 10) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Please provide a message (min 10 characters).']);
    exit;
}

// Build email content
$subjectLine = MAIL_SUBJECT_PREFIX . ' ' . $subject;
$textBody = "New contact form submission\n\n" .
    "Name: {$name}\n" .
    "Email: {$email}\n" .
    ( $phone ? "Phone: {$phone}\n" : '' ) .
    "Subject: {$subject}\n\n" .
    "Message:\n{$message}\n";

$htmlBody = nl2br(htmlentities($textBody, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'));

try {
    $mail = new PHPMailer(true);

    if (MAIL_USE_SMTP) {
        $mail->isSMTP();
        $mail->Host       = SMTP_HOST;
        $mail->SMTPAuth   = true;
        $mail->Username   = SMTP_USERNAME;
        $mail->Password   = SMTP_PASSWORD;
        $mail->SMTPSecure = SMTP_ENCRYPTION; // 'tls' or 'ssl'
        $mail->Port       = SMTP_PORT;
    }

    // Sender and recipients
    $mail->setFrom(MAIL_FROM_ADDRESS, MAIL_FROM_NAME);
    $mail->addAddress(MAIL_TO_ADDRESS, MAIL_TO_NAME);
    // Reply to the user instead of spoofing From
    $mail->addReplyTo($email, $name);

    $mail->isHTML(true);
    $mail->Subject = $subjectLine;
    $mail->Body    = $htmlBody;
    $mail->AltBody = $textBody;

    $mail->CharSet = 'UTF-8';

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Thank you! Your message has been sent.']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send email. Please try again later.']);
}


