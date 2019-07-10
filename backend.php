<?php
    session_start();
    $servername = "localhost";
    $password = "";
    $dbname = "todolist";
    
    $username = $uname = $_SESSION["uname"];
    // Create connection
    $conn = new mysqli($servername, "root", $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    
    /* Operating for List */
    if( isset($_POST["op"]) && $_POST["op"] == "deleteList"){
        $list_list_id = $_POST["list_list_id"];
        $sql = "DELETE FROM `list` WHERE username='$uname' AND list_list_id=$list_list_id";
        $result = $conn->query($sql);
        $sql = "DELETE FROM tasks WHERE `tasks_list_id`=$list_list_id";
        $result = $conn->query($sql);
        $result ? printf("List With all it's Tasks deleted") : printf("List wasn't deleted");
    } 

    elseif ( isset($_POST["op"]) && $_POST["op"] == "saveNewList") {
        $listname = addslashes(ucfirst($_POST["listname"]));
        $username = $_SESSION["uname"];
        $conn->query("UPDATE list SET is_selected=0 WHERE is_selected=1 AND username='$username'");
        $sql = "INSERT INTO `list` (`username`, `list_name`, `is_selected`) VALUES ('$username', '$listname',1)";                
        $conn->query($sql);
        echo (int)$conn->query("SELECT list_list_id FROM list WHERE is_selected=1 AND username='$username'")->fetch_assoc()["list_list_id"];  
    } 

    elseif ( isset($_POST["op"]) && $_POST["op"] == "renameList") {
        $newlistname = addslashes($_POST["newlistname"]);
        $list_list_id = $_POST["list_list_id"];
        $sql = "UPDATE `list` SET `list_name`='$newlistname' WHERE `list_list_id`='$list_list_id'";        
        $result = $conn->query($sql);
        echo $result;
    } 
    
    if( isset($_POST["operation"]) && $_POST["operation"] == "getTasksOfList" ) {
        $list_id = (int)$_POST["list_id"];
        // fetches all the tasks of selected list

        $conn->query("UPDATE list SET is_selected=0 WHERE is_selected=1 AND username='$username'");
        $sql = "SELECT  * FROM tasks WHERE tasks_list_id=$list_id";
        $result = $conn->query($sql);

        $conn->query("UPDATE list SET is_selected=1 WHERE list_list_id=$list_id AND username='$username'");
        $data = array();
        // echo $sql;
        if ( $result->num_rows > 0) {
            // output data of each row
            while( $row = $result->fetch_assoc() ) {
                array_push($data,$row);
            }
            echo json_encode($data);
        } else {
        } 
        exit(0);
    }
    

    if ( isset($_POST["operation"]) && $_POST["operation"] == "getListPostOnStartUp" ) {        
        // get the primary key
        $sql = "SELECT list_list_id FROM list WHERE username='$uname' AND is_selected=1";
        $list_list_id = (int)$conn->query($sql)->fetch_assoc()["list_list_id"];        
        // fetches all the tasks of selected list
        $sql = "SELECT  * FROM tasks WHERE tasks_list_id=$list_list_id";
        $result = $conn->query($sql);
        $alltasks = array();
        if ( $result->num_rows > 0 ) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                array_push($alltasks,$row);
            }
        }
        // echo json_encode($alltasks);
        // fetches the lists from the database
        $sql = "SELECT * FROM list WHERE username='$uname'";
        $result = $conn->query($sql);
        $alllists = array();
        if ( $result->num_rows > 0 ) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                $ldate = $row["list_date"];
                $ldate_date = implode("-", array_reverse(explode("-",explode(" ",$ldate)[0])) );
                $ldate_time = explode(" ",$ldate)[1];
                $row["list_date"] = $ldate_time . " " .$ldate_date;
                array_push($alllists,$row);
            }
            echo json_encode( array($alllists,$alltasks) );
        } else {
            echo "x0x3";
        }       
    } 
    
    /* /Operating for List */

    // Operating for tasks 
    if( isset($_POST["op"]) && $_POST["op"] == "delete"){
        $tasks_task_id = $_POST["tasks_task_id"];
        $sql = "DELETE FROM `tasks` WHERE tasks_task_id=$tasks_task_id";
        $result = $conn->query($sql);
        $result ? printf("task deleted") : printf($result);
    } elseif ( isset($_POST["op"]) && $_POST["op"] == "complete") {
        $task_id = $_POST["tasks_task_id"];
        $sql = "UPDATE `tasks` SET `status`='done' WHERE tasks_task_id=".$task_id;
        $result = $conn->query($sql);
        $sql = "SELECT * FROM tasks ORDER BY status ASC";
        $result = $conn->query($sql);

    } elseif ( isset($_POST["op"]) && $_POST["op"] == "unfinished") {
        $task_id = $_POST["tasks_task_id"];
        $taskname = addslashes($_POST["taskname"]);
        $sql = "UPDATE `tasks` SET `status`='unfinished' WHERE tasks_task_id=".$task_id;
        $result = $conn->query($sql);

    } elseif ( isset($_POST["op"]) && $_POST["op"] == "save") {
        $tasks_list_id = $_POST["tasks_list_id"];
        $taskname = addslashes($_POST["taskname"]);
        $status = $_POST["status"];
        $sql = "INSERT INTO `tasks` (`username`, `taskname`, `status`,`tasks_list_id`) VALUES ('$uname', '$taskname', '$status','$tasks_list_id')";
        $result = $conn->query($sql);
        echo $result;

    } elseif ( isset($_POST["op"]) && $_POST["op"] == "rename") {
        $primary_key = $_POST["primary_key"];
        $taskname = addslashes($_POST["taskname"]);
        $primary_key = $_POST["primary_key"];
        $sql = "UPDATE `tasks` SET `taskname`=$taskname WHERE `primary_key`=$primary_key";
        $result = $conn->query($sql);

    } elseif ( isset($_POST["op"]) && $_POST["op"] == "renameTask") {
        $tasks_task_id = $_POST["tasks_task_id"];
        $tasknameOld = addslashes($_POST["tasknameold"]);
        $tasknameNew = addslashes($_POST["tasknamenew"]);
        $sql = "UPDATE `tasks` SET `taskname`='$tasknameNew' WHERE `tasks_task_id`=$tasks_task_id";        
        echo $sql;
        $result = $conn->query($sql);

    } elseif ( isset($_POST["op"]) && $_POST["op"] == "deleteAccount" ) {
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

    }
    
?>