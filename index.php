<?php 
    session_start();
    if ( !isset($_SESSION["uname"]) ) {
        # code...
        header("Location:login.php");
        echo $_SESSION["uname"];
    }
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>To Do List </title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="index.css">
    <link rel="stylesheet" type="text/css" media="screen" href="navbar.css">
    <link rel="stylesheet" type="text/css" media="screen" href="listgroup.css">
    <link rel="stylesheet" type="text/css" media="screen" href="modal.css">
    
</head>
<body >
    <img src="img/login-page-bg.jpg"  id="backgroundImage">
    <div id="nav">
            <span  onclick='window.location="user.php"'><a href="user.php" title="Click to See Your Profile Page"><?php echo $_SESSION["uname"]; ?></a></span>
            <span id="signout" title="Click to Logout" onclick="signout()">Sign Out</span>
    </div>

    

    <div id="listgroup-container">
        <div id="list-container-header">Your Lists</div>
        <div id="addlist" title="Click to Add a New Task" onclick="addnewlist()">
            +
        </div>
        <h4 id="clickToAddlist" class="animate1"  onclick="playNpause(this)">Click To Add A New List</h4>
        <div id="list_container">
            
        </div>
    </div>
    
    <div id="container">
        <div id="header">Your Tasks</div>
        <div id="addtask" title="Click to Add a New Task" onclick="addnew()" autofocus>
            +
        </div>
        <h4 id="clickToAdd" class="animate2" onclick="playNpause(this)">Click To Add A New Task</h4>
        <div id="task-description">
            
        </div>
        <div id="task_container">
            
        </div>
    </div>

    <div style="visibility: hidden; position: absolute;z-index: -10010; width: 0px; height:0px;" id="fnode">
        
    </div> 
    <div id="modal">
        <div id="box">
            <div id="close" onclick="off()">X</div>
            <div id="msg"></div>
        </div>
    </div>
    <div id="taskExpandOverlay">    
        <div id="taskExpandBody">
            <h4 id="taskExpandBody-taskname">Buy And UPS</h4>
            <hr>
            <div id="status" onclick="taskExpandBodyprecompleted(this.parentElement)">Pending..</div>
            <p id="taskExpandBody-task-description">I have To buy and UPS as soon as possible I have To buy and UPS as soon as possible I have To buy and UPS as soon as possible</p>            
            <span id="close-taskExpandBody" onclick="this.parentElement.parentElement.style.display='none'">X</span>
            <div id="taskExpandBody-timer">
                <div id="taskExpandBody-timer-left">
                    <span>Should be Finished Within</span>
                    <i style="font-size:14px;/* text-indent: 32px; *//* margin-top: 10px; */background: black;padding: 3px 8px;border-radius: 4px;display: inline-block;margin-top: 2px;" id="taskExpandBody-task-finishing-time">2019-07-31 09:58:32</i>
                </div>
                <div id="taskExpandBody-timer-right">                    
                    <span>Time Left</span>
                    <span id="timer"></span>
                </div>
            </div>
        </div>
    </div>

    <!-- scripts goes here -->
    <script src="listgroup.js"></script>
    <script src="index.js"></script>
    <script src="modalbox.js"></script>
</body>
</html>