import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidemenu from '../TeacherDashboard/Sidemenu';
import Navbar from './Navbar';
import User from '../../Types/user';
import Course from '../../Types/course';
import Instruction from './Instruction';

const Homepage: React.FC = () => {
  const user = useSelector((state: { user: User }) => state.user);
  const selectedCourse = useSelector(
    (state: { selectedCourse: Course | null }) => state.selectedCourse
  );
  return (
    <div>
      <Navbar user={user} />
      <main className="flex flex-row justify-start w-full">
        <Sidemenu />
        {selectedCourse ? <Outlet /> : <Instruction />}
      </main>
    </div>
  );
};

export default Homepage;
