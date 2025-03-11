<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json");

require '../config/db.php'; 
require '../config/redis.php';
require '../config/mongodb.php'; 



$action = ($_POST['action'] ?? '');
$token = ($_POST['token'] ?? '');

 if($action === 'fetch') {
    $mail = $redis->get("session:$token");

    if($mail){
        $stmt = $conn->prepare("SELECT Name, Email FROM user_info WHERE Email = ?");
        $stmt->bind_param("s", $mail);
        $stmt->execute();
        $result = $stmt->get_result();
    
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();

             echo json_encode([
                "success" => true,
                "name" => $user['Name'],
                "email" => $user['Email']
             ]);
            
             $stmt->close();
             $conn->close();
             exit();
        } else {
            echo json_encode(["success" => false, "message" => "User not found"]);
        }
  
    }
 

  
 
}



if ($action === 'updateuser') {
    $mail = $redis->get("session:$token");

    if (!$mail) {
        echo json_encode(["success" => false, "message" => "session expired"]);
        exit;
    }

    $postData = json_decode($_POST['profiledata'], true);

    $name = $postData['name'];
    $age = (int)$postData['age']; 
    $contact =  $postData['contact'];

    if (empty($name) || empty($contact) || empty($age)) {
        echo json_encode(["success" => false, "message" => "All fields are required"]);
        exit();
    }

    $collection = $database->selectCollection("profile");

   
    // Updating in mongodb
    $updateResult = $collection->updateOne(
        ["Email" => $mail],      
        ['$set' => [        
            "Name" => $name,
            "Age" => $age,
            "Contact" => $contact
        ]]
    );

    if ($updateResult->getModifiedCount() > 0) { 
        echo json_encode(["success" => true, "message" => "Profile updated successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "You have not updated anything."]);
        exit();
    }
}


if ($action === 'getuserdata') {
    
    $mail = $redis->get("session:$token");

    if (!$mail) {
        echo json_encode(["success" => false, "message" => "Session expired."]);
        exit;
    }

    $collection = $database->selectCollection("profile");
    $user = $collection->findOne(["Email" => $mail]);

    if ($user) {
        
        echo json_encode([
            "success" => true,
            "user_data" => [
                "name" => $user["Name"] ?? '',
                "email" => $user["Email"] ?? '',
                "age" => $user["Age"] ?? '', 
                "contact" => $user["Contact"] ?? ''
            ]
            
        ]);

        exit();
        
    } 
}




 if ($action === 'logout') {
    
    $email = $redis->get("session:$token");

    if ($email) {
    
        $redis->del("session:$token");

         echo json_encode(["success" => true, "message" => "Logout successful"]);
     } else {
        echo json_encode(["success" => false, "message" => "Session not found or already logged out"]);
   }
}

?>

