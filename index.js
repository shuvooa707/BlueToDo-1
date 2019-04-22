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


function addnew(nodeToBeAdded){
    // Check if any list selected or not
    let tmpList = document.querySelector(".selected");
    if (!tmpList) {
        on("Select a List First !!",".5s");
        return 0;
    }
    // If no List Selected 
    var all_list = document.querySelector(".list");
    if(!all_list){
        on("Please Make A List First",".2s");
        return 0;
    }
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
    },1500);
    //console.log(elem + "Deleted ");
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
        //console.log(editedText);
    } else {
        updateOnline("save",elem.parentElement);
    }
}

// This function fetches data from database
function onStartUp(){
    var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				if(xmlhttp.responseText){
                    data = xmlhttp.responseText;
                    if(data.includes("x0x") && data.includes("list_name") && data.includes("::listafter::")){
                        var tmp = data.substr( data.indexOf("["),data.length-1 );
                        tmp = tmp.split("::listafter::")[0];
                        renderlistgroup( tmp );
                    } else if( data.includes("list_name") && data.includes("::listafter::") ) {
                        renderlistgroup(data.split("::listafter::")[0]);
                        render(data.split("::listafter::")[1]);
                    } else {
                        console.log(data);
                    }
				}
				else {
					
				}
            }
        };
    xmlhttp.open("POST", "getData.php", true);
    xmlhttp.send();
}

// This function renders data on the page 
function render(data){
    //console.log(data);
    //var data  = `${data}`;
    
    // Clearing the task container
    document.querySelector("#task_container").innerHTML="";
    totalTask = 0;
    if( data[0] == "x" ){
        console.log("No Task Found");        
        return 0;
    }
    data = JSON.parse(data);
    // Pushing the data to DOM
    data.forEach((element,index,self) => {
        //element = self[self.length-1-index];
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
}


function updateOnline(params,elem) {
    // get the primary key of current selected list
    var tmpList = document.querySelector(".selected");
    primary_key = tmpList.querySelector(".list_name").getAttributeNode("data-primary-key").value;
    primary_key = parseInt(primary_key);
    var data;
    var taskName = elem.querySelector(".task_name").innerText;
    var status;
    if(elem.querySelector("input").checked){
        status = "done";
    } else {
        status = "unfinished";
    }

    if( params == "complete" ){
        data = `op=${params}&taskname=${taskName}&status=${status}&primary_key=${primary_key}`;        
    } else if( params == "unfinished" ){
        data = `op=${params}&taskname=${taskName}&status=${status}&primary_key=${primary_key}`;  

    } else if( params == "save" ) {
        taskName = document.querySelector(".selected");
        taskName = elem.querySelector(".task_name").innerText;

        data = `op=${params}&taskname=${taskName}&status=${status}&primary_key=${primary_key}`;

    } else if ( params == "delete" ) {
        data = `op=${params}&taskname=${taskName}&primary_key=${primary_key}`;
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
    console.log(data);
}

function removeOld(elem) {    
    // get the primary key of current selected list
    let tmpList = document.querySelector(".selected");
    if (!tmpList) {
        alert("Select a List First !!");
        return 0;
    }
    let primary_key = tmpList.querySelector(".list_name").getAttributeNode("data-primary-key").value;
    primary_key = parseInt(primary_key);
    var taskName = elem.querySelector(".task_name").innerText;

    var data = `op=delete&taskname=${taskName}&primary_key=${primary_key}`;
    console.log(data);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if(xmlhttp.responseText){
                //console.log(xmlhttp.responseText);
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

function updateTasks(params) {
    
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
