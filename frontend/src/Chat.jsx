import React, { useEffect, useState } from 'react'

const Chat = ({socket, room, username}) => {


  const [message, setMessage] = useState('') //to handle input value
  const [msgList, setMsgList] = useState([]) //this is array of message list of both sides 

  const sendMessage = async (e)=>{
    e.preventDefault()

    if(message !== ""){
      //sending message room and sender name through msgdata object
      const msgData ={
        room: room,
        sender: username,
        text:message,
      }
        // sending msgData to backend
      await socket.emit('send_message', msgData)
      setMsgList((prev)=> [...prev, msgData])

    }
  }

// used to fetch data from backend server
useEffect(()=>{
  socket.on('rev_msg', (data)=>{
    setMsgList((prev)=> [...prev, data])
  })

  return () =>{
    socket.off('rev_msg')
  }
})

  return (
    <div className='flex justify-center items-center h-screen'>

      <div className=' border-white/10 max-w-sm w-full h-[600px] rounded-lg  relative  ' >

        <div className='h-full overflow-y-auto '>

          <h2 className='text-2xl mb-2 font-bold text-center h-10 border-b border-b-white/10'>Welcome to Chat-App</h2>


          {msgList.map((msg, index)=> {
            return (
              
             <div key={index} className={`chat ${username === msg.sender ? "chat-end": "chat-start"}`}>
            <div className="chat-header">
             {msg.sender}
            </div>
            <div className="chat-bubble">{msg.text}</div>
          </div>)
          })}

         
        
        </div>




        <div className='absolute bottom-0 w-full left-0 p-3'>
          <form
          onSubmit={sendMessage}
          className='flex gap-2'>
            <input
            value={message}
            onChange={(e)=> setMessage(e.target.value)}
            type="text" placeholder="Type here" className="input input-lg" />
            <button type='submit' className='btn btn-primary btn-lg'>Send</button>
          </form>
        </div>

      </div>



    </div>
  )
}

export default Chat