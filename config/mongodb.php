<?php

require '../vendor/autoload.php';

use MongoDB\Client;


try {
    
    // Connect to MongoDB
    $mongoURI = "mongodb+srv://Vikram:riaanuOIp7ooQRKM@mycluster.k7t8t.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster";
    $mongoClient = new Client($mongoURI);
    $database = $mongoClient->selectDatabase("updated_data");
    $collection = $database->selectCollection("profile");
 

}

catch (Exception $e) {
  
    die("MongoDB Connection Error: " . $e->getMessage());
}



?>
 