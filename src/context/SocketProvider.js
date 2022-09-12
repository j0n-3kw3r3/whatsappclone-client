import React, { createContext, useContext, useState, useEffect } from 'react';
import io from 'socket.io-client'

const SocketContext = createContext();

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({ id, children }) {
    const [socket, setSocket] = useState();
    
    useEffect(() => {
        return () => {
            const ENDPOINT = 'https://whatsappcloneapp.herokuapp.com/'
            const newSocket = io( ENDPOINT,
                { query: { id } }
            )
            setSocket(newSocket)



            return () => newSocket.close()
        };
    }, [id]);


    return (
        <SocketContext.Provider
            value={socket}
        >
            {children}
        </SocketContext.Provider>
    );
}
