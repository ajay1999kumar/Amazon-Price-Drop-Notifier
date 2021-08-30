console.log("background file is running")


var jqxhr;
var jxhr;


/////////////////////////////////////////===============================Receiving messages from popup.js and sending some common info ==============///////////////////////////////
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if(msg.type=="isloggedin"){
        console.log("isloggedin running in background.js");
        console.log(getStorageItem("user"));
        sendResponse(getStorageItem("user"));
        return true;
    }

    if(msg.type=="logout_user"){
        console.log("logout running in background.js");
        window.localStorage.clear();
        sendResponse(getStorageItem("user"));
        return true;
    } 
    
    if(msg.type=="Scrap"){
        console.log("Scrap running in background.js");
        chrome.tabs.create({
            url: "https://www.amazon.in/gp/registry/wishlist?",
          });
          sendResponse("tab created");
         return true;
    }
}
);

///////////////////////////////////////////////////////////============Receiving existing user from popup.js======================//////////////////////////////////////////////////////
chrome.runtime.onMessage.addListener(
    function(request,sender,senderResponse){
        if(request.user!=null)
        {   
            var user=JSON.stringify(request.user);
            console.log("user"+ user);
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
            //console.log(user);
            
            return true;
        }
    }
    
);

////////////////////////////////////////////////////////////============Receiving Newuser from popup.js======================//////////////////////////////////////////////////////
chrome.runtime.onMessage.addListener(
    function(request,sender,senderResponse){
        if(request.NewUser!=null)
        {
             var newUser=JSON.stringify(request.NewUser);
             console.log("newuser"+ newUser);
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
                senderResponse(data);
                console.log("data is successfully send from background script to  signup server"+newUser);
            })
            .fail(function(xhr,statusCode,err){
                console.log("error in sending data",statusCode);
                console.log(err);
            });
            //console.log(newUser);
            return true;
        }
    }
    
);


/////////////////////////////////////////////////////========Receiving item list from content.js and sending to "/product/wishlist" server========////////////////////////////////////
chrome.runtime.onMessage.addListener(
    function(request,sender,senderResponse){
        if(request.type=="wishlist")
        {
            var wishlist;
            var user;
            var product={
                wishlist:request.data,
                user:JSON.parse(getStorageItem("user"))
                
            }
            var product=JSON.stringify(product);
            console.log("scraped Product" + product);
            jxhr=$.ajax({
                type:"POST",
                url:" http://localhost:3000/product/wishlist",
                processData:false,
                contentType: 'application/json',
                data:product,
                dataType: "json",
            }).done(function(data){
                var updatedItems=JSON.stringify(data);
                senderResponse(updatedItems);
                console.log("updatedItems" + updatedItems);
                console.log("data is successfully send from background script to wishlist server");
                 
            })
            .fail(function(xhr,statusCode,err){
                console.log("error in sending datas",statusCode);
                console.log(err);
                
            });
          
            return true;
        }
    }
    
);

////////////////////////////////////////=========receiving droped product list from content.js and sending to "/product/message" server======////////////////////////////////////
chrome.runtime.onMessage.addListener(
    function(request,sender,senderResponse){
        if(request.type=="price_dropped")
        {
         var droppedItems={
            items:request.price_dropped_items,
            user:JSON.parse(getStorageItem("user"))
            
        }
         var droppedItems=JSON.stringify(droppedItems);
         console.log("sending priced_droped_item to /product/message is ruuning in background server");
            jxhr=$.ajax({
                type:"POST",
                url:" http://localhost:3000/product/message",
                processData:false,
                contentType: 'application/json',
                data:droppedItems,
                dataType: "json",
            }).done(function(data){
                senderResponse("message sent");
                console.log("message is sent successfully");
            })
            .fail(function(xhr,statusCode,err){
                console.log("error in sending message",statusCode);
                console.log(err);
            });
            
            return true;
        }
    }
    
);

/////////////////////////////////////////////////////////////////=================storage functions==================///////////////////////////////////////////////////////////////////////////
 
  function getStorageItem(varName) {
    return JSON.parse(localStorage.getItem(varName));
  }
  
  function setStorageItem(varName, data) {
    console.log("varName: ", varName);
    if (varName != "searchPageData") {
      console.log("data"+ data);
      window.localStorage.setItem(varName, JSON.stringify(data));
    }
  }
  
