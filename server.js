const express=require('express');
const mongoose = require('mongoose');
const cors=require('cors');

const url = "mongodb+srv://price_db:priceDetails@pricedetails.li01v.mongodb.net/price_db?retryWrites=true&w=majority const"
const app=express();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

///////////////////////////////////////////////////////----------server setup-----------------------/////////////////////////////
app.get('/',function(req,res){
    res.send('Hello world!');
});

app.post('/products',function(req,res){
    console.log(req.body);
    res.send(req.body);

});

app.listen(3000,function(){
    console.log('server is started in port 3000...');
});
//////////////////////////////////////////////////////-----------Database Connection------------///////////////////////////////////////////

mongoose.connect(url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true
    })
    .then(() => {
      console.log('Connected to database !!');
    })
    .catch((err)=>{
      console.log('Connection failed !!'+ err.message);
    });
    