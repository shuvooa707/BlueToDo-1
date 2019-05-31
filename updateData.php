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
        $primary_key = $_POST["primary_key"];
        $sql = "DELETE FROM `tasks` WHERE username=\"$uname\" AND taskname=\"$taskname\" AND primary_key=$primary_key";
        $result = $conn->query($sql);

    } elseif ($_POST["op"] == "complete") {
        $primary_key = $_POST["primary_key"];
        $taskname = $_POST["taskname"];
        $sql = "UPDATE `tasks` SET `status`='done' WHERE username=\"$uname\" AND taskname=\"$taskname\" AND primary_key=$primary_key";
        $result = $conn->query($sql);
        $sql = "SELECT * FROM tasks ORDER BY status ASC";
        $result = $conn->query($sql);

    } elseif ($_POST["op"] == "unfinished") {
        $primary_key = $_POST["primary_key"];
        $taskname = $_POST["taskname"];
        $sql = "UPDATE `tasks` SET `status`='unfinished' WHERE username=\"$uname\" AND taskname=\"$taskname\" AND primary_key=$primary_key";
        $result = $conn->query($sql);

    } elseif ($_POST["op"] == "save") {
        $primary_key = $_POST["primary_key"];
        $taskname = $_POST["taskname"];
        $status = $_POST["status"];
        $sql = "INSERT INTO `tasks` (`username`, `taskname`, `status`, `primary_key`) VALUES ('$uname', '$taskname', '$status','$primary_key')";
        $result = $conn->query($sql);

    } elseif ($_POST["op"] == "rename") {
        $primary_key = $_POST["primary_key"];
        $taskname = $_POST["taskname"];
        $primary_key = $_POST["primary_key"];
        $sql = "UPDATE `tasks` SET `taskname`=$taskname WHERE `primary_key`=$primary_key";
        $result = $conn->query($sql);

    } elseif ($_POST["op"] == "update") {
        $primary_key = $_POST["primary_key"];
        $tasknameOld = $_POST["tasknameold"];
        $tasknameNew = $_POST["tasknamenew"];
        $primary_key = $_POST["primary_key"];
        $sql = "UPDATE `tasks` SET `taskname`='$tasknameNew' WHERE `primary_key`=$primary_key AND `taskname`='$tasknameOld'";        
        echo $sql;
        $result = $conn->query($sql);

    } elseif ($_POST["op"] == "deleteAccount" ) {
        # code...
        $user = $_SESSION["uname"];
        $sql ="DELETE FROM `tasks` WHERE username='$user'";
        $result = $conn->query($sql);
        if ($result) {                                
            $sql ="DELETE FROM `user` WHERE username='$user'";
            $result = $conn->query($sql);
            if($result){                            
                $sql ="DELETE FROM `list` WHERE username='$user'";
                    if($result){  
                        $result = $conn->query($sql);
                        $_SESSION = array();
                        session_destroy();
                        echo "x1x";
                        return;
                        exit();
                    }
            }

        } else {
            echo "x0x";
        }

    } else {
        echo "work bitch work";
    }
    $conn->close();
?>