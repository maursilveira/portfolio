<?php
  function redirect_to($location) {
    if($location != NULL) {
      header("Location: {$location}");
      exit;
    }
  }

  function submitMessage($name, $email, $message, $direct) {
    include('env.php');

    $to = $MAIL_ADDRESS;
    $subj = "Message from customer submitted via site";
    $extra = "Reply-To: ".$email;
    $msg = "Name: ".$name."\n\nEmail: ".$email."\n\nMessage: ".$message;
    mail($to, $subj, $msg, $extra);
    // $direct = $direct."?name={$name}";
    //  redirect_to($direct);
    echo '<script type="text/javascript">',
      'alert("Thank you for your message, '.$name.'\r\nI will reply as soon as possible");',
      'window.location.href = "../index.html#contact";',
      '</script>'
      ;
  }

 ?>
