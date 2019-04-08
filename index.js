newTask = "";
totalTask = 0;
function createNewTask(){
    newTask = document.querySelector("#fnode");
    newTask.innerHTML = `<div class="task">
                            <span class="done ">
                                <input type="checkbox" onclick="completed(this)">
                            </span>
                            <span class="numberTag">${++totalTask}</span>
                            <span class="task_name"></span>
                            <span class="delete_task" title="Delete Task Name" onclick="deleteTask(this)"></span>
                            <span class="edit_task"  title="Edit Task Name" onclick="editTask(this)"></span>                
                            <span class="save" title="Click To Save" onclick="save(this)"></span>                
                        </div>`;

    newTask = document.querySelector("#fnode");
    newTask = newTask.querySelector(".task");
    document.querySelector("#fnode").innerHTML = "";
}
function completed(elem){
    var r = elem.parentElement.parentElement.getElementsByClassName("task_name")[0];
    if( elem.checked ){
        console.log(elem.value);
        r.innerHTML = "<del>" + r.innerHTML + "</del>";
        elem.parentElement.parentElement.querySelector(".edit_task").style.display = "none";
        updateOnline("complete",elem.parentElement.parentElement);
    } else {
        r.innerHTML = r.innerText;
        elem.parentElement.parentElement.querySelector(".edit_task").style.display = "inline-block";
        updateOnline("unfinished",elem.parentElement.parentElement);
    }
}


function addnew(nodeToBeAdded){
    if(nodeToBeAdded){
        newTask = nodeToBeAdded;
        document.querySelector("#task_container").appendChild(newTask);
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
    elem.parentElement.remove();
    //console.log(elem + "Deleted ");
    updateOnline("delete",elem.parentElement);
}

function editTask(elem){
    var p = elem.parentElement;
    var taskName = p.querySelector(".task_name");
    var taskValue = taskName.innerText;
    removeOld(taskValue);
    p.querySelector(".edit_task").style.display = "none";
    p.querySelector(".delete_task").style.display = "none";
    p.querySelector(".save").style.display = "inline-block";
    p.querySelector("input").style.visibility = "hidden";

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
    if(editedText.value.length < 1){
        deleteTask(elem);
        //console.log(editedText);
    }
    var span = document.createElement("span");
    var Class = document.createAttribute("class");
    Class.value = "task_name";
    span.setAttributeNode(Class);
    span.innerText = editedText.value.substr(0,35);
    editedText.replaceWith(span);
    p.querySelector(".edit_task").style.display = "inline-block";
    p.querySelector(".delete_task").style.display = "inline-block";
    p.querySelector("input").style.visibility = "visible";
    p.querySelector(".save").style.display = "none";
    updateOnline("save",elem.parentElement);
}

function onStartUp(){
    var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				if(xmlhttp.responseText){
                    render(this.responseText);
				}
				else {
					
				}
            }
        };
    xmlhttp.open("POST", "getData.php", true);
    xmlhttp.send();
}

function render(data){
    var data  = `${data}`;
    if( data == "x0x[]" ){
        console.log("No Task Found");        
        return 0;
    }
    data = JSON.parse(data);
    // Pushing the data to DOM
    data.forEach((element,index,self) => {
        //element = self[self.length-1-index];
        if(element["status"]=="done"){
            status = "checked";
            tname = `<span class="task_name"><del>${element["taskname"]}</del></span>`;
        } else {
            status = "";
            tname = `<span class="task_name">${element["taskname"]}</span>`;
        }
        var tmp_task = `<div class="task">
                            <span class="done">
                                <input type="checkbox" onclick="completed(this)" ${status}>
                            </span>
                            <span class="numberTag">${++totalTask}</span>
                            ${tname}
                            <span class="delete_task" title="Delete Task Name" onclick="deleteTask(this)"></span>
                            <span class="edit_task"  title="Edit Task Name" onclick="editTask(this)"></span>                
                            <span class="save" title="Click To Save" onclick="save(this)"></span>                
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
}

function updateOnline(params,elem) {
   
    var data;
    var taskName = elem.querySelector(".task_name").innerText;
    var status;
    if(elem.querySelector("input").checked){
        status = "done";
    } else {
        status = "unfinished";
    }

    if( params == "complete" ){
        data = `op=${params}&taskname=${taskName}&status=${status}`;        
    } else if( params == "unfinished" ){
        data = `op=${params}&taskname=${taskName}&status=${status}`;  

    } else if( params == "save" ) {
        data = `op=${params}&taskname=${taskName}&status=${status}`;

    } else if ( params == "delete" ) {
        data = `op=${params}&taskname=${taskName}`;
    } else if( params =="update" ){

    }
    //console.log(data);
    
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
    xmlhttp.send(data);
}
function removeOld(value) {
    data = `op=delete&taskname=${value}`;
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
    xmlhttp.send(data);
}

function signout() {
    window.location = "signout.php";
}
window.onload = onStartUp;

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
