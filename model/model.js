const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator')

const userSchema =  new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
});
const taskSchema =  new mongoose.Schema({
    set_id:{
        type:String,
        required:true
    },
    task_title:{
        type:String,
        
    },
    task_description:{
        type:String,
        
    },
    date_time:{
        type:String,
        
    }
},{
    timestamps:true
});

userSchema.plugin(uniqueValidator,{message:"Email already exists"});

const userData = mongoose.model("user-data",userSchema,"user-data")
const taskData = mongoose.model("task-data",taskSchema,"task-data")

module.exports = {userData,taskData}