
console.log("background file is running")

var sampleData="hwllo everyone";
    


//Receiving existing user from popup.js=============================================

chrome.runtime.onMessage.addListener(
    function(request,sender,senderResponse){
        if(request.user!=null)
        {
            console.log(request.user);
            senderResponse({msg:"background script received msg successfully"});
            return true;
        }
    }
    
);

//Receiving new user from popup.js=============================================

chrome.runtime.onMessage.addListener(
    function(request,sender,senderResponse){
        if(request.NewUser!=null)
        {
            console.log(request.NewUser);
            senderResponse({msg:"background script received msg successfully"});
            return true;
        }
    }
    
);

// sending data(post request) from background to server =============================================

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

