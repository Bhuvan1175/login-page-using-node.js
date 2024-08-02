const mongoose=require("mongoose")

const connect=mongoose.connect("mongodb+srv://bhuvan1175:sbjain12345,@cluster0.q4sisur.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
// check connection build or not

connect.then(()=>{
    console.log("Database Connected Succesfully...");
})
.catch(()=>{
    console.log("Database cannot be connected...");
})

// create schema

const LogInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

// collection part 


const collection = new mongoose.model("users",LogInSchema)

module.exports=collection;