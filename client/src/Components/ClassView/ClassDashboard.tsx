import React from 'react';
import StudentsList from './StudentsList';
import SessionBtn from './SessionBtn';
import RegisterBtn from './RegisterBtn';

const viewStyle = 'flex flex-row justify-around';
const listStyle = 'rounded-sm shadow-xl w-1/2';

const ClassDashboard: React.FC<{ courseId: number }> = ({ courseId }) => {
  return (
    <div className={viewStyle}>
      <section className={listStyle}>
        <StudentsList courseId={courseId} />
      </section>
      <article className='w-2/6'>
        <SessionBtn courseId={courseId} />
        <RegisterBtn courseId={courseId} />
      </article>
      {/* TODO: add DELETE COURSE BUTTON */}
    </div>
  );
};

export default ClassDashboard;
