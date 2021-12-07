import React from 'react';
import StudentsList from './StudentsList';
import SessionBtn from './SessionBtn';
import RegisterBtn from './RegisterBtn';
import DeleteBtn from './DeleteBtn';

const viewStyle = 'flex flex-row justify-around';
const listStyle = 'rounded-sm shadow-sm w-1/2';

const ClassDashboard: React.FC<{ courseId: number }> = ({ courseId }) => {
  return (
    <div className={viewStyle}>
      <section className={listStyle}>
        <StudentsList courseId={courseId} />
      </section>
      <article className="w-2/6">
        <SessionBtn courseId={courseId} />
        <RegisterBtn courseId={courseId} />
        <DeleteBtn courseId={courseId} />
      </article>
    </div>
  );
};

export default ClassDashboard;
