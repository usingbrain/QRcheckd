import React from 'react';
import ClassList from './CourseList';

const Sidemenu: React.FC = () => {
  return (
    <div>
      <button>Add new class</button>
      <ClassList />
    </div>
  );
};

export default Sidemenu;
