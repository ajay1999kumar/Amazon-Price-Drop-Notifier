
console.log("background file is running")


var jqxhr;
var jxhr;


//Receiving existing user from popup.js=============================================

chrome.runtime.onMessage.addListener(
    function(request,sender,senderResponse){
        if(request.user!=null)
        {   
            var user=JSON.stringify(request.user);
            jqxhr=$.ajax({
                type:"POST",
                url:" http://localhost:3000/user/login",
                processData:false,
                contentType: 'application/json',
                data:user,
                dataType: "json",
            }).done(function(data){
                console.log("data is successfully send from background script to server"+data);
            })
            .fail(function(xhr,statusCode,err){
                console.log("error in sending data",statusCode);
                console.log(err);
            });
            console.log(user);
            senderResponse({msg:"background script received msg successfully",user:user});
            return true;
        }
    }
    
);

//Receiving new user from popup.js=============================================

chrome.runtime.onMessage.addListener(
    function(request,sender,senderResponse){
        if(request.NewUser!=null)
        {
             var newUser=JSON.stringify(request.NewUser);
             console.log("data"+newUser);
            jxhr=$.ajax({
                type:"POST",
                url:" http://localhost:3000/user/signup",
                processData:false,
                contentType: 'application/json',
                data:newUser,
                dataType: "json",
            }).done(function(data){
                console.log("data is successfully send from background script to server"+data);
            })
            .fail(function(xhr,statusCode,err){
                console.log("error in sending data",statusCode);
                console.log(err);
            });
            console.log(newUser);
            senderResponse({msg:"background script received msg successfully",newUser:newUser});
            return true;
        }
    }
    
);