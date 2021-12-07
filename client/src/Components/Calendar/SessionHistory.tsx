import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import StudentsList from '../ClassView/StudentsList';

// const listStyle = 'flex flex-col justify-start items-start';

const btnStyle = "flex bg-green text-white p-4 shadow-lg m-auto my-8";

const SessionHistory: React.FC = () => {
  const courseId = Number(useParams().courseId);

  return (
    <div>
      {/* button back to overview */}
      <footer className="flex justify-center my-4">
      </footer>
      {/* student list for this session */}
      <StudentsList courseId={courseId} />
      {/* TODO: each student is clickable to get individual attendance */}
      <Link to={`/homepage/classes/${courseId}/history`}>
        <button className={btnStyle}>Back to history overview</button>
      </Link>
    </div>
  );
};

export default SessionHistory;
