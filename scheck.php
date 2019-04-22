
<?php
    if( isset($_POST["uname"]) && isset($_POST["password"]) ){
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "todolist";
        $uname = $_POST["uname"];
        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        
        // This block of code does checking for login 
        if ( isset($_POST["task"]) && $_POST["task"] == "login" ) {
            $sql = "SELECT  password FROM user WHERE username='$uname' LIMIT 1";
            $result = $conn->query($sql);
            $result = $result->fetch_assoc();
            if( $result["password"] == $_POST["password"] ){
                session_start();
                $_SESSION["uname"] = $uname;
                $_SESSION["password"] = $_POST["password"];
                echo "x1x";
            } else {
                echo "x0x";
            }

        // This block of code inserts username and password of newly signed 
        // up user into the database
        } elseif ( isset($_POST["task"]) && $_POST["task"] == "signup" ) {
            # code...
            $uname = $_POST["uname"];
            $password = $_POST["password"];
            $sql ="INSERT INTO `user`(`username`, `password`, `id`) VALUES ('$uname','$password',2)";
            $result = $conn->query($sql);
            if($result){
                session_start();
                $_SESSION["uname"] = $_POST["uname"];
                $_SESSION["password"] = $password;
                echo 1;
            }
        } 
        $conn->close();
    }
?>