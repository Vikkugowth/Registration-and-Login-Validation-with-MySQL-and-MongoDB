    <?php

        require '../vendor/autoload.php';
        
        use Predis\Client;

        class RedisConnection
        {
            public function getConnection() {
                try {
                     $redis = new Predis\Client([
                        'host'     => 'redis-14855.c305.ap-south-1-1.ec2.redns.redis-cloud.com',
                        'port'     => 14855,
                        'username' => 'default', // Some Redis servers require a username
                        'password' => 'Txrq85KiJPkiOatGhXqDsmPEBgZNx3Az',
                    ]);

                    return $redis; // Return Redis client instance

                } catch (Exception $e) {
                    die("Redis Connection Failed: " . $e->getMessage());
                }
            }
        }

        // Instantiate the class and get Redis connection
        $redisConnection = new RedisConnection();
        $redis = $redisConnection->getConnection(); 


    ?>

