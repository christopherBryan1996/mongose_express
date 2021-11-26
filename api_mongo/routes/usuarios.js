const express = require('express')
const verificartoken = require('../middlewares/auth')
const Usuario = require('../models/usuario_model')
const router = express.Router()
const bcrypt = require('bcrypt')
const Joi = require('@hapi/joi')

const schema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(10)
        .required(),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/),
    email: Joi.string()
        .email({minDomainSegments:2,tlds:{allow:['com','net']}})
})



router.get('/',verificartoken,(req,res)=>{
    let respuesta=listarUsuariosactivos()
    respuesta.then(usuario=>{
        res.json(usuario)
    }).catch(err=>{
        console.error(err)
    })
})

router.post('/',(req,res)=>{
    let body = req.body

    Usuario.findOne({email:body.email},(err,user)=>{
        if(err){
            return  res.json({error:'Server error'})
        }
        if(user){
            //usuario existe
            return res.json({
                msj:'El usuario ya existe'
            })
        }
    })

    const {error,value}= schema.validate({nombre:body.nombre,email:body.email})
    if(!error){
        let resultado= crearUsuario(body)
        resultado.then(user=>{
            res.json({
                nombre:user.nombre,
                email:user.email
            })
        }).catch( err =>{
            res.json({
                valor: err
            })
        })
    }else{
        res.json({
            error:error
        })
    }
})

router.put('/:email',verificartoken,(req,res)=>{
    const {error,value}= schema.validate({nombre:req.body.nombre})
    if(!error){
        let resultado = actualizarUsuario(req.params.email, req.body)
        resultado.then(valor=>{
            res.json({
                nombre:valor.nombre,
                email:valor.email
            })
        }).catch(err=>{
            console.error(err);
        })
    }else{
        res.json({
            error:error
        })
    }
})

router.delete('/:email',verificartoken,(req,res)=>{
    const {email} = req.params
    let resultado = desactivarUser(email)
    resultado.then(valor=>{
        res.json({
            nombre:valor.nombre,
            email:valor.email
        })
    }).catch((err)=>{
        console.error(err)
    })
})

async function crearUsuario(body){
    const{email,nombre,password} = body
    let usuario = new Usuario ({
        email: email,
        nombre: nombre,
        password: bcrypt.hashSync(password,10)
    })
    return await usuario.save()
}

 async function listarUsuariosactivos(){
     let usuario = await Usuario.find({'estado':true})
     .select({nombre:1,email:1})
     return usuario
 }

async function actualizarUsuario(email,body){
    let usuario = await Usuario.findOneAndUpdate({'email':email},{
        $set: {
            nombre: body.nombre,
            password: body.password
        }
    },{new:true})
    return usuario
}
async function desactivarUser(email){
    let usuario = await Usuario.findOneAndUpdate({'email':email}, {
        $set:{
            estado:false
        }
    },{new:true})
    return usuario
}

module.exports= router