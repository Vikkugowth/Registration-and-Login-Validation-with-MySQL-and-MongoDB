<?php

$servername = "sql12.freesqldatabase.com";
$username = "sql12765560";  // Change if you have a different MySQL user
$password = "Bm8IraQrVb";      // Set your MySQL root password if required
$database = "sql12765560";  // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>  