require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {Server} = require('socket.io')
const app = express()
const PORT = process.env.PORT || 3000

const http = require('http')
const server = http.createServer(app)





const allowedOrigins = [
    process.env.REACT_URL,
    'http://localhost:5173',
]

console.log(allowedOrigins)

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST']
};




app.use(cors(corsOptions))

const io = new Server(server, {
    cors: corsOptions
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


server.listen(PORT, ()=>{
    console.log("Server is running")
})