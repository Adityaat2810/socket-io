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

    socket.on("message",(data)=>{
        console.log(data)
        //send message to evry one
        io.emit("receive-message",data)
    })

    socket.on("disconnect",()=>{
        console.log(`user disconnected `,socket.id)
    })
   

})

server.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
