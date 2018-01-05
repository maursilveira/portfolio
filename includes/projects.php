<?php

include('connect.php');

if (isset($_GET['id'])) {
  $id = $_GET['id'];
  $imageQuery = "SELECT p.name, p.description, i.path, i.alt, i.position FROM projects p, images i WHERE p.id = '$id' AND p.id = i.project_id ORDER BY i.position";
  $imageResult = mysqli_query($conn, $imageQuery);

  $images = array();

  while ($image = mysqli_fetch_assoc($imageResult)) {
    $images[] = $image;
  }

  echo json_encode($images);
}
else {
  $homeQuery = 'SELECT id, name, cover FROM projects WHERE active = 1 ORDER BY position';
  $result = mysqli_query($conn, $homeQuery);

  $rows = array();

  while ($row = mysqli_fetch_assoc($result)) {
    $rows[] = $row;
  }

  echo json_encode($rows);
}

 ?>
