<?php
// Copy this file to the server and edit the constants below with your real email/SMTP.
// This file is included by send_mail.php and should NOT be exposed in the frontend.

// Who receives the message
const MAIL_TO_ADDRESS = 'eslamhuhu1@gmail.com'; // e.g., yourname@example.com
const MAIL_TO_NAME    = 'mohammad hroub';

// From address shown as the sender (use a domain you control)
const MAIL_FROM_ADDRESS = 'eslamhuhu1@gmail.com';
const MAIL_FROM_NAME    = 'mohammad hroub';

// Optional subject prefix to identify site emails
const MAIL_SUBJECT_PREFIX = '[mohammad hroub]';

// SMTP configuration (recommended). If you cannot use SMTP, set MAIL_USE_SMTP to false and
// ensure your hosting allows PHP mail() through PHPMailer (less reliable).
const MAIL_USE_SMTP   = true;
const SMTP_HOST       = 'smtp.gmail.com';
const SMTP_PORT       = 587;
const SMTP_ENCRYPTION = 'tls';
const SMTP_USERNAME   = 'eslamhuhu1@gmail.com';
const SMTP_PASSWORD   = 'znbghyjnfvlmrhog';


