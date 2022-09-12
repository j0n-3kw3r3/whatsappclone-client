import React, { createContext, useContext } from 'react';
import UseLocalStorage from '../component/hooks/UseLocalStorage';


const contactsContext = createContext()


export function useContacts(params) {
  return useContext(contactsContext)
}


export function ContactsProvider({ children }) {
  const [contacts, setContacts] = UseLocalStorage('contacts', []);


  
  function createContact(id, name) {
    setContacts(prevContacts => {
      return [...prevContacts, {id, name}]
    })
  }
  return (
    <contactsContext.Provider value={{contacts, createContact}}>
      {children}
    </contactsContext.Provider>
  );
}
