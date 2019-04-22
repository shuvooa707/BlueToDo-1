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

    
    if( isset($_POST["primary_key_set"])){
        $primary_key = $_POST["primary_key"];
        // fetches all the tasks of selected list
        $sql = "SELECT  username,taskname,status FROM tasks WHERE username=\"$uname\" AND primary_key=$primary_key ";
        $result = $conn->query($sql);
        $data = array();
        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        } else {
            echo "x0xl";
        } 
        echo json_encode($data) . "::listafter::" . " ";
        //making the current selected list unselected
        $sql = "UPDATE `list` SET `is_selected`=0 WHERE is_selected=1 AND username=\"$uname\" ";
        $result = $conn->query($sql);

        //making the current selected list unselected
        $sql = "UPDATE `list` SET `is_selected`=1 WHERE username=\"$uname\" AND  primary_key=$primary_key";
        $result = $conn->query($sql);

        exit(0);
    }


    ?>