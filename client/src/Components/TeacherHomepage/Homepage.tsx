import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CourseContext, SetCourseContext } from '../../CourseContext';
import Sidemenu from '../TeacherDashboard/Sidemenu';
import Navbar from './Navbar';
import Instruction from './Instruction';
import ClassView from '../ClassView/ClassView';

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
  const [selectedCourse, setSelectedCourse] = useState({ name: '', id: '' });

  return (
    <div>
      <CourseContext.Provider value={selectedCourse}>
        <SetCourseContext.Provider value={setSelectedCourse}>
          <BrowserRouter>
            <Navbar image={testUser.image} name={testUser.name} />
            <main className="flex flex-row justify-start">
              <Sidemenu />
              <Routes>
                <Route path="/" element={<Instruction />}></Route>
                <Route
                  path={`/classes/${selectedCourse.id}`}
                  element={
                    <ClassView
                      name={selectedCourse.name}
                      id={selectedCourse.id}
                    />
                  }
                ></Route>
              </Routes>
            </main>
          </BrowserRouter>
        </SetCourseContext.Provider>
      </CourseContext.Provider>
    </div>
  );
};

export default Homepage;

// DON'T TOUCH MY FRONTEND BTOSZ!!!
