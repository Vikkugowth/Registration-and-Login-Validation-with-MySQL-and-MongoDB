<?php

$servername = "sql12.freesqldatabase.com";
$username = "sql12768101";  
$password = "5qecSIk8ZH";      
$database = "sql12768101";  

// Create connection
$conn = new mysqli($servername, $username, $password, $database);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>  