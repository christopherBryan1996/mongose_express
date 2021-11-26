const express = require('express')
const {SEED,expiration} = require('../config/development')
const jwt =require('jsonwebtoken')
const Usuario = require('../models/usuario_model')
const router = express.Router()
const bcrypt = require('bcrypt')

router.post('/',(req,res)=>{
    const{email,password}=req.body
    Usuario.findOne({email: email})
    .then(datos=>{
        if(datos){
            const passswordvalido = bcrypt.compareSync(password,datos.password)
            if(!passswordvalido){
                return res.status(400).json({
                    error:'ok',
                    msj:'Usuario o contraseña incorrecta'
                })
            }
            const jwtoken = jwt.sign({
                usuario:{_id:datos._id, nombre:datos.nombre, email: datos.email}
            }, SEED,{expiresIn:expiration})
            //jwt.sign({_id:datos._id, nombre:datos.nombre, email: datos.email},'password')
            res.json({
                usuario:{
                    _id:datos._id, nombre:datos.nombre, email: datos.email
                },
                jwtoken
            })
        }else{
            res.status(400).json({
                error:'ok',
                msj:'Usuario o contraseña incorrecta'
            })
        }
    })
    .catch(err=>{
        res.json({
            error:'ok',
            msj:'Error en el servicio'+ err
        })
    })
})

module.exports = router