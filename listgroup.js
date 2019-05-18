/**************************
  * Remember Folks GLOBAL *
  *  ~Veriables Are Evil~   *
  **************************/

var newList = "";
var totalList = 0;
var delete_or_modify = 0;
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
        editList(newly_created_list);
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
    if(flag){
        updateOnlineList("delete",elem.parentElement);
        console.log(elem + "Deleted ");
    }
    // Clearing the task container
    if(elem.parentElement.classList.contains("selected")){
        document.querySelector("#task_container").innerHTML="";
    }
}

function editList(elem){
    var list = elem.parentElement;
    var listName = list.querySelector(".list_name").innerText;
    // checks if the list name is newly created or old and to be modified
    if( listName.length > 0 ){
        delete_or_modify = 1;
        totalList = 0;
        oldListName = listName;
        console.log("editList :1:"+parseInt(list.querySelector(".list_name").getAttributeNode("data-primary-key").value));
        before_edited_old_primary_key = parseInt(list.querySelector(".list_name").getAttributeNode("data-primary-key").value);
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
    new_onlick_attribute.value = "updateList(this)";
    list_name_of.setAttributeNode(new_onlick_attribute);

    // if its a newly created list
    if( delete_or_modify == 0 ){
        new_data_attribute.value = new_key(list_name_of.innerText);
        list_name_of.setAttributeNode(new_data_attribute);
        updateOnlineList("save",newly_created_list);    
    // if it's a old list
    } else{
        new_data_attribute.value = before_edited_old_primary_key;
        list_name_of.setAttributeNode(new_data_attribute);
        modifyOldList("modify",elem);
    }
}


// This function fetches data from database
// inersts them into the list
function renderlistgroup(data){
    var data  = `${data}`;
   // console.log(data);
    if( data.includes("x0x") ){
        console.log("No List Found");        
        return 0;
    }
    data = JSON.parse(data);
    // Pushing the data to DOM
    // console.log(data[0].is_selected);

    data.forEach((element) => {
        if( parseInt(element.is_selected) ){
            selected = "selected";
        } else {
            selected = "";
        }
        var tmp_list = `<div class="list  ${selected}">
                            <span class="numberTagList" onclick="updateList(this.nextElementSibling)">${++totalList}</span>
                            <span class="list_name"  onclick="updateList(this)" data-primary-key="${element['primary_key']}">${element['list_name']}</span>
                            <span class="delete_list" title="Delete Task Name" onclick="deleteList(this)">
                                <svg viewBox="0 0 24 24" id="ic_delete_24px" width="100%" height="100%"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                            </span>
                            <span class="edit_list"  title="Edit Task Name" onclick="editList(this)">
                                <svg viewBox="0 0 24 24" id="ic_edit_24px" width="100%" height="100%"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                            </span>                
                            <span class="save_list" title="Click To Save" onclick="saveList(this)">Save</span>                
                        </div>`;        
        fnode = document.querySelector("#fnode");
        fnode.innerHTML = tmp_list;
        tmp_list = document.querySelector("#fnode");
        tmp_list = tmp_list.querySelector(".list");
        // attach onclick event before inserting into the DOM 
        attachEvents(tmp_list);
        // calling the addnewlist function which
        // inserts all the list into the DOM 
        addnewlist(tmp_list);        
    });    

    return 1;
}

function modifyOldList( operation,elem ) {
    totalList = 0;
    var p = elem.parentElement;
    var listName = p.querySelector(".list_name");
    var primary_key = get_primary_key( elem.parentElement );
    var sql = `op=${operation}&newlistname=${listName.innerText}&primary_key=${primary_key}`;
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
    xmlhttp.open("POST", "updateListData.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(sql);
}



// Updates tasks on click on any list
function updateList( node ){
    totalTask = 0;
    console.log(" updateList() function has been invoked ");
    document.querySelector("#task_container").innerHTML="";
    var primary_key = get_primary_key(node.parentElement);
    console.log(primary_key);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if(xmlhttp.responseText){
               var tasks = xmlhttp.responseText;
               tasks = tasks.split("::listafter::")[0];
                changeSelectedHighlight( node );
                render(tasks);
                // changing the header of the task list
                document.querySelector("#header").innerText = node.innerText;
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
        elem.querySelector(".numberTagList").style.background = "white";
        elem.querySelector(".numberTagList").style.color = "#563d7c";
    });     
    node.parentElement.classList.add("selected");
    document.querySelector(".selected").querySelector(".numberTagList").style.background = "#563d7c";
    document.querySelector(".selected").querySelector(".numberTagList").style.color = "white";
}


