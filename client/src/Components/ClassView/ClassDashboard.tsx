import React from 'react';
import StudentsList from './StudentsList';
import SessionBtn from './SessionBtn';
import RegisterBtn from './RegisterBtn';

const viewStyle =
  'flex flex-col justify-start items-left content-center pt-4 w-1/2 pl-4 h-full';

const ClassDashboard: React.FC<{ courseId: number }> = ({ courseId }) => {
  return (
    <div className={viewStyle}>
      <RegisterBtn courseId={courseId} />
      <SessionBtn courseId={courseId} />
      <StudentsList courseId={courseId} />
      {/* TODO: add DELETE COURSE BUTTON */}
    </div>
  );
};

export default ClassDashboard;
