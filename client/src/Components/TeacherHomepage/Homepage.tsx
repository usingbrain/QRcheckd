import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidemenu from '../TeacherDashboard/Sidemenu';
import Navbar from './Navbar';
import User from '../../Types/user';
import Course from '../../Types/course';
import Instruction from './Instruction';

const Homepage: React.FC = () => {
  const selectedCourse = useSelector(
    (state: { selectedCourse: Course | null }) => state.selectedCourse
  );

  return (
    <div>
      <Navbar />
      <main className='flex flex-row justify-start w-full h-screen'>
        <Sidemenu />
        {selectedCourse ? <Outlet /> : <Instruction />}
      </main>
    </div>
  );
};

export default Homepage;
