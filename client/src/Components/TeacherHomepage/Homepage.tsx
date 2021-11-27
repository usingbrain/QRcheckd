import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CourseContext, SetCourseContext } from '../../CourseContext';
import Sidemenu from '../TeacherDashboard/Sidemenu';
import Navbar from './Navbar';
import Instruction from './Instruction';

interface UserInterface {
  name: string;
  image: string;
}

// DON'T TOUCH MY FRONTEND BTOSZ!!!

const testUser: UserInterface = {
  name: 'Test Teacher',
  image:
    'https://www.nea.org/sites/default/files/legacy/2020/04/new_teacher.jpeg',
};

const Homepage: React.FC = () => {
  const [courseId, setCourseId] = useState('');
  return (
    <div>
      <CourseContext.Provider value={courseId}>
        <SetCourseContext.Provider value={setCourseId}>
          <BrowserRouter>
            <Navbar image={testUser.image} name={testUser.name} />
            <Sidemenu />
            <Routes>
              <Route path="/" element={<Instruction />}></Route>
              <Route path={`/classes/${courseId}`}></Route>
            </Routes>
          </BrowserRouter>
        </SetCourseContext.Provider>
      </CourseContext.Provider>
    </div>
  );
};

export default Homepage;

// DON'T TOUCH MY FRONTEND BTOSZ!!!
