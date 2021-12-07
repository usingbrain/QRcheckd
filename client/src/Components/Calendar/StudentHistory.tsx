import React from 'react';
import { useIndividualAttendanceQuery } from '../../generated/graphql';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as CheckBoxChecked } from '../../Assets/chekcbox-checked.svg';
import { ReactComponent as CheckBoxCrossed } from '../../Assets/chekcbox-cross.svg';
import moment from 'moment';
import Student from '../../Types/student';

const btnStyle = 'flex bg-green text-white p-4 shadow-lg m-auto my-8';

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
      <div>
        <h1 className="flex justify-center text-lg md:text-xl">
          {name} {lastname}
        </h1>
        <button className={btnStyle} onClick={handleClick}>
          Back to session overview
        </button>
        <section className="flex justify-center h-1/4 md:h-1/2 lg:h-5/6 xl:h-screen p-4">
          <div className=" flex flex-row flex-wrap justify-start bg-white w-11/12 md:h-2/3 lx:w-9/12 overflow-scroll border-green border-8">
            {indivHistory.map((session) => {
              const date = new Date(Number(session!.date));
              const UTCdate = date.toUTCString();

              return (
                <div className="flex flex-col justify-center w-26 p-2 md:w-32 items-center border-2 border-black m-1 hover:bg-green-xlight">
                  {session!.attended ? (
                    <CheckBoxChecked className="w-10 h-10" />
                  ) : (
                    <CheckBoxCrossed className="w-10 h-10" />
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
