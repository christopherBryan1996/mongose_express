const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/demo')
.then(()=> console.log('conectado a MongoDB..'))
.catch((e)=>console.error('No se pudo conectar a MongoDB..',e))

//schema
const cursoSchema =  new mongoose.Schema({
    nombre: String,
    autor: String,
    etiquetas: Array,
    fecha:{
        type:Date,
        default: Date.now,
    },
    publicado: Boolean
})

const Curso= mongoose.model('Curso', cursoSchema);

async function crearCurso(){
    const curso = new Curso({
        nombre: 'Angular para principiantes',
        autor: 'Ximena',
        etiquetas: ['desarollo web', 'Back end'],
        publicado: true
    })
    
    const respuesta= await curso.save()
    console.log(respuesta)
}

//crearCurso()
//mostrar todos 
// async function listaCursos(){
//     const cursos = await Curso.find()
//     console.log(cursos)
// }
//mostrar uno especifico
// async function listaCursos(){
//     const cursos = await Curso.find({autor:'Ximena'})
//     console.log(cursos)
// }
//mas detalles 
// async function listaCursos(){
//     const cursos = await Curso.find({publicado:true})
//     .limit(10)//solo nos trae 10 registros
//     .sort({autor:-1})//nos ordena asendente
//     .select({_id:0,nombre:1,etiquetas:1})//solo muestra las columnas con 1
//     console.log(cursos)
// }

// eq (equal, igual)
// ne (not equal, no igual)
// async function listaCursos(){
//     const cursos = await Curso.find({
//         //precio:{$get:10, $let:30} // rango de 10 a 30
//         //precio:{$in:[10,15,25]},// para poner precios especificos
//         //autor:/^Xime/, //para el inicio de la pabra
//         //autor:/ena$/, //para el final
//         autor:/a/
//     })
//     console.log(cursos)
// }
//paginacion 
async function listaCursos(){
    const numeroPage = 2
    const sizePage=10

    const cursos = await Curso.find()
    .skip((numeroPage -1)* sizePage)
    .limit(sizePage)
}

//listaCursos()
//actualizar 
// async function actualizarCurso(id){
//     const curso = await Curso.findById(id)
//     if (!curso) {
//         console.log('el curso no existe');
//         return
//     }
//     //curso.publicado=false

//     curso.set({
//         publicado:true
//     })
//     const resultado = await curso.save()
//     console.log(resultado)
// }

// async function actualizarCurso(id){
//     const resultado = await Curso.update({
//         $set:{
//             publicado:false
//         }
//     })
//     console.log(resultado)
// }

async function actualizarCurso(id){
    const resultado =  await Curso.findByIdAndUpdate(id,{
        $set:{
            publicado:true
        }
    },{new:true})//para que nos regrese el valor actualizado
    console.log(resultado)
}
//actualizarCurso('61666d0e10972f722902367c')

async function eliminarDocumento(id){
    const result = await Curso.deleteOne({_id:id})
    //para madar lo que borraste 
    //const resultado = await Curso.findByIdAndDelete(id);
    console.log(result)
}
eliminarDocumento('61666c7ff762339f905df046')

