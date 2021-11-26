const express =  require('express')
const app= express()
const cors= require('cors')
const morgan = require('morgan')
const usuarios = require('./routes/usuarios')
const cursos = require('./routes/cursos')
const mongoose = require('mongoose')
const auth =require('./routes/auth')
const {configDBhost} = require('./config/development')

mongoose.connect(configDBhost)
.then(()=>console.log('conectado a Mongo'))
.catch(err=>console.error(err))

app.use(cors({
    origin:'*'
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/usuarios',usuarios)
app.use('/api/cursos',cursos)
app.use('/api/auth',auth)

app.listen(3000,()=>{
    console.log('I listen in the port: http://localhost:3000')
})