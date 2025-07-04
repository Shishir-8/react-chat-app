const express = require('express')
const cors = require('cors')
const {Server} = require('socket.io')
const app = express()

const http = require('http')
const server = http.createServer(app)

app.use(cors())

const io = new Server(server, {
    cors:{
        origin:"http://localhost:5173",
        methods: ["GET", "POST"]
    }
})


io.on('connection', (socket)=>{
    console.log("A user is connected", socket.id)


    socket.on("join_room", (data)=>{
        socket.join(data)
    })

    socket.on('send_message', (data)=>{
        socket.to(data.room).emit('rev_msg', data)
    })


    socket.on('disconnect', ()=>{
        console.log("User disconnected", socket.id)
    })

})


server.listen(3000, ()=>{
    console.log("Server is running")
})