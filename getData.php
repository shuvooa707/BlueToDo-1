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

    if( isset($_POST["primary_key"]) ){
        $primary_key = $_POST["primary_key"];
        // fetches all the tasks of selected list
        $sql = "SELECT  username,taskname,status FROM tasks WHERE username=\"$uname\" AND primary_key=\"$primary_key\" ";
        $result = $conn->query($sql);
        $data = array();
        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        } else {
            echo "x0x0";
        } 
        echo json_encode($data) . "::listafter::" . " ";
        exit(0);
    }
    

    // get the primary key
    $sql = "SELECT primary_key FROM list WHERE username=\"$uname\" AND is_selected=1";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $primary_key = $row["primary_key"];
        }
    } else {
        $sql = "SELECT primary_key FROM list WHERE username=\"$uname\" AND is_selected=1";
        $result = $conn->query($sql);
    
        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                $primary_key = $row["primary_key"];
            }
        }
    }  
    
    // fetches all the tasks of selected list
    if ( isset($primary_key) ){
        $sql = "SELECT  username,taskname,status FROM tasks WHERE username=\"$uname\" AND primary_key=\"$primary_key\" ";
        $result = $conn->query($sql);
        $data = array();
        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        } else {
            echo "x0x2";
        } 
    }

    // fetches the lists from the database
    
    if ( 1 ){
        $sql = "SELECT  * FROM list WHERE username=\"$uname\" ";
        $result = $conn->query($sql);
        $listdata = array();
        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                $listdata[] = $row;
            }
        } else {
            echo "x0x3";
        }
    }
    
    if ( !isset($data) ){
        echo json_encode($listdata) . "::listafter::" . "{}";
    } else {
        echo json_encode($listdata) . "::listafter::" . json_encode($data);
    }
    $conn->close();
?>