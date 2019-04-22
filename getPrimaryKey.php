<?php
    session_start();
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "todolist";
    $uname = $_SESSION["uname"];
    //$primary_key = $_POST["primary_key"];
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $sql = "SELECT COUNT(`username`) FROM list WHERE username='shuvo'";        
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            echo $row["COUNT(`username`)"];
        }
    } else {
        echo 0;
    }
?>