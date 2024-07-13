import express from 'express'
import { Server } from 'socket.io';
import {createServer} from 'http'

const app = express();
const server = createServer(app)

//so it is instance of circuit
const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

const port = 3000 

app.get('/',(req,res)=>{
    res.send("hello world!")
})

io.on("connection",(socket)=>{
    console.log('user connected')
    console.log("Id", socket.id)
    // messeage will send to server 
    //socket.emit(`welcome`,`welcome to the server ${socket.id}`)
    //message will send to others 
    socket.broadcast.emit(`welcome`,`welcome to the server`)

})

server.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
