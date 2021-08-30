
console.log("content script ran successfully");
var url = window.location.href;
console.log("url is: ", url);

if (
  url.includes("amazon.in/gp/registry/wishlist?") ||
  url.includes("https://www.amazon.in/hz/wishlist/genericItemsPage")
) {
    console.log("urlfunction is running")
        let wishlist = [];
        var products = document.querySelectorAll(".g-item-sortable");
        for (var i = 0; i < products.length; i++) {
        var item = {};
        var id = products[i].getAttribute("data-itemid");
        item["id"] = id;
        try {
            item["title"] = products[i].querySelector("#itemName_" + id).title;
        } catch (err) {
            item["title"] = "";
        }

        try {
        item["link"] = products[i].querySelector("#itemName_" + id).href;
        } catch (err) {
        item["link"] = "";
        }

        try {
        item["image"] = products[i].querySelector("#itemImage_" + id + " img").src;
        } catch (err) {
        item["image"] = "";
        }
        
        try {
            
        // item["price"] = products[i].querySelector('.itemUsedAndNewPrice').innerText;
        item["price"] = products[i].getAttribute("data-price");
        } catch (err) {
        item["price"] = "";
        }

        try {
        item["asin"] = JSON.parse(
            products[i].getAttribute("data-reposition-action-params")
            ).itemExternalId.match(/ASIN:(.+?)\|/)[1];
        } catch (err) {
        item["asin"] = "";
        }
        wishlist.push(item);
        }
        
    chrome.runtime.sendMessage({ type:"wishlist", data:wishlist},function(response){
        console.log("got response from server after saving products");
        //console.log("res"+response);
        var check =JSON.stringify([]);
        //console.log("check"+check);
        var pdcts=JSON.parse(response);
        //console.log("pdcts: "+pdcts);
        if(response!=check){
            alert("There's price drop in few products, check your mail to get more info about produscts");
            chrome.runtime.sendMessage({type:"price_dropped",price_dropped_items:pdcts},function(response){
                console.log(response);
            })
        }
        else{
            alert("There's no price drop in products present in your wishlist");
        }
        
    })
    }


    
