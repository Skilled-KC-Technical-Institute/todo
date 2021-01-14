const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');
document.getElementById("itemIdTitle").innerHTML = myParam;

getItemById().then(function(item){
   document.getElementById("updateItemName").value = item.itemName; 
})

async function getItemById(){
    let requestOptions = {
        method: "GET",
        headers : { "Content-Type": "application/json"} 
    }

    const response = await fetch("/items/" + myParam, requestOptions); 
    const body = await response.json(); 
    if(response.status != 200){
        throw Error(body.message); 
    }

    return body; 
}

