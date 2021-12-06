import React from 'react';
import StudentsList from './StudentsList';
import SessionBtn from './SessionBtn';
import RegisterBtn from './RegisterBtn';

const viewStyle =
  'flex flex-row justify-between items-left content-center pt-4 w-full px-8 h-full';
const listStyle = "rounded-sm shadow-xl w-1/2";
const listHeader = "bg-green p-2 text-white text-bold text-lg rounded-t-sm";

const ClassDashboard: React.FC<{ courseId: number }> = ({ courseId }) => {
  return (
    <div className={viewStyle}>
      <section className={listStyle}>
        <div className={listHeader}>Students</div>
        <StudentsList courseId={courseId} />
      </section>
      <article>
        <SessionBtn courseId={courseId} />
        <RegisterBtn courseId={courseId} />
      </article>
      {/* TODO: add DELETE COURSE BUTTON */}
    </div>
  );
};

export default ClassDashboard;
