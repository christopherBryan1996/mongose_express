const mongoose = require('mongoose')
const Schema = mongoose.Schema
const cursoShema = new mongoose.Schema({
    titulo:{
        type: String,
        required: true
    },
    autor:{
        type:Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    descripcion:{
        type:String,
        required:false
    },
    estado:{
        type:Boolean,
        default:true
    },
    image:{
        type:String,
        required:false
    },
    alumnos:{
        type: Number,
        default:0
    },
    califica:{
        type:Number,
        default:0
    }
}) 

module.exports = mongoose.model('Curso', cursoShema)