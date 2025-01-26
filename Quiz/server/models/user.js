const mongoose =require('mongoose')
const {topicsModel} = require('./topics.js')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email:{type:String,select:false},
    username:{type:String,unique:true},
    subjects:[topicsModel],
    password:{type:String,select:false},
    hashedPassword:{type:String}
})

userSchema.pre('save', async function(next){
    if(this.isModified('username') || this.isNew){
        const exsistingUser = await mongoose.model('Users').findOne({username:this.username})
        if(exsistingUser){
            const error = new Error('User name is already taken!!')
            error.status = 400
            return next(error)
        }
    }
    next()
})

userSchema.pre('save', async function(next){
if(this.isModified('password')){
    this.hashedPassword = await bcrypt.hash(this.password,10);
    this.password = undefined;
}
})

const Users = mongoose.model('Users',userSchema);
module.exports = Users;