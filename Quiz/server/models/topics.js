const mongoose = require('mongoose')

const topicsModel = new mongoose.Schema({
    topics:{type:String},
    quiz_questions:{type:[[String]],default:[]},
    answers:{type:[[String]],default:[]},
    learning_content:{type:[{
        subject:{type:String},
        text:{type:String}
    }],default:[]},
    attempted:{type:Boolean,default:false},
    score:{type:Number,default:0}

})

const Topics = mongoose.model('Topics', topicsModel);
module.exports = {Topics,topicsModel};