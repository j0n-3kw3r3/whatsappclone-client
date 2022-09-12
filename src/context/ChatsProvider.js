import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import UseLocalStorage from '../component/hooks/UseLocalStorage';
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider';


const ChatsContext = createContext()

export function useChats(params) {
    return useContext(ChatsContext)
}


export function ChatsProvider({ id, children }) {
    const [chats, setChats] = UseLocalStorage('chats', []);
    const { contacts } = useContacts()
    const socket = useSocket()
    const [selectedChatIndex, setSelectedChatIndex] = useState(0);

    function createChat(recipients) {

        setChats(prevChats => {
            return [...prevChats, { recipients, messages: [] }]
        })

    }

    const addMessageToChat = useCallback(

        ({ recipients, text, sender }) => {
            setChats(prevChats => {
                let madeChange = false
                const newMessage = { sender, text }
                const newChats = prevChats.map(chat => {
                    if (arrayEquality(chat.recipients, recipients)) {
                        madeChange = true
                        return {
                            ...chat,
                            messages: [...chat.messages, newMessage]
                        }
                    }
                    return chat
                })
                if (madeChange) {
                    return newChats
                } else {
                    return [...prevChats, { recipients, messages: [newMessage] }]
                }
            })
        },
        [setChats]
    );


    useEffect(() => {

        if (socket == null) return

        socket.on('receive-message',
            addMessageToChat)
          return () => socket.off('receive-message')


    }, [socket, addMessageToChat]);



    function sendMessage(recipients, text) {
        socket.emit('send-message', { recipients, text })
        addMessageToChat({ recipients, text, sender: id })
    }

    const formattedChats = chats.map(
        (chat, index) => {

            const recipients = chat.recipients.map(recipient => {
                const contact = contacts.find(contact => {
                    return contact.id === recipient
                })
                const name = (contact && contact.name) || recipient
                return { id: recipient, name }
            })
            const messages = chat.messages.map(message => {
                const contact = contacts.find(contact => {
                    return contact.id === message.sender
                })
                const name = (contact && contact.name) || message.sender
                const fromMe = id === message.sender
                return {
                    ...message, senderName: name, fromMe
                }

            })

            const selected = index === selectedChatIndex
            return { ...chat, recipients, messages, selected }


        })



    const value = {
        createChat,
        chats: formattedChats,
        selectedChatIndex: setSelectedChatIndex,
        selectedChat: formattedChats[selectedChatIndex],
        sendMessage
    }
    return (
        <ChatsContext.Provider value={value}>
            {children}
        </ChatsContext.Provider>
    );
}



function arrayEquality(a, b) {
    if (a.length !== b.length) {
        return false
    }
    a.sort()
    b.sort()
    return a.every((element, index) => {
        return element === b[index]
    })
}