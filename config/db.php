<?php

$servername = "sql12.freesqldatabase.com";
$username = "sql12766613";  
$password = "IqKE6TLVxs";      
$database = "sql12766613";  

// Create connection
$conn = new mysqli($servername, $username, $password, $database);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>  