const mongoose = require('mongoose');

const dbConnection = async ()=>{
    const uri = "mongodb+srv://email:seemaR%40123@cluster0.eh3vwuk.mongodb.net";
    try{
       const {connect} = await mongoose.connect(uri, {
        "dbName":"empData"
       })
       console.log("DB connection Successfully", connect)
    }
    catch(error){
        console.log("error", error)
    }
}
module.exports = {dbConnection}