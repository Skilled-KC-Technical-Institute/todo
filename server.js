const mongoose = require('mongoose');
var List = require('./models/ToDo.js'); 
var Item = require('./models/ToDoItem.js'); 
//Load in the express module
const express = require('express');  
const path = require('path');
const API_VERSION = "v1"
//creates a new express application 
const app = express(); 
//declare the port we want to connect to 
const port = 3000; 

const mongoDB = 'mongodb+srv://lea_admin_willie:Dndmongodb_forlea44!@lea0-hs7rh.mongodb.net/to_do_list_db?retryWrites=true&w=majority'; 
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if(err) return console.error(err);
    console.log('Connected to database'); 
}); 
const db = mongoose.connection;
//open a connection to the database 
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

//use just says, use the following middleware: 
app.use(
    //express.static: is middleware for delivering static files
    //like html, css, javascript, images, etc. 
    express.static(
        //basically this just takes care of relative paths 
        path.join(__dirname, 'public')
        )
    );

//middleware to handle request processing 
app.use(express.json());
app.use(express.urlencoded({ extended:false })); 

//opening up our server to listen on a specific ip address and port 
//ip addresses are also known as hostnames 
var server = app.listen(port, function(){
    console.log("The server is running at port " + port); 
});

/* our api calls/AKA our REST API */ 

//127.0.0.1:3000/items 
app.get('/items', function(request, response){
    /*get data*/ 
    Item.find(function(err, items){
            if (err) return console.error(err);
            response.statusCode = 200; 
            response.send(items); 
    })    
}); 
        
app.get('/items/:itemID', function(request, response){
    //do what we want on the server side
    Item.findById(request.params.itemID, function(err, item){
        if(err){ console.log(err); response.sendStatus(500); }
        response.send(item); 
    }); 
}); 

app.put('/items/:itemID', function(request, response){

}); 

app.post('/items', function(request, response){

    console.log(response); 
    let newData = new Item(request.body); 
    newData.save(function(error,item){
        if(error) {
            console.log(error); 
            response.sendStatus(500);     
        }
        console.log("Success, item added!"); 
        response.sendStatus(200); 
    }); 

}); 

app.delete('/items', function(request, response){

    /*delete data*/ 
    Item.deleteOne(request.body, function (err) {
        if (err){ console.log(err); return; }
        response.sendStatus(204); 
      });  
}); 

/*for testing purposes */ 
module.exports = server; 