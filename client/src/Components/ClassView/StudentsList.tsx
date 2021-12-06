import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAssignedStudentsQuery } from '../../generated/graphql';
import Lottie from 'react-lottie';
import loadingAnimation from '../../Assets/loadinganimation.json';
import StudentElement from './StudentElement';
import CheckboxList from './CheckboxList';
import Session from '../../Types/session';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://localhost:4000';

const listStyle = 'flex flex-col justify-start items-start';

const StudentsList: React.FC<{ courseId: number }> = ({ courseId }) => {
  const [{ fetching, data, error }, refetchAssigned] = useAssignedStudentsQuery(
    {
      variables: { courseId },
      requestPolicy: 'network-only',
    }
  );
  const students = data?.getAssignedStudents.data;
  const session = useSelector(
    (state: { session: Session | null }) => state.session
  );

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('ASSIGMENT_CHANGE', () => refetchAssigned());
  }, []);

  const loadingAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {},
  };

  if (fetching)
    return (
      <Lottie options={loadingAnimationOptions} height={400} width={'100%'} />
    );

  if (error) return <h2>Oops something went wrong try again</h2>;

  return (
    <div className={listStyle}>
      {students?.length ? (
        <div className='flex'>
          <div>
            {students.map((student) => {
              return (
                <StudentElement
                  key={student!.email}
                  name={student!.name}
                  lastname={student!.lastname}
                />
              );
            })}
          </div>
          {!!session && (
            <CheckboxList
              // @ts-ignore
              studentList={students}
              sessionId={session.id}
            />
          )}
        </div>
      ) : (
        <p>No students registered for this class yet</p>
      )}
    </div>
  );
};

export default StudentsList;
