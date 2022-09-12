import React from 'react';
import { useChats } from '../context/ChatsProvider';

export default function Chats() {
    const { chats, selectedChatIndex } = useChats()
  
    return (
        <div className=" py-[1rem] mt-[6rem]  ">
            {
                  chats.map((chat, index) => (
                    <div
                        className={chat.selected ?'bg-other1  text-white p-2 px-[1rem] capitalize rounded ': 'p-2 px-[1rem]  border-b-gray capitalize border-b' }
                          key={index}
                          onClick={() => {
                          selectedChatIndex(index)
                          }}

                      >
                          {chat.recipients.map((r) => (r.name)).join(', ')}
                        
                    </div>
                ))
            }
        </div>
    );
}
