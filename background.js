
console.log("background file is running")

var sampleData="hwllo everyone";
    


var jqxhr=$.ajax({
    type:"POST",
    url:" http://localhost:3000/products",
    processData:false,
    data:sampleData,
})
.done(function(data){
    console.log("data is successfully send from background script to server"+data);
})
.fail(function(xhr,statusCode,err){
    console.log("error in sending data",statusCode);
    console.log(err);
});

