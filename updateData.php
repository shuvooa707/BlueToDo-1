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
        $taskname = $_POST["taskname"];
        $sql = "DELETE FROM `tasks` WHERE username=\"$uname\" AND taskname=\"$taskname\"";
    } elseif ($_POST["op"] == "complete") {
        $taskname = $_POST["taskname"];
        $sql = "UPDATE `tasks` SET `status`='done' WHERE username=\"$uname\" AND taskname=\"$taskname\"";

    } elseif ($_POST["op"] == "unfinished") {
        $taskname = $_POST["taskname"];
        $sql = "UPDATE `tasks` SET `status`='unfinished' WHERE username=\"$uname\" AND taskname=\"$taskname\"";

    } elseif ($_POST["op"] == "save") {
        $taskname = $_POST["taskname"];
        $status = $_POST["status"];
        $sql = "INSERT INTO `tasks` (`username`, `taskname`, `status`) VALUES ('$uname', '$taskname', '$status')";

    } elseif ($_POST["op"] == "deleteAccount" ) {
        # code...
        $user = $_SESSION["uname"];
        $sql ="DELETE FROM `tasks` WHERE username='$user'";
        $result = $conn->query($sql);
        if ($result) {                                
            $sql ="DELETE FROM `user` WHERE username='$user'";
            $result = $conn->query($sql);
            if($result){         
                $_SESSION = array();
                session_destroy();
                echo "x1x";
                return;
                exit();
            }

        } else {
            echo "x0x";
        }

    } else {
        echo "work bitch work";
    }
    $result = $conn->query($sql);
    echo $result;
    $conn->close();
?>