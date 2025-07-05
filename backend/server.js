const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const { Server } = require('socket.io')
const app = express()
const PORT = 3000

const http = require('http')
const server = http.createServer(app)



app.use(express.json())


app.use(cors({
    origin: process.env.REACT_URL,
    methods:["GET", "POST"],
    credentials: true
}))


const io = new Server(server, {
    cors:{
        origin: "http://localhost:5174",
        methods: ["GET", "POST"],
        credentials: true,
    }
})


io.on('connection', (socket) => {
    console.log("A user is connected", socket.id)


    socket.on("join_room", (data) => {
        socket.join(data)
    })

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('rev_msg', data)
    })


    socket.on('disconnect', () => {
        console.log("User disconnected", socket.id)
    })

})


server.listen(PORT, () => {
    console.log("Server is running")
})