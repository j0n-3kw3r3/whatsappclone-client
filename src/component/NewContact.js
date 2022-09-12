import React, { useRef } from 'react';
import { useContacts } from '../context/ContactsProvider';


export default function NewContact({ modal, setModal }) {
  const idRef = useRef();
  const nameRef = useRef();
  const {createContact} =useContacts()

  function handleSubmit(e) {
    e.preventDefault()
    createContact(idRef.current.value, nameRef.current.value)
    setModal(!modal)
  }
  return (
    <div className='px-[1.5rem] bg-secondary  py-[2rem] h-full rounded'>
      <div className="w-full flex justify-between   mb-[2rem]  border-b-primary text-[1.5rem] border-b  py-1 text-primary">
        <h1>Create Contact</h1>
        <h1
          className='font-semibold text-[1.3rem] text-black cursor-pointer'
          onClick={() => setModal(!modal)}>x</h1>
      </div>
      <form onSubmit={handleSubmit} >
        <label htmlFor="">Id:</label>
        <input type="text" name="" id="" className='w-[100%] block border border-[#b8b8b8] my-[.5rem] px-[1rem] h-[2rem] rounded' ref={idRef} />
        <label htmlFor="">Name:</label>
        <input type="text" name="" id="" className='w-[100%] block border border-[#b8b8b8] my-[.5rem] px-[1rem] h-[2rem] rounded' ref={nameRef} />
        <button className="text-white bg-primary px-4 py-1 rounded">Create</button>
      </form>
    </div>
  );
}
