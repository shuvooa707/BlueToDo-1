var new_words = [];
var known_words = [];
var unknown_words = [];
var i = 0;

function know(){
    var stagedWord = document.querySelector("#stagedWord"); 
    var copyWord = stagedWord.innerText;
    document.querySelector("#knowcontainer").innerHTML += `<span class="knownWord" title="deploy" onclick="deploy(this)">${stagedWord.innerText}</span>`;
    stagedWord.innerText = new_words[++i];
    var counter = document.querySelector("#counter");
    counter.innerText = `${i+1} / ${new_words.length}`;
    if( new_words.length == i ){            
        document.querySelector("#deployarea").style.display = "block";
        document.querySelector("#chooserConatiner").style.display = "none";
    }

    add_word_to_database(copyWord,"known");
}

function dontknow(){
    var stagedWord = document.querySelector("#stagedWord"); 
    var copyWord = stagedWord.innerText;
    document.querySelector("#dontknowcontainer").innerHTML += `<span class="unknownWord" title="deploy" onclick="deploy(this)">${stagedWord.innerText}</span>`;
    stagedWord.innerText = new_words[++i];
    var counter = document.querySelector("#counter");
    counter.innerText = `${i+1} / ${new_words.length}`;
    if( new_words.length == i ){            
        document.querySelector("#deployarea").style.display = "block";
        document.querySelector("#chooserConatiner").style.display = "none";
    }  
    add_word_to_database(copyWord,"unknown");
}
function render_dont_know_words() {
        unknown_words.forEach( (word,index)=>{
        document.querySelector("#dontknowcontainer").innerHTML += `<span class="unknownWord" title="deploy" onclick="deploy(this)">${word}</span>`;
    });    
}
function render_know_words() {
        known_words.forEach( (word,index)=>{
        document.querySelector("#knowcontainer").innerHTML += `<span class="knownWord" title="deploy" onclick="deploy(this)">${word}</span>`;
    });    
}
function process(){
    // turning the processing animaiton on
    document.querySelector("#processingAnimation").style.display = "block";

    // fetching input text
    var inputText = document.querySelector("#input").value;
    if ( inputText.length < 1 ){
        console.log("input text length is 0");
        return 0;
    }
    i = 0; // 
    var from  = parseInt(document.querySelector("#from").value);
    var to  = parseInt(document.querySelector("#to").value);
    all_word_list = inputText.split(/[!@#$%^&*()?/_\-+=:;"'|}{,.\s]+/).filter( (word,index,self)=>{
        if ( ( word.length > from && word.length < to ) && self.indexOf(word) == index ) {
            return true;
        }
    });

    var chooserConatiner = document.querySelector("#chooserConatiner");
    if ( all_word_list.length > 1) {
        var stagedWord = document.querySelector("#stagedWord");
        var counter = document.querySelector("#counter");

        // loads the words into their appropricate arrays
        all_word_list.forEach( (element) => {
            checkWordStatus(element, ( status )=>{
                if( status == "unknown" ){
                    unknown_words.push(element.toLowerCase());
                } else if ( status == "known" ){
                    known_words.push(element.toLowerCase());
                } else if ( status == "Word not found" ){
                    new_words.push(element.toLowerCase());
                } 
            }); 
        });
        setTimeout( ()=>{                  
            // turning the processing animaiton off
            document.querySelector("#processingAnimation").style.display = "none";        
            counter.innerText = `${i+1} / ${new_words.length}`;
            stagedWord.innerText = new_words[0];
            chooserConatiner.style.display = "block";
            render_dont_know_words();
            if(document.querySelector("#includeknownwords").checked){
                render_know_words();
            }
        },inputText.length/8);
    }
    else {
        console.log("No Input Text Given");
        return;
    }

}

// this block of code puts any word on stage on being clicked on it
function deploy( node ) {
    var deployarea = document.querySelector("#deployarea");
    var chooserConatiner = document.querySelector("#chooserConatiner");
    var deployedWord = document.querySelector("#deployedWord");
    chooserConatiner.style.display = "none";
    deployedWord.innerText = node.innerText;
    deployarea.style.display = "block";
    node.classList.toggle("selectedWord");
}


function closeDeployArea() {
    document.querySelector("#deployarea").style.display = "none";
    document.querySelector("#chooserConatiner").style.display = "block";
}


function checkWordStatus( word, callback){
    
    var sql_operation = `operation=checkWordStatus&word=${word}`;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if(xmlhttp.responseText){
                callback(xmlhttp.responseText);
            }
            else {

            }
        }
    };
    xmlhttp.open("POST", "getWordStatus.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(sql_operation);

}

function add_word_to_database(stagedWord,status) {
    
    var sql_operation = `status=${status}&word=${stagedWord}`;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if(xmlhttp.responseText){
                console.log("2-->" + xmlhttp.responseText);
            }
            else {
                console.log("2-->" + xmlhttp.responseText);
            }
        }
    };
    xmlhttp.open("POST", "addWord.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(sql_operation);
}