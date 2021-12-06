import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentList } from '../../store/actions';
import { useAssignedStudentsQuery, User } from '../../generated/graphql';
import Lottie from 'react-lottie';
import loadingAnimation from '../../Assets/loadinganimation.json';
import StudentElement from './StudentElement';
import Session from '../../Types/session';
import socketIOClient from 'socket.io-client';
import CheckboxListSession from './CheckboxListSession';
import CheckboxListHistory from '../Calendar/CheckboxListHistory';
const ENDPOINT = 'http://localhost:4000';

const listStyle = 'flex flex-col justify-start items-start';

const StudentsList: React.FC<{ courseId: number }> = ({ courseId }) => {
  const studentsState = useSelector(
    (state: { currentList: User[] | null }) => state.currentList
  );

  const dispatch = useDispatch();

  const [{ fetching, data, error }, refetchAssigned] = useAssignedStudentsQuery(
    {
      variables: { courseId },
      requestPolicy: 'network-only',
    }
  );
  const students = data?.getAssignedStudents.data;
  // @ts-ignore
  if (students) dispatch(setCurrentList(students));

  const session = useSelector(
    (state: { session: Session | null }) => state.session
  );
  const history = useSelector((state: { history: boolean }) => state.history);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('ASSIGNMENT_CHANGE', () => {
      console.log('socket is called');
      refetchAssigned();
    });
  }, [refetchAssigned]);

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
        <div className="flex">
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
            <CheckboxListSession
              // @ts-ignore
              studentList={students}
              sessionId={session.id}
            />
          )}
          {history && studentsState && (
            <CheckboxListHistory studentList={studentsState} />
          )}
        </div>
      ) : (
        <p>No students registered for this class yet</p>
      )}
    </div>
  );
};

export default StudentsList;
