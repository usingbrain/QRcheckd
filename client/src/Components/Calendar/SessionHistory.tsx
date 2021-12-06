import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useSessionAttendanceQuery } from '../../generated/graphql';

const SessionHistory: React.FC = () => {
  const courseId = Number(useParams().courseId);
  const sessionId = Number(useParams().sessionId);

  const [{ fetching, data, error }] = useSessionAttendanceQuery({
    variables: { sessionId },
  });

  if (fetching) {
  } // TODO handle fetching
  if (error) {
  } // TODO handle error

  const studentsAttended = data?.getSessionAttendance?.data;

  return (
    <div>
      {/* button back to overview */}
      <Link to={`/homepage/classes/${courseId}/history`}>
        <button>Back to history overview</button>
      </Link>
      {/* student list for this session */}
      {/* each student is clickable to get individual attendance */}
    </div>
  );
};

export default SessionHistory;
