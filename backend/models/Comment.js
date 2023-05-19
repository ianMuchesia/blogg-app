const mongoose = require('mongoose')


const Schema = mongoose.Schema

const CommentSchema = new Schema ({
    post:{
        type:mongoose.Schema.ObjectId,
        ref:'Post',
    },
    name:{
        type:String,
        required:true,
       
    },
    content:{
        type:String,
        required:true,
        maxlength: 1000,
    }

}, {timestamps:true})

const Comment = mongoose.model('Comment', CommentSchema)


module.exports = Comment