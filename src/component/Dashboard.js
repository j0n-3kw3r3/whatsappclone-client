import React from 'react';
import { useChats } from '../context/ChatsProvider';
import Header from './Header';
import OpenChats from './OpenChats';
import Sidebar from './Sidebar';

export default function Dashboard({ id }) {
  const {selectedChat} = useChats()
  return (
    <>
      <Sidebar id={id} />
      <Header/>
      {
        selectedChat &&
        <OpenChats />
      }
    </>
  );
}
