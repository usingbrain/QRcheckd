import React from 'react';
import CourseList from './CourseList';

const sidemenuStyle =
  'bg-green bg-opacity-30 flex flex-col justify-start items-center w-1/4 pt-4 h-screen';
const btnStyle = 'bg-black p-4 rounded text-white font-bold mb-4 w-3/5 text-sm';

const Sidemenu: React.FC = () => {
  return (
    <nav className={sidemenuStyle}>
      <button className={btnStyle}>ADD NEW CLASS</button>
      <CourseList />
    </nav>
  );
};

export default Sidemenu;

// bg-opacity-15
