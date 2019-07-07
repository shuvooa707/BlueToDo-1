
function on(msgText,s){
    var modal = document.querySelector("#modal");
    modal.style.display = "block";
    var box = document.querySelector("#box");
    var msg = document.querySelector("#msg");
    box.style.transitionDuration = s;
    setTimeout(()=>{
        box.style.top = "30%";
        msg.innerText = msgText;
    },5);
    
} 
function off(){
    var box = document.querySelector("#box");
    box.style.top = "-40%";
    setTimeout(()=>{
        var modal = document.querySelector("#modal");
        modal.style.display = "none";
    },200);
}

async function confirm() {
    
}