const express=require('express');
const app=express();
const cors=require('cors');


app.use(cors());
app.use(express.urlencoded());
app.use(express.json());


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

