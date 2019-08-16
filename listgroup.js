/**************************
  * Remember Folks GLOBAL *
  * Variables Are ~Evil~   *
  **************************/

var newList = "";
var totalList = 0;
var delete_or_modify = 0;
var opType = "";
function createnewList(){
    newList = document.querySelector("#fnode");
    newList.innerHTML = `<div class="list">
                            <span class="numberTagList" onclick="updateList(this.nextElementSibling)">${++totalList}</span>
                            <span class="list_name" title="click to deploy"  onclick="updateList(this)"></span>
                            <span class="delete_list" title="Delete Task Name" onclick="deleteList(this)">
                                <svg viewBox="0 0 24 24" id="ic_delete_24px" width="100%" height="100%"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                            </span>
                            <span class="edit_list"  title="Edit Task Name" onclick="editList(this)">
                                <svg viewBox="0 0 24 24" id="ic_edit_24px" width="100%" height="100%"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                            </span>                
                            <span class="save_list" title="Click To Save" onclick="saveList(this)">Save</span>                
                        </div>`;
    newList = document.querySelector("#fnode");
    newList = newList.querySelector(".list");
    document.querySelector("#fnode").innerHTML = "";
    return newList;
}


// This function *Create new div.list element and returns back*
function addnewlist(nodeToBeAdded){

    // to focus the input field
    n("#list_container").scrollBy(0,-n("#list_container").scrollTop);

    
    // onpageload this if block takes the list that are in 
    // database and puts them in div#list_container element
    if(nodeToBeAdded){
        document.querySelector("#list_container").appendChild(nodeToBeAdded);
    }
    else {            
        //creating a new list element 
        var newList = createnewList();
        document.querySelector("#list_container").prepend(newList);   
        var all_list = document.querySelectorAll(".list");
        var newly_created_list = all_list[all_list.length-1];

        // 
        editList(newly_created_list,"newList");
        if(document.querySelector("#clickToAddlist").style.visibility){
            document.querySelector("#clickToAddlist").style.display = "inline-block";
        }
    }
}

function deleteList(elem){ 
    totalTask = 0;
    totalList--;
    var flag = 0;
    if(elem.previousElementSibling.innerText.length > 0){
        flag = 1;
    }
    elem.parentElement.remove();
    if(flag){
        updateOnlineList("deleteList",elem.parentElement);
        console.log(elem + "Deleted ");
    }
    // Clearing the task container
    if(elem.parentElement.classList.contains("selected")){
        document.querySelector("#task_container").innerHTML="";
    }
}

function editList(elem,typeGiven){
    if( typeGiven == "editOldList" ){
        opType = "editOldList";
        console.log(typeGiven);
    }
    var list = elem.parentElement;
    var listName = list.querySelector(".list_name").innerText;
    // checks if the list name is newly created or old and to be modified
    list.querySelector(".edit_list").style.display = "none";
    list.querySelector(".delete_list").style.display = "none";
    list.querySelector(".save_list").style.display = "inline-block";
    list.querySelector(".numberTagList").style.display = "none";

    var input = document.createElement("input");
    var type = document.createAttribute("type");
    var id = document.createAttribute("id");
    var placeholder = document.createAttribute("placeholder");
    type.value = "text";
    id.value = "editedTextList";
    placeholder.value = "Enter New List Name";

    input.value = listName;
    input.setAttributeNode(type);
    input.setAttributeNode(id);
    input.setAttributeNode(placeholder);
    list.querySelector(".list_name").replaceWith(input);
}


function saveList(elem){
    var list = elem.parentElement;
    var editedText = list.querySelector("#editedTextList");
    // if input field is empty or not
    if(editedText.value.length < 1) {
        deleteList(elem);
        return 0;
    }
    var span = document.createElement("span");
    var spanClass = document.createAttribute("class");
    spanClass.value = "list_name";
    span.setAttributeNode(spanClass);
    span.innerText = editedText.value; //.substr(0,1035);
    editedText.replaceWith(span);
    

    list.querySelector(".edit_list").style.display = "inline-block";
    list.querySelector(".delete_list").style.display = "inline-block";
    list.querySelector(".save_list").style.display = "none";
    list.querySelector(".numberTagList").style.display = "block";

    // setting a new key to data-primary-key attribute
    var newly_created_list = list;
    var list_name_of  = newly_created_list.querySelector(".list_name");
    var new_onlick_attribute = document.createAttribute("onclick");
    new_onlick_attribute.value = "updateList(this,'editOldList')";
    list_name_of.setAttributeNode(new_onlick_attribute);

    
    // console.log("type",type);
    // if its a newly created list
    if( opType != "editOldList" ){
        updateOnlineList("saveNewList",newly_created_list);    
    // if it's a old list
    } else {
        console.log("modifyOldList");
        modifyOldList("renameList",elem);
    }
}


// This function fetches data from database
// inersts them into the list
function renderlistgroup(data){
    console.log(data);
    highlightedElement = "";
    data.forEach((element) => {
        var tmp_list = `<div class="list" data-list-id="${element.list_list_id}" >
                        <span class="list-date">${element.list_date}</span>
                            <span class="numberTagList" onclick="updateList(this.nextElementSibling)">${ element.number_of_tasks }</span>
                            <span class="list_name"  onclick="updateList(this)" data-list_id="${element['list_list_id']}">${element['list_name']}</span>
                            <span class="delete_list" title="Delete Task Name" onclick="deleteList(this)">
                                <svg viewBox="0 0 24 24" id="ic_delete_24px" width="100%" height="100%"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                            </span>
                            <span class="edit_list"  title="Edit Task Name" onclick="editList(this,'editOldList')">
                                <svg viewBox="0 0 24 24" id="ic_edit_24px" width="100%" height="100%"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                            </span>                
                            <span class="save_list" title="Click To Save" onclick="saveList(this)">Save</span>                
                        </div>`;        
        fnode = document.querySelector("#fnode");
        fnode.innerHTML = tmp_list;
        tmp_list = document.querySelector("#fnode");
        tmp_list = tmp_list.querySelector(".list");
        // attach onclick event before inserting into the DOM 
//         attachEvents(tmp_list);
        // calling the addnewlist function which
        // inserts all the list into the DOM 
        addnewlist(tmp_list); 
        if( parseInt(element.is_selected) ){
            highlightedElement = tmp_list;
        }       
    });    
    // console.log(highlightedElement);
    // highlighting the list on page load
    highlightedElement.querySelector(".list_name").click();

    return 1;
}

function modifyOldList( operation,elem ) {
    totalList = 0;
    var p = elem.parentElement;
    var listName = p.querySelector(".list_name");
    var list_list_id = elem.parentElement.getAttributeNode("data-list-id").value;
    var sql = `op=renameList&newlistname=${listName.innerText}&list_list_id=${list_list_id}`;
    console.log(sql);
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
    xmlhttp.open("POST", "backend.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(sql);
}



// Updates tasks on click on any list
function updateList( node ){
    changeSelectedHighlight( node );
    totalTask = 0;
    console.log(" updateList() function has been invoked ");
    document.querySelector("#task_container").innerHTML="";
    var list_id = parseInt(node.parentElement.getAttributeNode("data-list-id").value);
    console.log(list_id);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if( xmlhttp.responseText.length > 10 ){
                var tasks = JSON.parse(xmlhttp.responseText);
                console.log(tasks);
                renderTasks(tasks);
                // changing the header of the task list
                document.querySelector("#header").innerText = node.innerText;
                // highlighing the clicked List
                changeSelectedHighlight( node );
                // setting the description for the list
                var taskDescription = document.querySelector("#task-description");
                taskDescription.innerText = tasks[0]["description"];
                console.log(tasks);
                
            }
            else {      
                console.log("Tango 108");
            }
        }
    };
    xmlhttp.open("POST", "backend.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(`operation=getTasksOfList&list_id=${list_id}`);
}


// Updates newly added or edited list names online
function updateOnlineList(operation,elem) {
    var data;
    var listName = elem.querySelector(".list_name").innerText;

    if( operation == "saveNewList" ) {
        data = `op=${operation}&listname=${listName}`;
        console.log(data);
    } else if ( operation == "deleteList" ) {
        var list_id = parseInt(elem.getAttributeNode("data-list-id").value);
        data = `op=${operation}&listname=${listName}&list_list_id=${list_id}`;
        console.log(data);
    }

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if(xmlhttp.responseText){
                //console.log(xmlhttp.responseText);
                var new_data_attribute = document.createAttribute("data-list-id");
                new_data_attribute.value = xmlhttp.responseText;
                elem.setAttributeNode(new_data_attribute);
                // highlighting the newly created list
                setTimeout( ()=>{elem.click()},2);
            }
            else {
                
            }
        }
    };
    xmlhttp.open("POST", "backend.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(data);
}


function changeSelectedHighlight( node ){
    console.trace();
    var all_list = document.querySelectorAll(".list");
    console.log(node);
    selected = node.parentElement.querySelector(".edit_list");
    all_list.forEach( elem=>{
        elem.classList.remove("selected");
        elem.querySelector(".numberTagList").style.background = "white";
        elem.querySelector(".numberTagList").style.color = "#563d7c";
    });     
    node.parentElement.classList.add("selected");
    document.querySelector(".selected").querySelector(".numberTagList").style.background = "#563d7c";
    document.querySelector(".selected").querySelector(".numberTagList").style.color = "white";
}


function findSelectedList() {
    
}