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
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="index.css">
    <link rel="stylesheet" type="text/css" media="screen" href="navbar.css">
    <script src="index.js"></script>
    <script src="jquery.js"></script>
    <script src="bootstrap.min.js"></script>
</head>
<body >

    <div id="nav">
            <span><a href="user.php"><?php echo $_SESSION["uname"]; ?></a></span>
            <span id="signout" onclick="signout()">Sign Out</span>
    </div>


    <div id="container">
        <div id="header">Your Tasks</div>
        <div id="task_container">
            
        </div>
        <div id="addtask" title="Click to Add a New Task" onclick="addnew()">
            +
        </div>
        <h4 id="clickToAdd">Click To Add A New Task</h4>
    </div>
    <div style="visibility: hidden; position: absolute;z-index: -10010; width: 0px; height:0px;" id="fnode">
        
    </div>
</body>
</html>