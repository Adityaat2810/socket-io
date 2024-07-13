import express from 'express'
import { Server } from 'socket.io';
import {createServer} from 'http'

const app = express();
const server = createServer(app)

//so it is instance of circuit
const io= new Server(server)

const port = 3000 

app.get('/',(req,res)=>{
    res.send("hello world!")
})

io.on("connection",(socket)=>{
    console.log('user connected')
    console.log("Id", socket.id)
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
