import React from 'react';
import { useDispatch } from 'react-redux';
import { setSessionId } from '../../store/actions';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import StudentsList from '../ClassView/StudentsList';

const btnStyle = 'flex bg-green text-white p-4 shadow-lg m-auto my-8';

const SessionHistory: React.FC = () => {
  const courseId = Number(useParams().courseId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  dispatch(setSessionId(null));

  function handleClick() {
    navigate(`/homepage/classes/${courseId}/history`);
  }

  return (
    <div>
      <footer className="flex justify-center my-4"></footer>
      <StudentsList courseId={courseId} />
      <button className={btnStyle} onClick={handleClick}>
        Back to history overview
      </button>
    </div>
  );
};

export default SessionHistory;
