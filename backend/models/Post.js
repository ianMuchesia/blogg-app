const mongoose = require('mongoose')


const Schema = mongoose.Schema

const PostSchema = new Schema ({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    title:{
        type:String,
        required:[true,'You must include a title']
        },
    content:{
        type:String,
        required:['You cannot submit an empty blog'],
        maxlength: 20000,
    },
    image:{
        type:String,
    },
    tags:[{
        type:mongoose.Schema.ObjectId,
        ref:"Tag"
    }],

    category: {
        type: String,
        enum: ['Software Development', 'Others', 'Data Analysis', 'Cyber Security', 'Networking'],
        required: true,
      },
      summary:{
        type:String,
        required:[true,'You must include a summary']
        },

}, {timestamps:true})

const Post = mongoose.model('Post', PostSchema)


module.exports = Post