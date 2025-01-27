const Users = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const axios = require('axios')
require('dotenv').config();
const Flowise = process.env.QUIZ_MAKER


signUp = async(req,res) => {
    try{
        const newUser = new Users(req.body)
        console.log(newUser)
        await newUser.save()
        res.status(200).json({message:'User saved sucessfully!'})
        if(!newUser){
            res.status(400).json({message:'User creation error!'})
        }

    }catch(err){
        res.status(err.status || 500).send({err:err.message})

    }
}

login = async(req,res) => {
    const {password} = req.body;
  const user = await Users.findOne({username:req.body.username})
  const isMatch = await bcrypt.compare(password,user.hashedPassword)
  try{
  if(isMatch){
    const payload = {
      username:user.username,
      userId:user._id
    }
    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1hr'})
    res.status(200).json({message:'Login success!',userId:token})
  } else {
    res.status(401).send({err:'Wrong password or username!'})
  }
}catch(err){
   console.log(err)
}
}

quizMaker = async(req,res) => {
  try{
const sub = req.body
  const {userId} = req.user;
  const user = await Users.findOne({_id:userId})  
  const question = `Please reserch this topic ${sub.topic}`

  if(user){
    const flowiseResponse = await axios.post( Flowise,
    {question},sub,{
    headers: {
      "Content-Type": "application/json",
  },
 } )
const data = JSON.parse(flowiseResponse.data.text)
data.attempted = false;
data.score = 0;
    user.subjects.push(data)
    await user.save()
    res.status(200).json({
      message:`${data.topics} added successfully!!`,
      subject:data.topics
  })
  } else {
    res.status(400).json({message:'User not found!!'})
  }
    
  }catch(err){
    console.log(err)
    if (err.response) {
      return res.status(err.response.status).json({
        message: 'Error from Flowise API',
        details: err.response.data,
      });
    }
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

userInfo = async(req,res) => {
  const {userId} = req.user
if(!userId){
  return res.status(401).json({ message: 'Unauthorized' });
}
try{
const user = await Users.findOne({_id:userId})
  res.status(200).json({data:user})
}catch(err){
  console.log(err)
}
}

deleted = async(req,res) => {
  try{
const {userId} = req.user;
const {itemId} = req.params
const user = await Users.findOne({_id:userId})
if(!user){
  res.sendStatus(401).json({message:"Authenication: User error!"})
} 
  
const deleted = await user.subjects.pull({_id:itemId})
await user.save()
res.sendStatus(200).json({message:`${deleted.topics} deleted succesfully!`})
 
  }catch(err){
console.log(err)
  }
}

updated = async(req,res) => {
  try{
    const {grade} = req.body;
    const {userId} = req.user
    const {itemId} = req.params
    const user = await Users.findOne({_id:userId})
    if(user){
const subIndex = user.subjects.findIndex((sub) => sub._id.toString() === itemId)
user.subjects[subIndex].score = grade;
await user.save()
res.sendStatus(200)
    }
  }catch(err){
    console.log(err)
  }
}



module.exports = {
  deleted,
  updated,
  userInfo,
  quizMaker,
    signUp,
    login
} 