
console.log("background file is running")


var jqxhr;
var jxhr;


//Receiving existing user from popup.js=============================================
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if(msg.type=="isloggedin"){
        console.log("isloggedin running in background.js");
        console.log(getStorageItem("user"));
        sendResponse(getStorageItem("user"));
        return true;
    }
  }
);
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if(msg.type=="Scrap"){
        chrome.tabs.create({
            url: "https://www.amazon.in/gp/registry/wishlist?",
          });
         return true;
    }
  }
);

chrome.runtime.onMessage.addListener(
    function(request,sender,senderResponse){
        if(request.user!=null)
        {   
            var user=JSON.stringify(request.user);
            jqxhr=$.ajax({
                type:"POST",
                url:" http://localhost:3000/user/login",
                processData:false,
                headers: {
                    token: "",
                  },
                contentType: 'application/json',
                data:user,
                dataType: "json",
            }).done(function(res){
                console.log("response: ", res);
                setStorageItem("user", user);
                senderResponse(res);
                console.log("data is successfully send from background script to login server"+user);
            })
            .fail(function(xhr,statusCode,err){
                console.log("error in sending data",statusCode);
                console.log(err);
            });
            console.log(user);
            
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
                headers: {
                    token: "",
                },
                data:newUser,
                dataType: "json",
            }).done(function(data){
                console.log("response: ", data.token);
                setStorageItem("user", newUser);
                senderResponse(data);
                console.log("data is successfully send from background script to  signup server"+newUser);
            })
            .fail(function(xhr,statusCode,err){
                console.log("error in sending data",statusCode);
                console.log(err);
            });
            console.log(newUser);
            return true;
        }
    }
    
);




chrome.runtime.onMessage.addListener(
    function(request,sender,senderResponse){
        if(request.type=="wishlist")
        {
            
            jxhr=$.ajax({
                type:"POST",
                url:" http://localhost:3000/product/wishlist",
                processData:false,
                contentType: 'application/json',
                data:{data: request.data, email: getStorageItem("user") },
                dataType: "json",
            }).done(function(data){
                sendResponse(data);
                console.log("data is successfully send from background script to wishlist server"+data);
            })
            .fail(function(xhr,statusCode,err){
                console.log("error in sending data",statusCode);
                console.log(err);
            });
            console.log(request.data);
            return true;
        }
    }
    
);


function getStorageItem(varName) {
    return JSON.parse(localStorage.getItem(varName));
  }
  
  function setStorageItem(varName, data) {
    console.log("varName: ", varName);
    if (varName != "searchPageData") {
      console.log("data", data);
      window.localStorage.setItem(varName, JSON.stringify(data));
    }
  }
  