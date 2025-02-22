import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import PremiumNav from './PremiumNav';
import RigthBar from './RigthBar';
import useOtherUsers from '../hooks/useOtherUsers';
import store from '../redux/store';
import { useSelector } from 'react-redux';
import useGetMyBlogs from '../hooks/useGetMyBlogs';

const PremiumLayout = () => {

  const {user, otherUsers} =useSelector(store=>store.user)
  useOtherUsers(user?._id);
  useGetMyBlogs(user?._id);

  const navigate = useNavigate();
  useEffect(()=>{
    if(!user)
      {
        navigate('/')
      }
  },[])
  
  return (
    <>
   <div className='flex justify-between w-[80%] mx-auto'>
     <PremiumNav/>
        <Outlet />
      <RigthBar otherUsers={ otherUsers}/>
        
      
    </div>
    </>
  );
};

export default PremiumLayout;
