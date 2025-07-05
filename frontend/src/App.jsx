import React, { useState } from 'react'
import Chat from './Chat'
import { io } from 'socket.io-client'



const socket = io(import.meta.env.BACKEND_URL,{
    withCredentials: true
})


const App = () => {

    const [username, setUsername] = useState('')
    const [room, setRoom] = useState('')
    const [showChatBox, setShowChatBox] = useState(false)




  const joinRoom = (e)=>{
    e.preventDefault()

    if(username.trim() && room.trim()){
      socket.emit("join_room", room)
      setShowChatBox(true)
    }

   
  }

    return (
        <div>

            {!showChatBox ?
                <div className='flex justify-center items-center h-screen'>

                    <form
                        onSubmit={joinRoom}
                        className='max-w-sm w-full p-3'>
                        <div className='mb-5'>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text" placeholder="Enter Username" className="input w-full input-lg" />
                        </div>

                        <div className='mb-5'>
                            <input
                                value={room}
                                onChange={(e) => setRoom(e.target.value)}
                                type="number" placeholder="Enter Room ID" className="input w-full input-lg" />
                        </div>

                        <button type='submit' className='btn btn-primary w-full btn-lg'>Start Chat</button>
                    </form>

                </div>
                :
                <Chat socket={socket} username={username} room={room}/>
            }

        </div>
    )
}

export default App