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
    <link rel="stylesheet" type="text/css" media="screen" href="navbar.css">
    <link rel="stylesheet" type="text/css" media="screen" href="user.css">
    <link rel="stylesheet" type="text/css" media="screen" href="modal.css">
    <script>
        function deleteAccount(params) {
            var validation = confirm("Are You Sure You Want to Delete This Account ???");
            if(validation) {
                data = `op=deleteAccount`;
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        if(xmlhttp.responseText =="x1x"){
                            console.log(xmlhttp.responseText);
                            on("Your Account Has Been Deleted");
                            setTimeout(()=>{window.location = "login.php"},2000);
                        }
                        else {
                            
                        }
                    }
                };
                xmlhttp.open("POST", "updateData.php", true);
                xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xmlhttp.send(data);
            }
        }

        function signout() {
            window.location = "signout.php";
        }
    </script>
</head>
<body >

    <img src="img/login-page-bg.jpg" id="backgroundImage">
    <div id="nav" >
            <span  onclick='window.location="index.php"'><a href="index.php">Task Page</a></span>
            <span id="signout" onclick="signout()">Sign Out</span>
    </div>

        <div id="container">
            <h2><strong>User Name</strong> : <?php echo $_SESSION["uname"]; ?></h2>
            <h2><strong>Password</strong> : <?php echo $_SESSION["password"]; ?></h2>
            <p onclick="deleteAccount()">delete account</p>
        </div>    
        
        <div id="modal">
        <div id="box">
            <div id="close" onclick="off()">X</div>
            <div id="msg"></div>
        </div>
    </div>
    <script src="modalbox.js"></script>
</body>
</html>