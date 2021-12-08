import React from 'react';
import { useDispatch } from 'react-redux';
import { setSessionId } from '../../store/actions';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import StudentsList from '../ClassView/StudentsList';

const btnStyle =
  'flex justify-center items-center bg-green text-white text-lg p-4 h-16 w-1/3 shadow-lg mb-8 mx-11 self-end';

const SessionHistory: React.FC = () => {
  const courseId = Number(useParams().courseId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  dispatch(setSessionId(null));

  function handleClick() {
    navigate(`/homepage/classes/${courseId}/history`);
  }

  return (
    <div className='flex flex-col'>
      <button className={btnStyle} onClick={handleClick}>
        Back to history overview
      </button>
      <div className='w-5/12 self-start ml-8'>
        <h2 className='font-bold text-2xl px-8 mb-4'>
          Session ADD SESSION DATE TO REDUX:
        </h2>
        <StudentsList courseId={courseId} />
      </div>
    </div>
  );
};

export default SessionHistory;
