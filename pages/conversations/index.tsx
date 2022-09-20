import React from 'react'
import { useSelector } from 'react-redux';
import Sidebar from '../../components/SideBar';
import { selectAuthState } from '../../redux/authSlice';

const Conversation = () => {
  const authState = useSelector(selectAuthState);
  console.log(authState)
  return (
    <>
      <Sidebar />
    </>
  )
}

export default Conversation