
console.log("background file is running")

var sampleData;
var jqxhr;


//Receiving existing user from popup.js=============================================

chrome.runtime.onMessage.addListener(
    function(request,sender,senderResponse){
        if(request.user!=null)
        {   
            sampleData=request.user;
            jqxhr=$.ajax({
                type:"POST",
                url:" http://localhost:3000/user/login",
                processData:false,
                data:sampleData,
            })
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
            sampleData=request.NewUser;
            jqxhr=$.ajax({
                type:"POST",
                url:" http://localhost:3000/user/signup",
                processData:false,
                data:sampleData,
            })
            console.log(sampleData);
            senderResponse({msg:"background script received msg successfully"});
            return true;
        }
    }
    
);

// sending data(post request) from background to server =============================================

jqxhr.done(function(data){
    console.log("data is successfully send from background script to server"+data);
})
.fail(function(xhr,statusCode,err){
    console.log("error in sending data",statusCode);
    console.log(err);
});

