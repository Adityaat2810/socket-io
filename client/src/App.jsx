import React, { useEffect, useMemo, useState } from 'react'
import {io} from 'socket.io-client'
import { Container ,Typography,TextField,Button} from '@mui/material'

const App = () => {
  const socket =useMemo(()=> io('http://localhost:3000'),[])
  
  const [message,setMessage]=useState('')
  const handelSubmit=(e)=>{
    e.preventDefault();
    socket.emit('message',message)
    setMessage('')

  }

  useEffect(()=>{
    socket.on("connect",()=>{
      console.log('connected',socket.id)
    })

    socket.on(`receive-message`,(s)=>console.log(s))


    socket.on(`welcome`,(s)=>console.log(s))

    return ()=>{
      socket.disconnect();
    }
  },[])


  return (
    <Container maxWidth='sm'>
      <Typography variant='h3' component="div" gutterBottom>
        Welcome to socket.io
      </Typography>

      <form onSubmit={handelSubmit}>
        <TextField 
          value={message} 
          id="outlined-basic" 
          label='Outlined' 
          variant='outlined'
          onChange={e=>setMessage(e.target.value)}
        />
        <Button type="submit" variant='contained' color='primary' > Send</Button>
      </form>
    </Container>
  )
}

export default App