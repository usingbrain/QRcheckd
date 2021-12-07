import React from 'react';
import { useIndividualAttendanceQuery } from '../../generated/graphql';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as CheckIcon } from '../../Assets/solo-check.svg';
import { ReactComponent as CrossIcon } from '../../Assets/solo-cross.svg';
import moment from 'moment';
import Student from '../../Types/student';

const btnStyle =
  'flex justify-center items-center bg-green text-white text-lg p-4 h-16 w-1/3 shadow-lg mb-8 mx-11 self-end';

const StudentHistory: React.FC = () => {
  const navigate = useNavigate();
  const courseId = Number(useParams().courseId);
  const studentId = Number(useParams().studentId);
  const studentState = useSelector(
    (state: { student: Student | null }) => state.student
  );
  const sessionId = useSelector(
    (state: { sessionId: number | null }) => state.sessionId
  );
  let name;
  let lastname;

  if (studentState) {
    name = studentState.name;
    lastname = studentState.lastname;
  }

  const [{ fetching, data, error }] = useIndividualAttendanceQuery({
    variables: { courseId, studentId },
  });

  if (fetching) {
  } // TODO handle fetching
  if (error) {
  } // TODO handle error

  function handleClick() {
    console.log('click back from studenthistory', { sessionId });
    navigate(`/homepage/classes/${courseId}/${sessionId}`);
  }

  const indivHistory = data?.getIndividualAttendance?.data; // returns {attended, date}

  if (indivHistory) {
    return (
      <div className='flex flex-col'>
        <button className={btnStyle} onClick={handleClick}>
          Back to session overview
        </button>
        <h1 className='font-bold text-5xl px-16 mb-4'>
          {name} {lastname}
        </h1>
        <section className='flex justify-center h-1/4 md:h-1/2 lg:h-5/6 xl:h-screen p-4'>
          <div className=' flex flex-row flex-wrap justify-start bg-white w-11/12 md:h-2/3 lx:w-9/12 border-grey border-2'>
            {indivHistory.map((session) => {
              const date = new Date(Number(session!.date));
              const UTCdate = date.toUTCString();

              return (
                <div className='flex flex-col justify-center w-26 h-26 p-2 md:w-32 items-center border-2 border-white'>
                  {session!.attended ? (
                    <CheckIcon className='w-10 h-10' />
                  ) : (
                    <CrossIcon className='w-10 h-10' />
                  )}
                  <p>{moment(UTCdate).format('L')}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }
  return <p>This student has no history of attendance</p>;
};

export default StudentHistory;
