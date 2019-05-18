<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Login</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="index.css">
    <script type="text/javascript">
        function login() {
            var uname = document.querySelector("#userName").value;
            var password = document.querySelector("#password").value;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    if(this.responseText.trim()=="x1x"){
                        window.location = "index.php";
                    } else {
                        on("User Name and Password Doesn't Match!! Please Try Again");
                    }
                }
            };
            xhttp.open("POST", "scheck.php", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send(`uname=${uname}&password=${password}&task=login`);
        }
        function signup(params) {
            window.location = "signup.php";
        }
    </script>
    <style type="text/css">
        body{            
            background:url("img/login-page-bg.jpg");
            background-size:100vw 100vh;
            background-repeat:no-repeat;
        }
        #loginContainer{
            border-radius:0px;
        }
    </style>
</head>
<body>
    <div id="body">
        <div id="loginContainer">
            <div>
                <label for="User Name"> Login : </label>
                <input type="text" name="User Name" id="userName">
                <label for="password">Password : </label>
                <input type="password" name="Password" id="password">
                <button onclick="login()">Login</button>
                <button onclick="signup()">Sign up</button>
                <label for="userMatch" id="massage"></label>
            </div>
        </div>
    </div>
    <script src="modalbox.js"></script>
</body>
</html>