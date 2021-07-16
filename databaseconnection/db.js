const mongoose = require('mongoose');
const url = "mongodb+srv://price_db:priceDetails@pricedetails.li01v.mongodb.net/price_db?retryWrites=true&w=majority const"


const MongoServer = async () => {
    try {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("Connected to DB !!");
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  
module.exports = MongoServer;