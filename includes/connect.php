<?php
  include('env.php');
  
//loads credentials to connect db from env file
  $user = $DB_USER;
  $pass = $DB_PASS;
  $url = $DB_URL;
  $db = $DB_NAME;
  $port = $DB_PORT;

  $conn = mysqli_connect($url, $user, $pass, $db, $port);

  if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_errno());
    exit();
  }
 ?>
