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

function clickButton(){
    getToDoList().then(function(body){
        for(let i = 0; i < body.length; i++){
            console.log(body[i].itemName); 
        }
        let myObjs = JSON.stringify(body); 
        document.body.append(myObjs); 
        console.log(body); 
    }).catch(function(err){
        console.log(err); 
    }); 
}