<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Login</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="index.css">
    <script type="text/javascript">
        function signup() {
            var uname = document.querySelector("#userName").value;
            var password = document.querySelector("#password").value;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    if(parseInt(this.responseText) == 1){
                        window.location = "index.php";
                    } else {
                        console.log(this.responseText);
                    }
                }
            };
            xhttp.open("POST", "scheck.php", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send(`uname=${uname}&password=${password}&task=signup`);
        }
    
        function login(params) {
            window.location = "login.php";
        }
    </script>
</head>
<body>
    <div id="loginContainer">
        <div>
            <label for="User Name"> Enter User Name :  </label>
            <input type="text" name="User Name" id="userName">
            <label for="password"> Enter User Password : </label>
            <input type="password" name="Password" id="password">
            <button onclick="signup()">Sign up</button>
            <button onclick="login()">Login</button>
            <label for="userMatch" id="massage"></label>
        </div>
    </div>
</body>
</html>