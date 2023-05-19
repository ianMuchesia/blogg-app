const mongoose = require('mongoose')


const Schema = mongoose.Schema

const TagSchema = new Schema ({

})

const Tag = mongoose.model('Tag', TagSchema)


module.exports = Tag