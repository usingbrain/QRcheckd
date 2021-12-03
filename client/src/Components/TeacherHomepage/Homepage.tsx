import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidemenu from '../TeacherDashboard/Sidemenu';
import Navbar from './Navbar';

interface UserInterface {
  name: string;
  image: string;
}

const testUser: UserInterface = {
  name: 'Test Teacher',
  image:
    'https://www.nea.org/sites/default/files/legacy/2020/04/new_teacher.jpeg',
};

const Homepage: React.FC = () => {
  return (
    <div>
      <Navbar image={testUser.image} name={testUser.name} />
      <main className="flex flex-row justify-start">
        <Sidemenu />
        <Outlet />
      </main>
    </div>
  );
};

export default Homepage;
