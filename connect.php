<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "todolist";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 

    $sql = "SELECT  password,username FROM user";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            if( $row["username"] == $_POST["uname"] && $row["password"] == $_POST["password"] ){
                session_start();
                $_SESSION["uname"] = $row["username"];
                echo "x1x";
                break;
            }
        }
    } else {
        echo "x0x";
    }
    $conn->close();
?>