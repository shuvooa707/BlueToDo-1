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
                            <span class="task_name"></span>
                            <span class="delete_task" title="Delete Task Name" onclick="deleteTask(this)"></span>
                            <span class="edit_task"  title="Edit Task Name" onclick="editTask(this)"></span>                
                            <span class="save" title="Click To Save" onclick="save(this)">Save</span>                
                        </div>`;

    newTask = document.querySelector("#fnode");
    newTask = newTask.querySelector(".task");
    document.querySelector("#fnode").innerHTML = "";
    return newTask;
}
function completed(elem){
    var r = elem.parentElement.parentElement.getElementsByClassName("task_name")[0];
    if( elem.checked ){
        console.log(elem.value);
        r.innerHTML = "<del class='fuzzy'>" + r.innerHTML + "</del>";
        elem.parentElement.parentElement.querySelector(".edit_task").style.display = "none";
        updateOnline("complete",elem.parentElement.parentElement);
    } else {
        r.innerHTML = r.innerText;
        elem.parentElement.parentElement.querySelector(".edit_task").style.display = "inline-block";
        updateOnline("unfinished",elem.parentElement.parentElement);
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
        },(animatorTime++)*90);
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
    setTimeout( ()=>{
        elem.parentElement.remove();
    },900);
    updateOnline("delete",elem.parentElement);

}

function editTask(elem){
    var p = elem.parentElement;
    var taskName = p.querySelector(".task_name");
    var taskValue = taskName.innerText;
    removeOld(p);
    p.querySelector(".edit_task").style.display = "none";
    p.querySelector(".delete_task").style.display = "none";
    p.querySelector(".save").style.display = "inline-block";
    p.querySelector("input").style.visibility = "hidden";


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
    var p = elem.parentElement;
    var editedText = p.querySelector("#editedText");
    var span = document.createElement("span");
    var Class = document.createAttribute("class");
    Class.value = "task_name";
    span.setAttributeNode(Class);
    span.innerText = editedText.value; ///.substr(0,35);
    editedText.replaceWith(span);
    p.querySelector(".edit_task").style.display = "inline-block";
    p.querySelector(".delete_task").style.display = "inline-block";
    p.querySelector("input").style.visibility = "visible";
    p.querySelector(".save").style.display = "none";
    if(editedText.value.length < 1){
        deleteTask(elem);
    } else {
        updateOnline("save",elem.parentElement);
    }
}

// This function fetches data from database after page loading 
function onStartUp(){
    var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                // if it returns data then that data is given to render funtion to be put on DOM
				if(xmlhttp.responseText){
                    data = xmlhttp.responseText;
                    if(data.includes("x0x") && data.includes("list_name") && data.includes("::listafter::")){
                        var tmp = data.substr( data.indexOf("["),data.length-1 );
                        tmp = tmp.split("::listafter::")[0];
                        renderlistgroup( tmp );
                    } else if( data.includes("list_name") && data.includes("::listafter::") ) {
                        renderlistgroup(data.split("::listafter::")[0]);
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
				}
				else {
					
				}
            }
        };
    // getData.php is the file used to fetch data from database
    xmlhttp.open("POST", "getData.php", true);
    xmlhttp.send();
}

// This function renders data on the page in other 
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
    tasks.forEach((element,index,self) => {
        if(element["status"]=="done"){
            status = "checked";
            tname = `<span class="task_name"><del class='fuzzy'>${element["taskname"]}</del></span>`;
        } else {
            status = "";
            tname = `<span class="task_name">${element["taskname"]}</span>`;
        }
        var tmp_task = `<div class="task">
                            <span class="done">
                                <input type="checkbox" onclick="completed(this)" ${status}>
                            </span>
                            <span class="numberTagTask" >${++totalTask}</span>
                            ${tname}
                            <span class="delete_task" title="Delete Task Name" onclick="deleteTask(this)"></span>
                            <span class="edit_task"  title="Edit Task Name" onclick="editTask(this)"></span>                
                            <span class="save" title="Click To Save" onclick="save(this)">Save</span>                
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
function updateOnline(params,elem) {
    // get the primary key of current selected list
    var tmpList = document.querySelector(".selected");
    primary_key = tmpList.querySelector(".list_name").getAttributeNode("data-primary-key").value;
    primary_key = parseInt(primary_key);
    var sql_operation;
    var taskName = elem.querySelector(".task_name").innerText;
    var status;
    if(elem.querySelector("input").checked){
        status = "done";
    } else {
        status = "unfinished";
    }

    if( params == "complete" ){
        sql_operation = `op=${params}&taskname=${taskName}&status=${status}&primary_key=${primary_key}`;        
    } else if( params == "unfinished" ){
        sql_operation = `op=${params}&taskname=${taskName}&status=${status}&primary_key=${primary_key}`;  

    } else if( params == "save" ) {
        taskName = document.querySelector(".selected");
        taskName = elem.querySelector(".task_name").innerText;

        sql_operation = `op=${params}&taskname=${taskName}&status=${status}&primary_key=${primary_key}`;

    } else if ( params == "delete" ) {
        sql_operation = `op=${params}&taskname=${taskName}&primary_key=${primary_key}`;
    } else if( params =="update" ){

    }
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if(xmlhttp.responseText){
                console.log(xmlhttp.responseText);
            }
            else {
                
            }
        }
    };
    xmlhttp.open("POST", "updateData.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(sql_operation);
    console.log(sql_operation);
}

function removeOld(elem) {    
    // get the current selected list
    let tmpList = document.querySelector(".selected");
    if (!tmpList) {
        alert("Select a List First !!");
        return 0;
    }
    // get the primary key of current selected list
    let primary_key = parseInt(tmpList.
                        querySelector(".list_name").
                        getAttributeNode("data-primary-key").
                        value);
    
    
    var taskName = elem.querySelector(".task_name").innerText;

    var sql_operation = `op=delete&taskname=${taskName}&primary_key=${primary_key}`;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if(xmlhttp.responseText){
            }
            else {
            }
        }
    };
    xmlhttp.open("POST", "updateData.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(sql_operation);
}

function signout() {
    window.location = "signout.php";
}

window.onload = function(){          
        onStartUp();

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
