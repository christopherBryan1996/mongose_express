const express = require('express')
const Curso = require('../models/curso_model')
const router = express.Router()
const verificartoken = require('../middlewares/auth')

router.get('/',verificartoken,(req,res)=>{


    Curso.find({'estado':true})
    .populate('autor','nombre -_id email')
    .then(curso=>{
        res.json({
            curso
        })
    })
    .catch(error=>{
        res.json({
            error
        })
    })
})

router.post('/',verificartoken,(req,res)=>{
    let respuesta = crearcurso(req)
    respuesta.then(curso=>{
        res.json({
            curso
        })
    })
    .catch(erro=>{
        res.json({
            erro
        })
    })
})

router.put('/:id',verificartoken,(req,res)=>{
    const {id}= req.params
    let resultado= actualizarCurso(id,req.body)
    resultado.then(curso=>{
        res.json({
            curso
        })
    }).catch(error=>{
        res.json({
            error
        })
    })
})
router.delete('/:id',verificartoken,(req,res)=>{
    let resultado = desactivarCurso(req.params.id)
    resultado.then(curso=>{
        res.json({
            curso
        })
    }).catch(error=>{
        res.json({
            error
        })
    })
})

async function crearcurso(req){
    const {titulo, descripcion}=req.body
    let curso= new Curso({
        titulo: titulo,
        autor:req.usuario._id,
        descripcion: descripcion
    })
    return await curso.save()
}

async function actualizarCurso(id,body){
    const {titulo,descripcion}=body
    let curso = await Curso.findByIdAndUpdate(id,{
        $set:{
            titulo:titulo,
            descripcion:descripcion
        }
    },{new:true})
    return curso
}

async function desactivarCurso(id){
    let curso = await Curso.findByIdAndUpdate(id,{
            estado:false
        },{new:true})
    return curso
}

module.exports= router