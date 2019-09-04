const express = require('express');
const bodyParser = require('body-parser')
var database = require("./db.json");

const app = express();
const {calculator} = require('./calculator');
const fs = require('fs')

app.use(bodyParser.json());


// -----------------------------------------------------------------------------------------------------------------------
// 1 calculator/num1/num2/operator route(GET) that works with these operators: +, -, *, /, %(percentage)
app.get('/calculator', function(req, res){   
    res.send("<h3 style='color:red'>Welcome to Calculator!</h3><br/> <p>calculator/5/2/topla</p><br/><p>calculator/5/2/cikart</p><br/><p>calculator/5/2/bol</p><br/><p>calculator/5/2/carp</p><br/><p>calculator/5/2/yuzde</p><br/>");
      
})
app.get('/calculator/:num1/:num2/:operator', function(req, res){
 
    let {num1,num2,operator}=req.params;
    res.send({data: calculator(num1,num2,operator)});  

})

// -----------------------------------------------------------------------------------------------------------------------
// 2 /todo route that makes possible to add new todo with POST, get all todos with GET, delete a todo with DELETE method.
app.get('/transfers', function(req, res){   
    let transfers = ''
    for(i of database){
        transfers += `<p>${i}</p><hr/>`
    }
    res.send(`<h3 style='color:red'>Welcome to Calculator!</h3><br/> ${transfers}`);
      
})

app.post('/transfers', (req, res)=>{    
    database.push(req.body.newTransfer);
    fs.writeFileSync('./db.json', JSON.stringify(database));
    console.log(req.body)
    res.send(database)
})

app.delete('/transfers/:name',(req,res)=>{
   
    database = database.filter(val => val != req.params.name);
    fs.writeFileSync('./db.json', JSON.stringify(database));  
    res.send(database)
})

// -----------------------------------------------------------------------------------------------------------------------
// 3 /future/hours route(GET) that adds given hours to the current datetime and returns result.
app.get('/now', function(req, res){   
   	
    var date = new Date();
    var time = date.getHours() + " : " + date.getMinutes();
    res.send(`<h3 style='color:red'>Time is:</h3><br/> <span style='color:blue'>${time}</span>`);

      
})
app.get('/future/:hours', function(req, res){   
    
    var hours = req.params.hours;
    var future = new Date();    
    future.setHours( future.getHours() + hours ); 
    var futureHour = future.getHours() + " : " + future.getMinutes();
   
    res.send(`<h4 >After <span style='color:blue;font-size:20px'>${hours}</span> hour time will be: <br/> <span style='color:blue'>${futureHour}</span></h4><br/>`);
      
})

// -----------------------------------------------------------------------------------------------------------------------
// 4 /login route((POST) that checks if the given username and password is correct or not and will respond with appropriate status code.
// The correct credentials; username: admin, password:password.
var login = {
    admin: "zeyd",   
    password: "12345"
  };
  app.get('/login', function(req, res){
    res.send(`<h3 style='color:red'>Welcome to Login page</span>`);
})
app.post('/login/:name/:pass', (req, res)=>{    
    let {name, pass} = req.params;
    
    if(login.admin === name && login.password === pass){
        
        res.send(`Welcome to panel ${name}`)
    }
    else{
        res.send(`username or password incorrect. Please try again!`)
    }
    
})

// -----------------------------------------------------------------------------------------------------------------------
// 5 /report route(POST) that gets the example data below and creates a json 
// file based on that report in the reports folder. The json file will have the name of customer.


app.post('/report', (req, res)=>{  

    // json data
    var jsonData = `{"Report":[{"Customer":"${req.body.customer}","Budget":"${req.body.budget}","Submit Date":"${req.body.submitDate}"}]}`
    // 'Customer: '+req.body.customer+'Budget: '+req.body.budget+'Submit Date: '+req.body.submitDate;
    
    // parse json
    var jsonObj = JSON.parse(jsonData);   
    
    // stringify JSON Object
    var jsonContent = JSON.stringify(jsonObj);
   
    
    fs.writeFile("xCompany.json", jsonContent, 'utf8', function (err) {
        if (err) {            
            res.send("An error occured while writing JSON Object to File.")
            return console.log(err);
        }
    
        res.send('xCompany.json created!')
});

})




app.listen(5003, function(){
    console.log('Server started on port 5003');
})

