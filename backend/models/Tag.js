const mongoose = require('mongoose')


const Schema = mongoose.Schema

const TagSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
      },
      category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: true,
      },
})

const Tag = mongoose.model('Tag', TagSchema)


module.exports = Tag