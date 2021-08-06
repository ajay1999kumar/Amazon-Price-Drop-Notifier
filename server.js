const express=require('express');
const cors=require('cors');
const bodyParser = require("body-parser");
const user = require("./databaseconnection/routes/user"); 
const InitiateMongoServer = require("./databaseconnection/db");


InitiateMongoServer();

const app=express();

app.use(cors());
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/',function(req,res){
    res.send('Hello world!');
});
app.use("/user", user);

app.listen(3000,function(){
    console.log('server is started in port 3000...');
});
