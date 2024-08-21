const express = require('express')
const bodyParser = require('body-parser');
const {dbConnection} = require('./db')
const cors = require('cors');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cors());
const port = 5000;
const Employee = require('./model/employeeSchema');
app.get('/', (req, res)=>{
    res.send("Welcome node js setup")
})
app.listen(port, async()=>{
    await dbConnection();
    console.log(`Server Is Running on ${port}`)
})
// Employee Post Api
app.post("/emp", async (req, res)=>{
    try{
        const {name, email, designation, phone} = await req.body
        const result = await new Employee({
            name:name,
            email:email,
            designation:designation,

            phone:phone
        })
       await result.save();
        res.send({status:201, message:"Success"})


    }
    catch(error){
        console.log("error", error)
        res.send({status:409, message:error})
    }
})
// Employee Get Api
app.get("/empGet", async (req, res)=>{
    try{
        const result = await Employee.find()
        res.send({status:200, message:"Success", data:result})
    }
    catch(error){
        console.log("error", error)
    }
})  

// Employee Get Api By ID
app.get('/empGet/:name', async (req, res)=>{
    try{
        const {name} = await req.params;
        const result = await Employee.findOne({"name":name})
        res.send({status:200, message:"Success", data:result})
    }
    catch(error){
        console.log("error", error)
    }
})

// Employee Delete Api
app.delete("/empDelete/:name", async (req, res)=>{
    try{
        const {name} = await req.params
        const result = await Employee.deleteMany({name:name})
        res.send({status:200, message:"Success", data:result})
    }
    catch(error){
        console.log("error", error)
    }
})

//Employee Edit api
app.put('/empUpdate/:id', async (req, res)=>{
    try{
        const {id} = req.params
        const {designation, phone} = req.body
        const result = await Employee.updateMany({"_id": id}, {$set: {"designation":designation, "phone":phone}})
        res.send({status:200, message:"Success", data:result})
        // const {id} = await req.params;
        // const {name, designation, phone} = await req.body;
        // const empRecord = await Employee.findById(id)
        // empRecord.name = name
        // empRecord.designation = designation
        // empRecord.phone = phone
        // res.send({status:200, message:"Success", data:result})
    }
    catch(error){
       console.log("error", error)
       res.send({message:error})
    }
})

