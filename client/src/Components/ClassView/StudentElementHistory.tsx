import React from 'react';
import { useDispatch } from 'react-redux';
import { setSessionId, setStudent } from '../../store/actions';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

interface Props {
  courseId: number;
  studentId: number;
  name: string;
  lastname: string;
}

const StudentElementHistory: React.FC<Props> = ({
  name,
  lastname,
  courseId,
  studentId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sessionId: number = Number(useParams().sessionId);

  function handleClick() {
    dispatch(setStudent({ name, lastname, studentId }));
    dispatch(setSessionId(sessionId));

    navigate(`/homepage/classes/${courseId}/student/${studentId}`);
  }

  return (
    <button className='flex place-items-center h-16' onClick={handleClick}>
      <h3 className='text-xl'>
        {lastname} {name}
      </h3>
    </button>
  );
};

export default StudentElementHistory;
