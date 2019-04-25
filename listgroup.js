newList = "";
totalList = 0;
function createnewList(){
    newList = document.querySelector("#fnode");
    newList.innerHTML = `<div class="list">
                            <span class="numberTagList" onclick="updateList(this.nextElementSibling)">${++totalList}</span>
                            <span class="list_name" title="click to deploy"  onclick="updateList(this)"></span>
                            <span class="delete_list" title="Delete Task Name" onclick="deleteList(this)"></span>
                            <span class="edit_list"  title="Edit Task Name" onclick="editList(this)"></span>                
                            <span class="save_list" title="Click To Save" onclick="saveList(this)">Save</span>                
                        </div>`;
    newList = document.querySelector("#fnode");
    newList = newList.querySelector(".list");
    document.querySelector("#fnode").innerHTML = "";
    return newList;
}



function addnewlist(nodeToBeAdded){
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
        editList(newly_created_list);
        if(document.querySelector("#clickToAddlist").style.visibility){
            document.querySelector("#clickToAddlist").style.display = "inline-block";
        }
    }
}

function deleteList(elem){ 
    totalTask = 0;
    totalList--;
    
    // This block of code sets the animation of deletion act
    elem.parentElement.style.transitionDuration=".8s";
    elem.parentElement.style.height="0px";
    elem.parentElement.style.opacity="0"; 
    elem.parentElement.style.border="0"; 
    elem.parentElement.style.margin="0"; 
    elem.parentElement.style.padding="0";    
    setTimeout( ()=>{
        elem.parentElement.remove();
    },1100);
    //console.log(elem + "Deleted ");
    updateOnlineList("delete",elem.parentElement);
    // Clearing the task container
    console.log("from deleted"+elem);
    if(elem.parentElement.classList.contains("selected")){
        document.querySelector("#task_container").innerHTML="";
    }
}

function editList(elem){
    var list = elem.parentElement;
    var listName = list.querySelector(".list_name").innerText;
    // checks if the list name is newly created or old and to be modified
    if( listName.length > 1 ){
        removeOldList(elem.parentElement);
        totalList = 0;
    }
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
    if(editedText.value.length < 1){
        deleteList(elem);
        return 0;
    }
    var span = document.createElement("span");
    var Class = document.createAttribute("class");
    Class.value = "list_name";
    span.setAttributeNode(Class);
    span.innerText = editedText.value; //.substr(0,1035);
    editedText.replaceWith(span);

    list.querySelector(".edit_list").style.display = "inline-block";
    list.querySelector(".delete_list").style.display = "inline-block";
    list.querySelector(".save_list").style.display = "none";
    list.querySelector(".numberTagList").style.display = "block";


    //setting a new key to data-primary-key attribute
    var all_list = document.querySelectorAll(".list");
    var newly_created_list = list;
    var list_name_of  = newly_created_list.querySelector(".list_name");
    var new_data_attribute = document.createAttribute("data-primary-key");
    var new_onlick_attribute = document.createAttribute("onclick");
    new_data_attribute.value = new_key(list_name_of.innerText);
    new_onlick_attribute.value = "updateList(this)";
    list_name_of.setAttributeNode(new_data_attribute);
    list_name_of.setAttributeNode(new_onlick_attribute);

    updateOnlineList("save",newly_created_list);    
}


// This function fetches data from database
function renderlistgroup(data){
    var data  = `${data}`;
   // console.log(data);
    if( data.includes("x0x") ){
        console.log("No List Found");        
        return 0;
    }
    data = JSON.parse(data);
    // Pushing the data to DOM
    //console.log(data[0].is_selected);

    data.forEach((element,index) => {
        if( parseInt(element.is_selected) ){
            selected = "selected";
        } else {
            selected = "";
        }
        var tmp_task = `<div class="list  ${selected}">
                            <span class="numberTagList" onclick="updateList(this.nextElementSibling)">${++totalList}</span>
                            <span class="list_name"  onclick="updateList(this)" data-primary-key="${element['primary_key']}">${element['list_name']}</span>
                            <span class="delete_list" title="Delete Task Name" onclick="deleteList(this)"></span>
                            <span class="edit_list"  title="Edit Task Name" onclick="editList(this)"></span>                
                            <span class="save_list" title="Click To Save" onclick="saveList(this)">Save</span>                
                        </div>`;        
        fnode = document.querySelector("#fnode");
        fnode.innerHTML = tmp_task;
        tmp_task = document.querySelector("#fnode");
        tmp_task = tmp_task.querySelector(".list");
        addnewlist(tmp_task);
        
    });    

    return 1;
}

function removeOldList( elem ) {
    totalList = 0;
    var p = elem.parentElement;
    var listName = p.querySelector(".list_name");
    console.log(elem);
    var primary_key = get_primary_key( elem );
    data = `op=delete&listname=${listName.innerText}&primary_key=${primary_key}`;
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
    xmlhttp.open("POST", "updateListData.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(data);
}



// Updates tasks on click on any list
function updateList( node ){
    totalTask = 0;
    console.log("updateList function has been called ");
    document.querySelector("#task_container").innerHTML="";
    var primary_key = get_primary_key(node.parentElement);
    console.log(primary_key);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if(xmlhttp.responseText){
                data = xmlhttp.responseText;
                data = data.split("::listafter::")[0];
                changeSelectedHighlight( node );
                render(data);
            }
            else {
                
            }
        }
    };
    xmlhttp.open("POST", "getListData.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(`primary_key=${primary_key}&primary_key_set=yes`);
}


// Updates newly added or edited list names online
function updateOnlineList(operation,elem) {
    var data;
    var listName = elem.querySelector(".list_name").innerText;
    var primary_key = get_primary_key(elem);

    if( operation == "save" ) {
        data = `op=${operation}&listname=${listName}&primary_key=${primary_key}`;
        console.log(data);
    } else if ( operation == "delete" ) {
        data = `op=${operation}&listname=${listName}&primary_key=${primary_key}`;
        console.log(data);
    }

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
    xmlhttp.open("POST", "updateListData.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(data);
}

function get_primary_key(elem){

    var primary_key = elem.querySelector(".list_name").getAttributeNode("data-primary-key").value;

    return parseInt(primary_key);
}

function new_key(listName) {
    
    var date = new Date();
    var tmp = "";
    tmp += date.getFullYear()  
    tmp += date.getMonth(); 
    tmp += date.getDay(); 
    tmp += date.getMinutes();
    tmp += date.getSeconds();

    return tmp;
    
}


function changeSelectedHighlight( node ){
    var all_list = document.querySelectorAll(".list");
    selected = node.parentElement.querySelector(".edit_list");
    all_list.forEach((elem,index)=>{
        elem.classList.remove("selected");
        elem.querySelector(".edit_list").style.background = "url('img/edit2.png')";
        elem.querySelector(".edit_list").style.backgroundSize = "contain";
        elem.querySelector(".numberTagList").style.background = "yellow";
        elem.querySelector(".numberTagList").style.color = "#10a810";
    });     
    node.parentElement.classList.add("selected");
    selected.style.background = "url('img/icons.png')";
    selected.style.backgroundSize = "contain";
    document.querySelector(".selected").querySelector(".numberTagList").style.background = "#10a810";
    document.querySelector(".selected").querySelector(".numberTagList").style.color = "yellow";
}
