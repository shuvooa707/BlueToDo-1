newTask = "";
totalTask = 0;

// Creates a new Task and returns it
function createNewTask() {
    newTask = document.querySelector("#fnode");
    newTask.innerHTML = `<div class="task" data-task-finishing-time="null" data-task-description="Add a short description">
                            <span class="done ">
                                <input type="checkbox" onclick="completed(this)">
                            </span>
                            <span class="numberTagTask">${++totalTask}</span>
                            <span class="task_name" onclick="expandTask(this)"></span>
                            <span class="delete_task" title="Delete Task Name" onclick="deleteTask(this)">
                                <svg viewBox="0 0 24 24" id="ic_delete_24px" width="100%" height="100%"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                            </span>
                            <span class="edit_task"  title="Edit Task Name" onclick="editTask(this,'update')">
                                <svg viewBox="0 0 24 24" id="ic_edit_24px" width="100%" height="100%"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                            </span>                
                            <span class="save saveTask" title="Click To Save" onclick="save(this)">Save</span>                
                        </div>`;

    newTask = document.querySelector("#fnode");
    newTask = newTask.querySelector(".task");
    document.querySelector("#fnode").innerHTML = "";
    return newTask;
}
// check the task on being clicked on the name of the task
function expandTask(elem) {
    elem.parentElement.querySelector("input[type='checkbox']").click();
}

function completed(elem) {
    var r = elem.parentElement.parentElement.querySelector(".task_name");
    // clicked task
    if (elem.checked) {
        r.classList.add("line-through");
        elem.parentElement.parentElement.querySelector(".edit_task").style.display = "none";
        updateOnline("complete", elem.parentElement.parentElement);

        // calls the aside_completed_task() function to make the
        // completed task bring aside in the task list
        aside_completed_task(elem.parentElement.parentElement, "DOWN");
    } else {

        r.classList.remove("line-through");
        elem.parentElement.parentElement.querySelector(".edit_task").style.display = "inline-block";
        updateOnline("unfinished", elem.parentElement.parentElement);

        // calls the aside_completed_task() function to make the
        // completed task bring aside in the task list
        aside_completed_task(elem.parentElement.parentElement, "UP");
    }
}

function aside_completed_task(task, direction) {
    var task_container = document.querySelector("#task_container");
    var tmp = task;
    if (direction == "DOWN") {
        disappear(task);
        setTimeout(()=>{
            task_container.removeChild(task);
            task_container.appendChild(tmp);
            appear(task);
        }
        , 500);
    } else {
        disappear(task);
        setTimeout(()=>{
            task_container.removeChild(task);
            task_container.prepend(tmp);
            appear(task);
        }
        , 500);
    }
}

var animatorTime = 1;
function addnew(nodeToBeAdded) {
    // to focus the input field
    n("#task_container").scrollBy(0,-n("#task_container").scrollTop);
    
    // If no List Selected 
    var all_list = document.querySelector(".list");
    if (!all_list) {
        on("Please Make A List First", ".2s");
        return 0;
    }
    if (nodeToBeAdded) {
        nodeToBeAdded.style.transitionDuration = ".5s";
        nodeToBeAdded.style.opacity = "0";
        setTimeout(()=>{
            nodeToBeAdded.style.opacity = "1";
        }
        , (animatorTime++) * 100);
        document.querySelector("#task_container").appendChild(nodeToBeAdded);
    } else {
        createNewTask();
        document.querySelector("#task_container").prepend(newTask);
        allTask = document.querySelectorAll(".task");
        editTask(allTask[allTask.length - 1]);
        if (document.querySelector("#clickToAdd").style.visibility) {
            document.querySelector("#clickToAdd").style.display = "inline-block";
        }
    }
}

function deleteTask(elem) {
    // reducing the totaltask by one
    totalTask--;
    // This block of code sets the animation of deletion act
    elem.parentElement.style.transitionDuration = ".8s";
    elem.parentElement.style.height = "0px";
    elem.parentElement.style.opacity = "0";
    elem.parentElement.style.border = "0";
    elem.parentElement.style.marginBottom = "0";
    elem.parentElement.style.padding = "0";

    if (elem.parentElement.querySelector(".task_name") && elem.parentElement.querySelector(".task_name").innerText.length > 0) {
        updateOnline("delete", elem.parentElement);
    }

    setTimeout(()=>{
        elem.parentElement.remove();
    }
    , 900);
}

function editTask(elem, operation) {
    var task = elem.parentElement;
    var taskName = task.querySelector(".task_name");
    var taskValue = taskName.innerText;
    taskNameOld = taskValue;
    if (operation != "update" && taskValue.length > 0) {
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

function save(elem) {
    var saveTask = document.querySelector(".saveTask");
    saveTask.onclick = function(){
        update(saveTask);
    }
    // If there is no text entered in other words
    // if the no input is given
    var p = elem.parentElement;
    var editedText = p.querySelector("#editedText");
    if (editedText.value.length < 1) {
        console.log("dsfjng kjsefsd");
        deleteTask(elem);
        return 0;
    }
    var span = document.createElement("span");
    var Class = document.createAttribute("class");
    var onclick = document.createAttribute("onclick");
    Class.value = "task_name";
    onclick.value = "expandTask(this)";
    span.setAttributeNode(Class);
    span.setAttributeNode(onclick);
    span.innerText = editedText.value;
    ///.substr(0,35);
    editedText.replaceWith(span);
    p.querySelector(".edit_task").style.display = "inline-block";
    p.querySelector(".delete_task").style.display = "inline-block";
    p.querySelector("input").style.visibility = "visible";
    p.querySelector(".save").style.display = "none";

    updateOnline("save", elem.parentElement);

}
function update(elem) {
    console.log(elem.parentElement);
    var p = elem.parentElement;
    var editedText = p.querySelector("#editedText");
    if (editedText.value.length < 1) {
        console.log("no text inputted");
        deleteTask(elem);
        return 0;
    }
    var span = document.createElement("span");
    var Class = document.createAttribute("class");
    var onclick = document.createAttribute("onclick");
    Class.value = "task_name";
    onclick.value = "expandTask(this)";
    span.setAttributeNode(Class);
    span.setAttributeNode(onclick);
    span.innerText = editedText.value;
    ///.substr(0,35);
    editedText.replaceWith(span);
    p.querySelector(".edit_task").style.display = "inline-block";
    p.querySelector(".delete_task").style.display = "inline-block";
    p.querySelector("input").style.visibility = "visible";
    p.querySelector(".save").style.display = "none";

    updateOnline("renameTask", elem.parentElement, taskNameOld);
}

// This function fetches data from database after page loading 
function onStartUp() {
    var xmlhttp = new XMLHttpRequest();
    // getData.php is the file used to fetch data from database
    xmlhttp.open("POST", "backend.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("operation=getListPostOnStartUp");
    // if it returns data then that data is given to render funtion to be put on DOM
    if (xmlhttp.responseText.length > 5) {
        var tasks = JSON.parse(xmlhttp.responseText)[1];
        var lists = JSON.parse(xmlhttp.responseText)[0];
        // console.log(tasks);
        renderlistgroup(lists);
        renderTasks(tasks);

        // setting the description for the list
        var taskDescription = document.querySelector("#task-description");
        taskDescription.innerText = tasks[0]["description"] || "";

    } else {
        // if response does not come then prints it on console window
        console.log("Something Went Worng!! Response Didn't Come");
    }
}

// This function draws data on the page in other 
// language it draws the data on on page using DOM
function renderTasks(tasks) {

    // Clearing the task container on for rendering 
    // or re-rendering the tasks
    document.querySelector("#task_container").innerHTML = "";
    totalTask = 0;

    // Pushing the data to DOM
    tasks.sort((a,b)=>{
        if (a.status == "done" && b.status != "done") {
            return 1;
        } else if (a.status != "done" && b.status == "done") {
            return -1;
        }
    }
    ).forEach((element)=>{
        if (element["status"] == "done") {
            status = "checked";
            tname = `<span class="task_name line-through" onclick="expandTask(this)">${element["taskname"]}</span>`;
        } else {
            status = "";
            tname = `<span class="task_name" onclick="expandTask(this)">${element["taskname"]}</span>`;
        }
        var tmp_task = `<div class="task" data-task-id="${element.tasks_task_id}"   data-task-description="${element.tasks_description || ''}" data-task-finishing-time="${element.tasks_finish_within}">
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
        if (element["status"] == "done") {
            tmp_task.querySelector(".edit_task").style.display = "none";
        }
        document.querySelector("#fnode").innerHTML = "";
    }
    );
    animatorTime = 0;
}

// This function is used to update data on database like:-
// when any list is deleted this funtion is triggered with 
// the deleted list and operation to do which in case is delete 
// as parameter. Same goes for renaming of list and creating new list
function updateOnline(operation, elem, taskNameOld) {
    var sql_operation;
    var taskNameNew = taskName = elem.querySelector(".task_name").innerHTML;
    var status;
    if (elem.querySelector("input").checked) {
        status = "done";
    } else {
        status = "unfinished";
    }

    if (operation == "complete") {
        var task_id = elem.getAttributeNode("data-task-id").value;
        sql_operation = `op=${operation}&status=${status}&tasks_task_id=${task_id}`;
    } else if (operation == "unfinished") {
        var task_id = elem.getAttributeNode("data-task-id").value;
        sql_operation = `op=${operation}&status=${status}&tasks_task_id=${task_id}`;

    } else if (operation == "save") {
        var taskName = elem.querySelector(".task_name").innerHTML.trim();
        var tasks_list_id = parseInt(document.querySelector(".selected").getAttributeNode("data-list-id").value);
        sql_operation = `op=${operation}&taskname=${taskName}&status=${status}&tasks_list_id=${tasks_list_id}`;

    } else if (operation == "delete") {
        var task_id = parseInt(elem.getAttributeNode("data-task-id").value);
        sql_operation = `op=${operation}&taskname=${taskName}&tasks_task_id=${task_id}`;
    } else if (operation == "renameTask") {
        var task_id = parseInt(elem.getAttributeNode("data-task-id").value);
        sql_operation = `op=${operation}&tasknameold=${taskNameOld}&tasknamenew=${taskNameNew}&tasks_task_id=${task_id}`;
    } else if (operation == "updateTask") {
        var taskDescription = elem.getAttributeNode("data-task-description").value;
        var taskFinishingDate = elem.getAttributeNode("data-task-finishing-time").value;
        var task_id = parseInt(elem.getAttributeNode("data-task-id").value);
        sql_operation = `op=${operation}&tasknamenew=${taskNameNew}&taskDescription=${taskDescription}&taskFinishingDate=${taskFinishingDate}&tasks_task_id=${task_id}`;
    }

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "backend.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(sql_operation);
    
    var respnseStatus = JSON.parse(xmlhttp.responseText)["respnseStatus"] || "";
    if( respnseStatus == "saveSuccess" ) {
        var numberTagList = document.querySelector(".selected").querySelector(".numberTagList");
        numberTagList.innerText = parseInt(numberTagList.innerText) + 1;
    }
    if( respnseStatus == "deleteSuccess" ) {
        var numberTagList = document.querySelector(".selected").querySelector(".numberTagList");
        numberTagList.innerText = parseInt(numberTagList.innerText) - 1;
    }

    //console.log(sql_operation);
    // n("")

    if (operation == "save") {
        var taskId = JSON.parse(xmlhttp.responseText)["taskId"] || "";
        elem.setAttribute("data-task-id", parseInt(taskId));
    }
    console.log(parseInt(xmlhttp.responseText));
}

//
function attachEvents(list) {
    list.addEventListener("click", (e)=>{
        var flag = "listonly";
        e.path.forEach((elem)=>{
            if (elem.className == "edit_list") {
                flag = "editlist";
            } else if (elem.className == "delete_list") {
                flag = "deletelist";
            } else if (elem.className == "save_list") {
                flag = "savelist";
            }
        }
        );
        if (flag == "editlist") {//             console.log(" %cEdit  ","color:purple");
        } else if (flag == "deletelist") {//             console.log(" %cDelete  ","color:red");
        } else if (flag == "savelist") {//             console.log(" %c Save  ","color:green");
        } else {
            console.log(list.querySelector(".list_name"));
            updateList(list.querySelector(".list_name"));
        }
    }
    );

}
// this function pauses the moving animation on being clicked 
function playNpause(node) {
    if (node.id == "clickToAddlist") {
        node.classList.remove("animate1");
        setTimeout(()=>{
            node.classList.add("animate1");
        }
        , 1);
    } else if (node.id == "clickToAdd") {
        node.classList.remove("animate2");
        setTimeout(()=>{
            node.classList.add("animate2");
        }
        , 1);
    }
}

function signout() {
    window.location = "signout.php";
}

window.onload = function() {
    onStartUp();
    //attachEvents();

};

function disappear(node, transition) {
    node.style.transitionDuration = transition ? transition : ".5s";
    node.style.height = node.offsetHeight + 'px';
    setTimeout(()=>{
        node.style.opacity = "0";
        node.style.height = "0px";
    }
    , 1);
}
function appear(node, transition) {
    node.style.transitionDuration = transition ? transition : ".5s";
    node.style.height = '0px';
    setTimeout(()=>{
        node.style.opacity = "1";
        node.style.height = "44px";
    }
    , 1);
}

function expandTask(task) {
    
    // close the taskExpandOverlay onclick on out of the main body
    document.querySelector("#taskExpandOverlay").addEventListener("click",()=>{
        console.log(window.event.target);
        var taskExpandOverlay = n("#taskExpandOverlay");
        if( !window.event.path.includes(n("#taskExpandBody")) ){
            taskExpandOverlay.style.display = "none";
        }
    });


    console.log(task);
    var taskExpandBodyTaskName = document.querySelector("#taskExpandBody-taskname");
    var taskExpandBodyTaskDescription = document.querySelector("#taskExpandBody-task-description");
    var taskExpandBodyFinishingTime = document.querySelector("#taskExpandBody-task-finishing-time");
    taskExpandBodyTaskName.innerHTML = task.innerHTML;
    if (task.classList.contains("line-through")) {
        taskExpandBodyTaskName.classList.add("line-through");
    } else {
        taskExpandBodyTaskName.classList.remove("line-through");
    }
    var description = task.parentElement.getAttributeNode("data-task-description").value && task.parentElement.getAttributeNode("data-task-description").value != "0" ? task.parentElement.getAttributeNode("data-task-description").value : "Add a short description <span style='font-weight:bold; cursor:pointer; color:white;background:black; border-radius:3px; padding:2px 4px;'>+</span>";
    var finishingTime = task.parentElement.getAttributeNode("data-task-finishing-time").value;
    taskExpandBodyFinishingTime.innerText = finishingTime;
    taskExpandBodyTaskDescription.innerHTML = description;
    document.querySelector("#taskExpandOverlay").style.display = "block";
    var data_task_id = task.parentElement.getAttributeNode("data-task-id").value;
    console.log(data_task_id);
    var dtid = document.createAttribute("data-task-id");
    dtid.value = data_task_id;
    document.querySelector("#taskExpandBody").setAttributeNode(dtid);
    timer(finishingTime);
    function timer(time) {
        finishingTime = new Date(time);
        var now = new Date();
        var timerTime = document.querySelector("#taskExpandBody-timer-right #timer");
        timerTime.innerText = "";
    }
}

function taskExpandBodyprecompleted(node) {
    let dtid = node.getAttributeNode("data-task-id").value;
    let tasks = document.querySelectorAll(".task");
    let task = tasks.forEach((e)=>{
        var ti = e.getAttributeNode("data-task-id").value;
        if (ti == dtid) {
            // console.log(e.querySelector("input[type='checkbox']"));
            e.querySelector("input[type='checkbox']").click();
            var status = n("#taskExpandBody #status");
            var taskExpandBodyTaskName = n("#taskExpandBody-taskname");
            var finishedOrNot = n("#taskExpandBody-timer-right > span");

            taskExpandBodyTaskName.classList.toggle("line-through");
            if (finishedOrNot.innerText == "Finished At") {
                finishedOrNot.innerText = "Time Left";
                status.style.background = "orange";
                status.style.color = "black";
                status.innerText = "Pending..";
            } else {
                finishedOrNot.innerText = "Finished At";
                status.style.background = "green";
                status.style.color = "white";
                status.innerText = "Done";
            }
        }
    }
    );
}

function n(id) {
    return document.querySelector(id);
}

function GKEdit(node, type) {
    let top = node.offsetTop + node.offsetHeight;
    let left = node.offsetLeft + (node.offsetWidth);
    var inputField = `
        <div id="GKE" style="
            width:350px;
            min-height:50px; 
            padding:10px; 
            border-radius:3px;
            border:1px solid #aaa;
            position:absolute;
            top:${top}px;
            left:${left}px;
            background:white;
            z-index:10002;
            ">
            
            <textarea id="GKEInput" style="
                resize:none;outline:none;
                min-height: 120px;
                max-height: 200px;
                /* border:3px; */
                width:100%;
                box-sizing: border-box;
                border-radius: 3px;
                border:1px solid #ccc;
                padding:5px;
                  

            ">
            ${node.innerHTML}
            </textarea>
            <button id="GKESave" style="                
                width: 100px;
                height: 34px;
                border:none;
                background:dodgerblue;
                color:white;
                cursor:pointer;
                text-align: center;
                padding: 0;
                border-radius: 3px; 
                box-shadow: 1px 1px 2px #00000021;             
            ">Save</button> 
            <button id="GKCancel" onclick="this.parentElement.remove()" style="                
                width: 100px;
                height: 34px;
                border:none;
                background:lightcoral;
                color:white;
                cursor:pointer;
                padding: 0px;
                border-radius: 3px;
                box-shadow: 1px 1px 2px #00000021;            
            ">Cancel</button>             
        </div>
    `;

    let tmpSpan = document.createElement("span");
    tmpSpan.style.display = node;
    tmpSpan.innerHTML = inputField;
    inputField = tmpSpan.querySelector("#GKE");
    document.body.appendChild(inputField);
    node.classList.add("GKEKey");

    document.querySelector("#GKESave").addEventListener("click", function() {
        var node = document.querySelector(".GKEKey");
        var t = document.querySelector("#GKEInput");
        node.innerHTML = t.value;
        node.classList.remove("GKEKey");
        var datataskid = parseInt(n("#taskExpandBody").getAttributeNode("data-task-id").value);
        var task = [...document.querySelectorAll(".task")].filter(element=>{
            var tmpDataTaskId = parseInt(element.getAttributeNode("data-task-id").value);
            if (tmpDataTaskId == datataskid) {
                return true;
            }
        }
        )[0];
        if (type == "description") {
            task.setAttribute("data-task-description", document.querySelector("#GKEInput").value.trim());
        }
        if (type == "taskname") {
            task.querySelector(".task_name").innerHTML = document.querySelector("#GKEInput").value.trim();
        }
        if (type == "finishingTime") {
            task.setAttribute("data-task-finishing-time", document.querySelector("#GKEInput").value.trim());
        }

        updateOnline("updateTask", task)

        document.querySelector("#GKE").remove();
    });
    n("#GKCancel").addEventListener("click", ()=>{
        n(".GKEKey").classList.remove("GKEKey");
    });
}


function printTaskList() {

    var listToBePrinted = document.querySelector("#task_container");
    listToBePrinted.style.margin = "50px auto";
    listToBePrinted.style.width = document.querySelector("#container").offsetWidth + "px";
    listToBePrinted.style.height = "auto";
    listToBePrinted.style.overflow = "visible";
    listToBePrinted = listToBePrinted.outerHTML;
    body = document.createElement("div");
    body.setAttribute("id","printedBody");
    body.setAttribute("style",`
        width:100%;
        height:100%;
        position:absolute;
        z-index:90000;
        background-color:white;
    `);
    body.innerHTML = listToBePrinted;
    var bodyReserve = document.body.innerHTML;
    document.body.innerHTML = "";
    document.body.appendChild(body);
}



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
// GKEdit();
// printTaskList();

