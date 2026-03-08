if(process.env.NODE_ENV!="poduction"){
    require("dotenv").config()
}

const mongoose = require("mongoose")


async function connectToDb(){
    // console.log("connect")
    try{

        await mongoose.connect(process.env.DB_URL)
        console.log("connected to db")
    }
    catch(err){
        console.log(err)
    }


}
module.exports = connectToDb