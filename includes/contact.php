<?php

  require_once("admin/scripts/config.php");

  if(isset($_POST['name'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $subject = $_POST['subject'];

    $direct = "thankyou.php";

    if(empty($subject)) {
      $sendMail = submitMessage($name, $email, $message, $direct);
    }
  }

 ?>
