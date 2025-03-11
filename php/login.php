<?php


error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json");



include '../config/db.php';   
require '../config/redis.php';
require '../config/mongodb.php'; 



if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (empty($email) || empty($password)) {
        echo json_encode(["success" => false, "message" => "All fields are required"]);
        exit;
    }

    
    $stmt = $conn->prepare("SELECT id, Name, Password FROM user_info WHERE Email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();


    if($result->num_rows > 0){
    $row = $result->fetch_assoc();
        // Direct string comparison (NO HASHING)
    if ($password === $row['Password']) {
        
            //  Generate a unique session token
            $token = bin2hex(random_bytes(16)); // 16-character random token

            //  Store the token in Redis (Expire in 1 Hour and assign email value)
            $redis->setex("session:$token",3600, $email );
            
            // If the user does not exist, insert basic profile data into MongoDB
            $collection = $database->selectCollection("profile");
            $existingUser = $collection->findOne(["Email" => $email]);

            if (!$existingUser) {
                
                $collection->insertOne([
                    "Email" => $email,
                    "Name" => $row['Name'],
                    "Age" => "",
                    "Contact" => ""
                ]);

            }

          
            echo json_encode(["success" => true, "message" => "Login successful", "token" => $token]);
        } else  {
            echo json_encode(["success" => false, "message" => "Invalid password"]);
          }
    }

 else {
      echo json_encode(["success" => false , "message" => "User not found"]);
      }


}
    
    $stmt->close();
    $conn->close();

      

?>
