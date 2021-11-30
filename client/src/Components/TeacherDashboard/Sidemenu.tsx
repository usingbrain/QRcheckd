import React from 'react';
import CourseList from './CourseList';

const sidemenuStyle = 'flex flex-col justify-start items-start';

const Sidemenu: React.FC = () => {
  return (
    <nav className={sidemenuStyle}>
      <button>Add new class</button>
      <CourseList />
    </nav>
  );
};

export default Sidemenu;
