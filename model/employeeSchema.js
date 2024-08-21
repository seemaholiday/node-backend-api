const mongoose = require("mongoose");
const empSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    designation:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
        unique:true
    }
})

const Employee = mongoose.model("Employee", empSchema)
module.exports = Employee