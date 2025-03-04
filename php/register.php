<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json");

include "../config/db.php";


// Get data from AJAX
$full_name = trim($_POST['full_name'] ?? '');
$email = trim($_POST['email'] ?? '');
$password = trim($_POST['password'] ?? '');

// Validate required fields
if (empty($full_name) || empty($email) || empty($password)) {
    echo json_encode(["success" => false, "message" => "All fields are required"]);
    exit;
}

//  Check if email already exists
$sql = "SELECT id FROM user_info WHERE Email = ?";
$check_stmt = $conn->prepare($sql);
$check_stmt->bind_param("s", $email);
$check_stmt->execute();
$check_stmt->store_result();

if ($check_stmt->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Email already registered. Try logging in."]);
    exit;
}

$check_stmt->close();


$sql = "INSERT INTO user_info (Name, Email, Password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["success" => false, "message" => "SQL Prepare Failed: " . $conn->error]);
    exit;
}

$stmt->bind_param("sss", $full_name, $email, $password);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "User Registered Successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Database error"]);
}

$stmt->close();
$conn->close();

?>