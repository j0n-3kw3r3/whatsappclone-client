import React, { useState, useCallback } from 'react';
import { useChats } from '../context/ChatsProvider';

export default function OpenChats() {
    const [text, setText] = useState();
    const { sendMessage, selectedChat } = useChats()
    const setRef = useCallback(
        node => {
            if (node) {
                
                node.scrollIntoView({ smooth: true})
            }
        }
    ,[])



    function handleSubmit(e) {
        e.preventDefault()
        sendMessage(
            selectedChat.recipients.map(r => r.id),
            text
        )
        setText('')
    }
    return (
        <div className='flex flex-col flex-1 max-w-[65%] md:max-w-[80%] pt-[3.5rem]'>
            <div className=' flex-1 overflow-auto'>
                <div className=" flex flex-col items-start justify-end px-3 capitalize ">
                    {selectedChat.messages.map((message, index) => {
                        const lastMessage = selectedChat.messages.length - 1 === index
                        return (
                            <div
                                ref={lastMessage ? setRef : null}
                                key={index}
                                className={message.fromMe ? 'my-1 flex flex-col self-end max-w-[65%] ' : 'max-w-[65%] '}
                            >
                               
                          
                                <p
                                    className={message.fromMe ? 'rounded-2xl break-all rounded-tr-none px-3 py-2 bg-other1 text-white ' : '  rounded-2xl break-all  rounded-tl-none px-3 py-2 text-white bg-primary '}
                                    >{message.text}</p>
      
                                   
                                <div
                                    className={message.fromMe ? 'px-2 py-1 b text-sm text-primary text-right ' : 'text-sm text-primary'}
                                >{message.fromMe ? 'You' : message.senderName}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <form className='m-2  flex items-center'
                onSubmit={handleSubmit}
            >
                <textarea name="" id=""
                    value={text}
                    placeholder='Message'
                    onChange={e => setText(e.target.value)}
                    className=' h-[3.5rem] w-full border-primary border  bg-other3 rounded-full resize-none text-white pl-[2rem]  py-[.8rem] '
                ></textarea>
                <button className='px-3 bg-primary text-white rounded-full w-[3rem] h-[3rem] text-[1.5rem]'> -⋗</button>
            </form>
        </div>
    );
}
