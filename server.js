const express=require('express');
const cors=require('cors');
const bodyParser = require("body-parser");
const user = require("./api/routes/user"); 
const product = require("./api/routes/product"); 
const InitiateMongoServer = require("./api/db");



InitiateMongoServer();

const app=express();

app.use(express.static('public'));
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3000;


app.get('/',function(req,res){
    res.send('Hello world!');
});

app.use("/user", user);
app.use("/product", product);

app.listen(port,function(){
    console.log('server is started in port 3000...');
});