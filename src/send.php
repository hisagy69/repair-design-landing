<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;
    require './phpmailer/Exception.php';
    require './phpmailer/PHPMailer.php';
    require './phpmailer/SMTP.php';

    $userName = $_POST['userName'];
    $userPhone = $_POST['userPhone'];
    $userEmail = $_POST['userEmail'];
    $userQuestion = $_POST['userQuestion'];
    $nameMessage = $userName ? "<p>Имя пользователя: ${userName}</p>": "";
    $phoneMessage = $userPhone ? "<p>Телефон пользователя: ${userPhone}</p>": "";
    $emailMessage = $userEmail ? "<p>Email пользователя: ${userEmail}</p>": "";
    $questionMessage = $userQuestion ? "<p>Сообщение пользователя: ${userQuestion}</p>": "";
    
    //Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);
    
    try {
        $mail->CharSet = 'utf-8';
        //Server settings
        $mail->SMTPDebug = 0;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.mail.ru';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'sinegamy111@mail.ru';                     //SMTP username
        $mail->Password   = 'Es0PxNk8w9gWFyZha7gw';                               //SMTP password
        $mail->SMTPSecure = 'ssl';            //Enable implicit TLS encryption
        $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    
        //Recipients
        $mail->setFrom('sinegamy111@mail.ru', 'Адам');
        $mail->addAddress('sinegamy11@gmail.com', 'Adam');     //Add a recipient
    
        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'Новая заявка с сайта';
        $mail->Body    = $nameMessage . $phoneMessage . $emailMessage . $questionMessage;
        if ($mail->send()) {
            echo "ok";
          } else {
            echo "Письмо не отправлено, есть ошибка. Код ошибки: {$mail->ErrorInfo}";
        }
    } catch (Exception $e) {
        echo "Письмо не отправлено, есть ошибка. Код ошибки: {$mail->ErrorInfo}";
    }
?>