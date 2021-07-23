const mongoose = require('mongoose');
const url = "mongodb+srv://IITG_students:CCD_project@pricedetails.li01v.mongodb.net/userData"


const MongoServer = async () => {
    try {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex:true,
        useUnifiedTopology: true,
        useFindAndModify:false
      });
      console.log("Connected to DB !!");
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  
module.exports = MongoServer;