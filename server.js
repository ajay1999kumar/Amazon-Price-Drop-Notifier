const express=require('express');
const cors=require('cors');
const bodyParser = require("body-parser");
const user = require("./databaseconnection/user"); 
const InitiateMongoServer = require("./databaseconnection/db");


InitiateMongoServer();

const app=express();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use(bodyParser.json());


app.get('/',function(req,res){
    res.send('Hello world!');
});
app.use("/user", user);

app.post('/products',function(req,res){
    console.log(req.body);
    res.send(req.body);

});

app.listen(3000,function(){
    console.log('server is started in port 3000...');
});
