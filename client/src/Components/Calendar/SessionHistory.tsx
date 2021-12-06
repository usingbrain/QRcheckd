import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import StudentsList from '../ClassView/StudentsList';

// const listStyle = 'flex flex-col justify-start items-start';

const SessionHistory: React.FC = () => {
  const courseId = Number(useParams().courseId);

  return (
    <div>
      {/* button back to overview */}
      <Link to={`/homepage/classes/${courseId}/history`}>
        <button>Back to history overview</button>
      </Link>
      {/* student list for this session */}
      <StudentsList courseId={courseId} />
      {/* TODO: each student is clickable to get individual attendance */}
    </div>
  );
};

export default SessionHistory;
