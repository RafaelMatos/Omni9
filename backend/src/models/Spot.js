const mongoose = require('mongoose')
// const UserSchema = require('./User')
const SpotSchema = new mongoose.Schema({
    thumbnail : String,
    company : String,
    price : Number,
    techs : [String],
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }

},{
    toJSON : {
        virtuals : true,
    }
})

SpotSchema.virtual('thumbnail_url').get(function(){
    return `http://localhost:3333/files/${this.thumbnail}`
}) //cria um campo dentro do js, não no banco

module.exports = mongoose.model('Spot',SpotSchema)