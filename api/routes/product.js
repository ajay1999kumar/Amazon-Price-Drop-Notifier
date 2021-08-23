const express = require("express");
const router = express.Router();
const product = require("../model/product");

const saveProducts = async (req, res, next) => {
 

    const{
        wishlist,
        user
    }=req.body;

   const email=user.email;

   
    var resultArray = [];
    

/////////////////////////////////////////////////////////update presentstatus of item in db////////////////////////////////////
    try {
        product.updateMany(
           { email: email},
           { $set: {ispresent: false } }
        );
     } catch (e) {
        console.log(e.message);
        res.status(500).send("Error in process");
     }

///////////////////////////////////////////////////////////Add new item of user wishlist or update item price of user wishlist/////////
    for (let i = 0; i < wishlist.length; i++) {
      let item = wishlist[i];

      try{
        let product_exist= await product.findOne(
            { product_id: item.id, email: email}
        );
        if(product_exist){
            let oldCost = parseFloat(product_exist.currentPrice);
            let newCost = parseFloat(item.price);
            if(oldCost<newCost){
                await product.updateOne(
                    { product_id: item.id},
                    { email: user_email},
                    { $set: {currentPrice: newCost}},
                    { $set: {ispresent: true} }
                );
                resultArray.push(item);
    
            }
            else{
                await product.updateOne(
                    { product_id: item.id},
                    { email: user_email},
                    { $set: {ispresent: true} }
                );
            }
            continue;
        }
        let product_id=item.id;
        let product_asin=item.asin;
        let image=item.image;
        let product_link=item.link;
        let title=item.title;
        let currentPrice=item.price;
        let actualPrice=item.price;
        let newProduct = new product({product_id,product_asin,image,product_link,title,currentPrice,actualPrice,email});
        await newProduct.save();
        } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
        }
    }

   //////////////////////////////////////////////////////////////delete all item of particular user if it is nt currently present in his/her wishlist//////
    try {
        product.deleteMany( {ispresent: false, email: email});
     } catch (e) {
        console.log(e.message);
        res.status(500).send("Error in process while deleting");
    }

    /////////////////////////////////////////////sending back  items if there price has dropped//////////////////////////////////////// 

    try{
        await res.send(resultArray);
      }catch(e){
        console.log(e);
      }

      await next();
}
  router.post("/wishlist", saveProducts);
 
  module.exports = router;