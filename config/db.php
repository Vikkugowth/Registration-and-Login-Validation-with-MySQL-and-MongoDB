<?php

$servername = "sql12.freesqldatabase.com";
$username = "sql12765560";  
$password = "Bm8IraQrVb";      
$database = "sql12765560";  

// Create connection
$conn = new mysqli($servername, $username, $password, $database);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>  