import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidemenu from '../TeacherDashboard/Sidemenu';
import Navbar from './Navbar';
import User from '../../Types/user';

const Homepage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main className='flex flex-row justify-start w-full'>
        <Sidemenu />
        <Outlet />
      </main>
    </div>
  );
};

export default Homepage;
