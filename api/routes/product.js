const express = require("express");
const router = express.Router();
const product = require("../model/product");
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

// post request to save whishlist in server
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
                    { email: email},
                    [
                    { $set: {currentPrice: newCost}},
                    { $set: {ispresent: true} }
                    ]
                );
                resultArray.push(item);
    
            }
            else{
                await product.updateOne(
                    { product_id: item.id},
                    { email: email},
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


  // post request to send message of price drop items

  const sendMessages=async(req,res,next)=>{

    const {
        items,
        user
          }=req.body;

    
    
    mail(user.email,items);
   
  }

  function mail(email,items)
  {
    console.log('hello there!!!');
    console.log(email);
    console.log(items);

    let products=[];

    for(let i=0;i<items.length;i++)
    {
        let item=items[i];

        var pdct={
            title:item.title,
            price:item.price,
            link:item.link

        }

        products.push(pdct);

    }

    products=JSON.stringify(products);


    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: 'ajayjnvbanda@gmail.com',
          pass: 'password'
        }
      }));
      
      var mailOptions = {
        from: 'ajayjnvbanda@gmail.com',
        to: email,
        subject: 'Amazon-Price-Tracker',
        text: `The price of these products have been dropped ${products} .`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  }
  router.post("/message",sendMessages);
 
  module.exports = router;