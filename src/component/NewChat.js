import React, { useState } from 'react';
import { useChats } from '../context/ChatsProvider';
import { useContacts } from '../context/ContactsProvider';




export default function NewChat({ modal, setModal }) {
  const { contacts } = useContacts()
  const {createChat} = useChats()
  const [selectedContactIds, setSelectedContactIds] = useState([]);


  function handleSubmit(e) {

    e.preventDefault()
    createChat(selectedContactIds)
    setModal(!modal)
  }
  function handleCheckChange(contactId) {
    setSelectedContactIds(prevSelectedContactIds => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter(prevId => {
          return contactId === prevId
        })
      } else {
        return [...prevSelectedContactIds, contactId]
      }
    })
  }
  return (
    <div className='px-[1.5rem] bg-secondary  py-[2rem] h-full rounded'>
      <div className="w-full flex justify-between   mb-[2rem]  border-b-primary text-[1.5rem] border-b  py-1 text-primary">
        <h1>Create Chat</h1>
        <h1
          className='font-semibold text-[1.3rem] text-black cursor-pointer'
          onClick={() => setModal(!modal)}>x</h1>
      </div>
      <form onSubmit={handleSubmit} >
        {
          contacts.map(contact => (
            <div key={contact.id} >
              <p className=' capitalize mb-[1rem] border-b-gray p-1 border-b ' >
              <input type="checkbox" name="" id={contact.id} 
                  onChange={() => handleCheckChange(contact.id)}
                  className=' mr-[1rem]'
              />
              {contact.name || contact.id}
              </p>
            </div>
          ))
        }
         <button className="text-white bg-primary px-4 py-1 rounded">Create</button>
      </form>
    </div>
  );
}
