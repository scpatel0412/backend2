const bcrypt = require("bcrypt");
const {userData,taskData} = require("../model/model")
const {check,validationResult} = require("express-validator")

const SignUpValid = [check('email').not().isEmpty().isEmail().matches( /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ ).withMessage('Email format is wrong format should be anything@anyemail.com'),
                      check('password').not().isEmpty().isLength({min:5}).withMessage('Should be greater than 5 character').matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).withMessage("Minimum eight characters, at least one letter, one number and one special character")]
const SignUpRouter = (req,res,next) => {
     const errors = validationResult(req);
     if(!errors.isEmpty()){
        return res.status(422).json(errors.array())
     }
     else{
         bcrypt.hash(req.body.password,10).then((hash) => {
            const user1 = new userData({
              
              email: req.body.email,
              password: hash,
            });
            user1
              .save()
              .then((response) => {
                res.status(201).json({
                  message: 'User successfully created!',
                  result: response,
                });
                
              })
              .catch((error) => {
                res.status(500).json({
                  message:"Some problem occured",
                  error: error,
                });
              });
          })
     }
}

const LoginRouter = (req,res,next) => {
    let getUser;
    userData.findOne({
        email:req.body.email
    })
    .then((user1) => {
        if(!user1){
            return res.status(401).json({
                message:"Authentication failed no such user exists"
            })
        }
        getUser = user1;
        return bcrypt.compare(req.body.password, user1.password)
    })
    .then((response) => {
        if(!response) {
            return res.status(402).json({
                message:"Authentication failed password didnt match"
            })
        }
        res.status(200).json({
            message:"User authenticated",
            result:getUser
        })
    })
    .catch((err) => {
        res.status(401).json({
            message:"Authentication Failed",
            error:err
        })
    })
}

const AllUser = async(req,res) => {
    try{
        const a = await userData.find();
        res.status(200).json(a)  
    }
    catch(error){
        res.status(403).json({
            message:"Unable to get data please check"
        })
    }
}
const SingleUser = async(req,res) => {
    try{
        const a = await userData.findById(req.params.id);
        res.status(200).json(a)  
    }
    catch(error){
        res.status(403).json({
            message:"Unable to get data please check"
        })
    }
}
const taskDataValid = [check('task_title').not().isEmpty().withMessage("Please enter title"),
                       check('task_description').not().isEmpty().withMessage("Please enter description").isLength({min:30}).withMessage('Description must greater than 30 characters'),
                       check('date_time').not().isEmpty().withMessage('Please enter date and time')]

const taskDataPost= async(req,res) => {
    // const errors = validationResult(req);
    //  if(!errors.isEmpty()){
    //     return res.status(422).json(errors.array())
    //  }
    //  else{
         const taskdata1 = new taskData({
             set_id:req.body.set_id,
             task_title:req.body.task_title,
             task_description:req.body.task_description,
             date_time:req.body.date_time
         })
         if(taskdata1){
             const a = await taskdata1.save();
             res.status(201).json({
                 message:"Task Added Successfully",
                 result:a
             })
         }
         else{
            res.status(500).json({
                message:"Task not added",
                result:a
            })
         }
     }
// }
const taskDataUpdate = async(req,res) => {
    // const errors = validationResult(req);
    // if(!errors.isEmpty()){
    //    return res.status(422).json(errors.array())
    // }
    // else{
        if(taskData){
            // res.status(200).json(star)
            let taskData2 = await taskData.findOneAndUpdate({_id:req.params.id},{
                $set:{
                    set_id:req.body.set_id,
                    task_title:req.body.task_title,
                    task_description:req.body.task_description,
                    date_time:req.body.date_time
                }
            },{new:true})
            res.status(201).json({
                message:"Task Updated",
                result:taskData2
            })
            
        }else{
            res.status(200).json({
                message:"Task not updated"
            })
        }
    } 
// }
const taskDataDelete = async(req,res) => {    
    if(taskData){
        // res.status(200).json(star)
        let taskData1 = await taskData.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({
            message:"Task Removed",
            response:taskData1
        })
        
    }else{
        res.status(500).json({
            message:"Task not removed please check"
        })
    }
  }
const AllTaskData = async(req,res) => {
    try{
        const a = await taskData.find();
        res.status(200).json(a)  
    }
    catch(error){
        res.status(403).json({
            message:"Unable to get data please check"
        })
    }
}
const SingleTaskData = async(req,res) => {
    try{
        const a = await taskData.findById(req.params.id);
        res.status(200).json(a)  
    }
    catch(error){
        res.status(403).json({
            message:"Unable to get data please check"
        })
    }
}

module.exports = {SignUpValid,SignUpRouter,LoginRouter,AllUser,SingleUser,taskDataValid,taskDataPost,taskDataUpdate,taskDataDelete,AllTaskData,SingleTaskData}