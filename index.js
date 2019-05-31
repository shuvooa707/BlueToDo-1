newTask = "";
totalTask = 0;

// Creates a new Task and returns it
function createNewTask(){
    newTask = document.querySelector("#fnode");
    newTask.innerHTML = `<div class="task">
                            <span class="done ">
                                <input type="checkbox" onclick="completed(this)">
                            </span>
                            <span class="numberTagTask">${++totalTask}</span>
                            <span class="task_name" onclick="precompleted(this)"></span>
                            <span class="delete_task" title="Delete Task Name" onclick="deleteTask(this)">
                                <svg viewBox="0 0 24 24" id="ic_delete_24px" width="100%" height="100%"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                            </span>
                            <span class="edit_task"  title="Edit Task Name" onclick="editTask(this,'update')">
                                <svg viewBox="0 0 24 24" id="ic_edit_24px" width="100%" height="100%"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                            </span>                
                            <span class="save" title="Click To Save" onclick="update(this)">Save</span>                
                        </div>`;

    newTask = document.querySelector("#fnode");
    newTask = newTask.querySelector(".task");
    document.querySelector("#fnode").innerHTML = "";
    return newTask;
}
// check the task on being clicked on the name of the task
function precompleted( elem ) {
    elem.parentElement.querySelector("input[type='checkbox']").click();
}

function completed(elem){        
    var r = elem.parentElement.parentElement.querySelector(".task_name"); // clicked task
    if( elem.checked ){
        r.innerHTML = "<del class='fuzzy'>" + r.innerHTML + "</del>";
        elem.parentElement.parentElement.querySelector(".edit_task").style.display = "none";
        updateOnline("complete",elem.parentElement.parentElement);

        // calls the aside_completed_task() function to make the
        // completed task bring aside in the task list
        aside_completed_task(elem.parentElement.parentElement,"DOWN");
    } else {
        r.innerHTML = r.innerText;
        elem.parentElement.parentElement.querySelector(".edit_task").style.display = "inline-block";
        updateOnline("unfinished",elem.parentElement.parentElement);

        // calls the aside_completed_task() function to make the
        // completed task bring aside in the task list
        aside_completed_task(elem.parentElement.parentElement,"UP");
    }
}

function aside_completed_task(task,direction) {
    var task_container = document.querySelector("#task_container");
    var tmp = task;
    if( direction == "DOWN" ){
        task_container.removeChild(task);
        task_container.appendChild(tmp);
    } else {
        task_container.removeChild(task);
        task_container.prepend(tmp);
    }
}

var animatorTime = 1;
function addnew(nodeToBeAdded){
    // If no List Selected 
    var all_list = document.querySelector(".list");
    if(!all_list){
        on("Please Make A List First",".2s");
        return 0;
    }
    if(nodeToBeAdded){
        nodeToBeAdded.style.transitionDuration = ".5s";
        nodeToBeAdded.style.opacity = "0";
        setTimeout(()=>{
            nodeToBeAdded.style.opacity = "1";
        },(animatorTime++)*100);
        document.querySelector("#task_container").appendChild(nodeToBeAdded);
    }
    else {            
        createNewTask();   
        document.querySelector("#task_container").prepend(newTask);
        allTask = document.querySelectorAll(".task");
        editTask(allTask[allTask.length-1]);
        if(document.querySelector("#clickToAdd").style.visibility){
            document.querySelector("#clickToAdd").style.display = "inline-block";
        }
    }
}

function deleteTask(elem){   
    // reducing the totaltask by one
    totalTask--;
    // This block of code sets the animation of deletion act
    elem.parentElement.style.transitionDuration=".8s";
    elem.parentElement.style.height="0px";
    elem.parentElement.style.opacity="0"; 
    elem.parentElement.style.border="0"; 
    elem.parentElement.style.marginBottom="0"; 
    elem.parentElement.style.padding="0"; 

    if (elem.parentElement.querySelector(".task_name") && elem.parentElement.querySelector(".task_name").innerText.length > 0) {
        updateOnline("delete",elem.parentElement);
    }

    setTimeout( ()=>{
        elem.parentElement.remove();
    },900);
}

function editTask(elem,operation){
        var task = elem.parentElement;
        var taskName = task.querySelector(".task_name");
        var taskValue = taskName.innerText;
        taskNameOld = taskValue;
        if( operation !="update" && taskValue.length > 0 ){
            removeOld(task);
        }
        task.querySelector(".edit_task").style.display = "none";
        task.querySelector(".delete_task").style.display = "none";
        task.querySelector(".save").style.display = "inline-block";
        task.querySelector("input").style.visibility = "hidden";


        // creating a new input field and putting it on for getting new task name 
        var input = document.createElement("input");
        var type = document.createAttribute("type");
        var id = document.createAttribute("id");
        var placeholder = document.createAttribute("placeholder");
        type.value = "text";
        id.value = "editedText";
        placeholder.value = "Enter New Task Name";
        input.value = taskValue;
        input.setAttributeNode(type);
        input.setAttributeNode(id);
        input.setAttributeNode(placeholder);
        taskName.replaceWith(input);
}


function save(elem){

    // If there is no text entered in other words
    // if the no input is given
    var p = elem.parentElement;
    var editedText = p.querySelector("#editedText");
    if(editedText.value.length < 1){
        console.log("dsfjng kjsefsd");
        deleteTask(elem);
        return 0;
    }
    var span = document.createElement("span");
    var Class = document.createAttribute("class");
    var onclick = document.createAttribute("onclick");
    Class.value = "task_name";
    onclick.value = "precompleted(this)";
    span.setAttributeNode(Class);
    span.setAttributeNode(onclick);
    span.innerText = editedText.value; ///.substr(0,35);
    editedText.replaceWith(span);
    p.querySelector(".edit_task").style.display = "inline-block";
    p.querySelector(".delete_task").style.display = "inline-block";
    p.querySelector("input").style.visibility = "visible";
    p.querySelector(".save").style.display = "none";

    updateOnline("save",elem.parentElement);
    
}
function update(elem) {
    
    var p = elem.parentElement;
    var editedText = p.querySelector("#editedText");
    if(editedText.value.length < 1){
        console.log("no text inputted");
        deleteTask(elem);
        return 0;
    }
    var span = document.createElement("span");
    var Class = document.createAttribute("class");
    var onclick = document.createAttribute("onclick");
    Class.value = "task_name";
    onclick.value = "precompleted(this)";
    span.setAttributeNode(Class);
    span.setAttributeNode(onclick);
    span.innerText = editedText.value; ///.substr(0,35);
    editedText.replaceWith(span);
    p.querySelector(".edit_task").style.display = "inline-block";
    p.querySelector(".delete_task").style.display = "inline-block";
    p.querySelector("input").style.visibility = "visible";
    p.querySelector(".save").style.display = "none";

    updateOnline("update",elem.parentElement,taskNameOld);
}

// This function fetches data from database after page loading 
function onStartUp(){
    var xmlhttp = new XMLHttpRequest(); 
    // getData.php is the file used to fetch data from database
    xmlhttp.open("POST", "getData.php", false);
    xmlhttp.send();   
    // if it returns data then that data is given to render funtion to be put on DOM
    if(xmlhttp.responseText){
        data = xmlhttp.responseText;
        if(data.includes("x0x") && data.includes("list_name") && data.includes("::listafter::")){
            var tmp = data.substr( data.indexOf("["),data.length-1 );
            tmp = tmp.split("::listafter::")[0];
            renderlistgroup( tmp );
        } else if( data.includes("list_name") && data.includes("::listafter::") ) {
            // construct DOM of Lists
            renderlistgroup(data.split("::listafter::")[0]);
            // construct DOM of Tasks
            render(data.split("::listafter::")[1]);
            console.log(data.split("::listafter::")[1]);
            // changing the header of the task list
            var selectedList = document.querySelector(".selected");
            if( selectedList ){
                document.querySelector("#header").innerText = selectedList.querySelector(".list_name").innerText;
            }
        } else {
            // if something goes worng then prints it on console window
            console.log(data);
        }
    } else {
        // if response does not come then prints it on console window
        console.log("Something Went Worng!! Response Didn't Come");        
    }
}

// This function draws data on the page in other 
// language it draws the data on on page using DOM
function render(tasks){
    
    
    // Clearing the task container on for rendering 
    // or re-rendering the tasks
    document.querySelector("#task_container").innerHTML="";
    totalTask = 0;
    if( tasks[0] == "x" ){
        console.log("No Task Found");        
        return 0;
    }
    if( tasks.includes("{}") ){
        console.log(tasks);        
        return 0;
    } else {
        tasks = JSON.parse(tasks);
    }
    // Pushing the data to DOM
    tasks.
    sort((a,b)=>{
        if( a.status == "done" && b.status != "done" ){
            return 1;
        } else if( a.status != "done" && b.status == "done" ){
            return -1;
        }
    }).forEach((element) => {
        if(element["status"]=="done"){
            status = "checked";
            tname = `<span class="task_name" onclick="precompleted(this)"><del class='fuzzy'>${element["taskname"]}</del></span>`;
        } else {
            status = "";
            tname = `<span class="task_name" onclick="precompleted(this)">${element["taskname"]}</span>`;
        }
        var tmp_task = `<div class="task">
                            <span class="done">
                                <input type="checkbox" onclick="completed(this)" ${status}>
                            </span>
                            <span class="numberTagTask" >${++totalTask}</span>
                            ${tname}
                            <span class="delete_task" title="Delete Task Name" onclick="deleteTask(this)">
                                <svg viewBox="0 0 24 24" id="ic_delete_24px" width="100%" height="100%"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                            </span>
                            <span class="edit_task"  title="Edit Task Name" onclick="editTask(this,'update')">
                                <svg viewBox="0 0 24 24" id="ic_edit_24px" width="100%" height="100%"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                            </span>                
                            <span class="save" title="Click To Save" onclick="update(this)">Save</span>                
                        </div>`;        
        fnode = document.querySelector("#fnode");
        fnode.innerHTML = tmp_task;
        tmp_task = document.querySelector("#fnode");
        tmp_task = tmp_task.querySelector(".task");
        addnew(tmp_task);
        if(element["status"]=="done"){
            tmp_task.querySelector(".edit_task").style.display = "none";
        }
        document.querySelector("#fnode").innerHTML = "";
    });   
    animatorTime = 0; 
}

// This function is used to update data on database like:-
// when any list is deleted this funtion is triggered with 
// the deleted list and operation to do which in case is delete 
// as parameter. Same goes for renaming of list and creating new list
function updateOnline(operation,elem,taskNameOld) {

    // get the primary key of current selected list
    var tmpList = document.querySelector(".selected");
    primary_key = tmpList.querySelector(".list_name").getAttributeNode("data-primary-key").value;
    primary_key = parseInt(primary_key);
    var sql_operation;
    var taskNameNew = taskName =  elem.querySelector(".task_name").innerText;
    var status;
    if(elem.querySelector("input").checked){
        status = "done";
    } else {
        status = "unfinished";
    }

    if( operation == "complete" ){
        sql_operation = `op=${operation}&taskname=${taskName}&status=${status}&primary_key=${primary_key}`;        
    } else if( operation == "unfinished" ){
        sql_operation = `op=${operation}&taskname=${taskName}&status=${status}&primary_key=${primary_key}`;  

    } else if( operation == "save" ) {
        taskName = document.querySelector(".selected");
        taskName = elem.querySelector(".task_name").innerText;

        sql_operation = `op=${operation}&taskname=${taskName}&status=${status}&primary_key=${primary_key}`;

    } else if ( operation == "delete" ) {
        sql_operation = `op=${operation}&taskname=${taskName}&primary_key=${primary_key}`;
    } else if( operation =="update" ){        
        sql_operation = `op=${operation}&tasknameold=${taskNameOld}&tasknamenew=${taskNameNew}&primary_key=${primary_key}`;
    }
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "updateData.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(sql_operation);
    //console.log(sql_operation);
    console.trace();
}


//
function attachEvents(list) {
    list.addEventListener("click",(e)=>{
        var flag = "listonly";
        e.path.forEach((elem)=>{
            if ( elem.className == "edit_list" ) {
                flag = "editlist";
            } else if ( elem.className == "delete_list" ) {
                flag = "deletelist";
            } else if ( elem.className == "save_list" ) {
                flag = "savelist";
            }
        });
        if ( flag == "editlist" ){
            console.log(" %cEdit  ","color:purple");
        } else if( flag == "deletelist" ) {
            console.log(" %cDelete  ","color:red");
        } else if ( flag == "savelist" ) {		
            console.log(" %c Save  ","color:green");
        } else {
            console.log(" List ");
            updateList(list.querySelector(".list_name"));
        }
    });
    
}
// this function pauses the moving animation on being clicked 
function playNpause(node){
    if(node.style.animationPlayState =="" || node.style.animationPlayState=="running"){
        node.style.animationPlayState = "paused";
    } else {
        node.style.animationPlayState = "running";
    }
}


function signout() {
    window.location = "signout.php";
}

window.onload = function(){          
        onStartUp();
        //attachEvents();

};

// List of all the fucntions
    // signout();
    // removeOld();
    // render();
    // onStartUp();
    // save();
    // editTask();
    // deleteTask();
    // addnew();
    // completed();
    // createNewTask();
