const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
const path = require('path')


const app = express()

mongoose.connect('mongodb+srv://teste:teste@cluster0.mp4en.mongodb.net/week9?retryWrites=true&w=majority',{
    useNewUrlParser : true,
     useUnifiedTopology: true ,
})
//req.query = acessar query params (para filtros)
//req.params = Acessar route params (para edição ou delete)
//req.body = Acessar corpo da requisição (para criação, edição)
app.use(cors())
app.use(express.json())
 app.use('/files',express.static(path.resolve(__dirname,'..','uploads')))
app.use(routes)
app.listen(3333)