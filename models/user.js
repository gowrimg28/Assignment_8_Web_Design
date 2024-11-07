const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    imagePath: { 
        type: String,
        required: false,
    }
})
module.exports = mongoose.model('User', userSchema)