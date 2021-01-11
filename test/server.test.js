const chai = require('chai'); 
const chaiHttp = require('chai-http'); 
const server = require('../server.js');

chai.use(chaiHttp); 
chai.should(); 

describe('Test GET all items API call', function(){
    it("It should GET all items.", function(done){
        chai.request(server).get("/items").end(function(err,response){
            response.should.have.status(200); 
            response.body.should.be.a('array'); 
        });
        done();
    });
}); 

describe('Test POST items', function(){
    it("It should POST a new item", function(done){
        const testItem = {
            itemName     : "Shoplifting",
            itemPriority : "High",
            assignee     : "Crminal",
            completed    : false
        };
        chai.request(server).post("/items").send(testItem).end(function(err, response){
            response.should.have.status(200); 
        });
        done(); 
    });
});
