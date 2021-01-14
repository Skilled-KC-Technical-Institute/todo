document.getElementById('addItem').addEventListener("click", function(event){
    addItem(); 
    //alert something
    //I could just make an API call immediately
    //I could console.log something
    //write any code you want in here 
});


function deleteItem(id){
    console.log("About to make a call to deleteItemRequest!"); 
    deleteItemRequest(id).then(function(success){
        alert("Deleted!"); 
    }).catch(function(error){
        console.log(error); 
    }); 
}

async function deleteItemRequest(id){
    let data = {
        _id : id
    }

    let requestOptions = {
        method  : "DELETE",
        body    : JSON.stringify(data),
        headers : { "Content-Type": "application/json"} 
    }
    console.log("About to make a fetch!"); 
    const response = await fetch("/items", requestOptions); 
    console.log(response);

    return false; 

}

function addItem(){
    console.log("1"); 
    postItem().then(function(result){
        //do something here if we succeed 
        alert("success!"); 
    }).catch(function(error){
        console.log(error); 
    })  
    console.log("4")
    //do more stuff here 
}

async function postItem(){
    let dropdown = document.getElementById("itemPriority");
    let selection = dropdown.options[dropdown.selectedIndex].value;
    let data = {
        itemName     : document.getElementById("itemName").value,
        itemPriority : selection,
        assignee     : document.getElementById("assignee").value, 
        completed    : false
    }
    let requestOptions = {
        method  : "POST",
        body    : JSON.stringify(data),
        headers : { "Content-Type": "application/json" } 
    }
    console.log("2"); 
                                /*127.0.0.1:3000/items*/ 
    const response = await fetch("/items", requestOptions); 
    console.log(response);
    console.log("3")
    
    return false; 
}

async function getToDoList(){
    let requestOptions = {
        method: "GET",
        headers : { "Content-Type": "application/json"} 
    }

    const response = await fetch("/items", requestOptions); 
    const body = await response.json(); 
    if(response.status != 200){
        throw Error(body.message); 
    }

    return body; 
}

document.getElementById('getItems').addEventListener( 'click', function(event){
    clickButton(); 
}); 

function clickButton(){
    getToDoList().then(function(body){
        let list = document.getElementById("list"); 
        let myHtml = '<ul>'; 
        for(let i = 0; i < body.length; i++){
            //do stuff to items here.
            myHtml +=  `
                    <li  class="listItems">${body[i].itemName}    ${body[i].assignee}    ${body[i].itemPriority}    ${body[i].completed}</li>
                    <button data-id=${body[i]._id} class="delete">Delete</button> 
                    <a href="/update.html?id=${body[i]._id}">Update</a>
                    `; 
        }
        myHtml += '</ul>'; 
        list.innerHTML = myHtml; 

        let deleteButtons = document.getElementsByClassName("delete"); 
        for(let i = 0; i < deleteButtons.length; i++){
            deleteButtons[i].addEventListener("click", function(event){
                deleteItem(event.target.dataset.id); 
            }); 
        }

    }).catch(function(err){
        console.log(err); 
    }); 

    //no more code
}

document.getElementById('itemsButton').addEventListener( 'click', function(event){
    getToDoList().then(function(items){
        console.log(items); 
    })
}); 

