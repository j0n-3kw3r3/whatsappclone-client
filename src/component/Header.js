import React from 'react';
import { useChats } from '../context/ChatsProvider';


export default function Header() {
  const { chats,  } = useChats()
  console.log(chats)
  
  function handleDelete() {
    
    localStorage.clear()
    document.location.reload()
  }
  return (
    <div className=' w-full fixed top-0 bg-other2 h-[3rem] items-center flex justify-between px-[3%] text-white' >
      <h1 className=' font-bold ml-[4rem] uppercase  mt-[.2rem]'>
        Better chat
      </h1>

      {
        chats.map((chat, index) => (
                    chat.selected ?
                    <div
                        className='text-white p-2 capitalize rounded ' 
                          key={index}
                      >
                          {chat.recipients.map((r) => (r.name)).join(', ')}
                        
                    </div>: ''
                ))
            }
      <button className='border px-3 py-1 text-xs'  onClick={handleDelete}>Delete Account</button>
    </div>
  );
}
