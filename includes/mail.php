<?php

  include('env.php');

  function redirect_to($location) {
    if($location != NULL) {
      header("Location: {$location}");
      exit;
    }
  }

  function submitMessage($name, $email, $message, $direct) {
    $to = $MAIL_ADRESS;
    $subj = "Message from customer submitted via site";
    $extra = "Reply-To: ".$email;
    $msg = "Name: ".$name."\n\nEmail: ".$email."\n\nMessage: ".$message;
    //mail($to, $subj, $msg, $extra);
    $direct = $direct."?name={$name}";
    redirect_to($direct);
  }

 ?>
