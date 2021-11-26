const mongoose = require('mongoose')
const usuarioShema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique:true
    },
    nombre:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    estado:{
        type:Boolean,
        default:true
    },
    image:{
        type:String,
        required:false
    }
}) 

module.exports = mongoose.model('Usuario', usuarioShema)