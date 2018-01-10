<?php

  require_once("config.php");

  if(isset($_POST['name'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $subject = $_POST['subject'];

    $direct = "../index.html#contact";

    if($subject === "") {
      $sendMail = submitMessage($name, $email, $message, $direct);
    }
  }

 ?>
