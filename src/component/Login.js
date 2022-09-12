import React, { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid'


export default function Login({ onIdSubmit }) {
    const refId = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        onIdSubmit(refId.current.value)
    }
    function createNewId(params) {
        onIdSubmit(uuidv4())
    }

    return (
        <div className=' h-[100vh] w-[100%] flex items-center px-[10%] '>
            <form className=' w-[100%]' onSubmit={handleSubmit} >
                <label htmlFor="UserId " className='font-semibold'>Enter your Id</label>
                <input type="text" className=' w-[100%] my-[1rem] h-[2rem] border border-primary ' ref={refId} required />
                <input type='submit' className='   bg-primary text-white px-4 py-1 rounded mr-[1rem]' value='Login' />
                <button className='border border-primary text-primary   px-4 py-1 rounded' onClick={createNewId}>Create Id</button>
            </form>
        </div>
    );
}

