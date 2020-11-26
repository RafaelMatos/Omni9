const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
const path = require('path')

const socketio = require('socket.io')
const http = require('http')

const app = express()
const server = http.Server(app)
const io = socketio(server)



mongoose.connect('mongodb+srv://teste:teste@cluster0.mp4en.mongodb.net/week9?retryWrites=true&w=majority',{
    useNewUrlParser : true,
     useUnifiedTopology: true ,
})


const connectedUsers = {}

io.on('connection',socket => {
    

    const { user_id } = socket.handshake.query

    connectedUsers[user_id] = socket.id
   
    

})

app.use((req,res,next) =>{
    req.io = io
    req.connectedUsers = connectedUsers

    return next()
})
//req.query = acessar query params (para filtros)
//req.params = Acessar route params (para edição ou delete)
//req.body = Acessar corpo da requisição (para criação, edição)
app.use(cors())
app.use(express.json())
 app.use('/files',express.static(path.resolve(__dirname,'..','uploads')))
app.use(routes)
server.listen(3333)