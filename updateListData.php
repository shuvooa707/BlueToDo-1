<?php
    session_start();
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "todolist";
    $uname = $_SESSION["uname"];
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    if($_POST["op"] == "delete"){
        $primary_key = $_POST["primary_key"];
        $sql = "DELETE FROM `list` WHERE username=\"$uname\" AND primary_key=\"$primary_key\"";
        $result = $conn->query($sql);
        $sql = "DELETE FROM tasks WHERE `primary_key`=$primary_key";
        $result = $conn->query($sql);
    } 
    elseif ($_POST["op"] == "save") {
        $listname = $_POST["listname"];
        $primary_key = $_POST["primary_key"];
        $sql = "INSERT INTO `list` (`username`, `list_name`, `primary_key`, `is_selected`) VALUES ('$uname', '$listname', '$primary_key',0)";        
        $result = $conn->query($sql);
        
    } 
    elseif ($_POST["op"] == "modify") {
        $oldlistname = $_POST["listname"];
        $newlistname = $_POST["newlistname"];
        $primary_key = $_POST["primary_key"];
        $sql = "UPDATE `list` SET `list_name`='$newlistname' WHERE `primary_key`='$primary_key'";        
        $result = $conn->query($sql);
        
    } 
    else {
        echo "work bitch work";
    }
    echo $result;
    $conn->close();
?>