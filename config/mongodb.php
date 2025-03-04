<?php

require '../vendor/autoload.php';

use MongoDB\Client;


try {
    
    // Connect to MongoDB
    $mongoURI = "mongodb://localhost:27017";
    $mongoClient = new Client($mongoURI);
    $database = $mongoClient->selectDatabase("updated_data");
    $collection = $database->selectCollection("profile");
 

} catch (Exception $e) {
    // Catch and display connection errors
    die("MongoDB Connection Error: " . $e->getMessage());
}

?>
 