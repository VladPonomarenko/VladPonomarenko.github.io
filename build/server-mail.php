<?php

    $name = $_POST['name'];
    $phone = $_POST['phone'];
     
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'vendor/autoload.php';

    $mail = new PHPMailer(true);

    try {
        $mail->SMTPDebug = 2;                                
        $mail->isSMTP();                                     
        $mail->Host = 'smtp.mail.ru'; 
        $mail->SMTPAuth = true;                              
        $mail->Username = '***';                
        $mail->Password = '***';                           
        $mail->SMTPSecure = 'ssl';                           
        $mail->Port = 465;                                   

        $mail->setFrom('***', 'Order request');
        $mail->addAddress('***', 'Bill Klinton');     
        
        $mail->isHTML(true);                                  
        $mail->Subject = 'Order request';
        $mail->Body    = 'Имя: '.$name.'. Телефон: '.$phone;
        

        $mail->send();
        $mail->ClearAllRecipients();
        echo 'OK';
    } catch (Exception $e) {
        echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
    }
    
    
?>