import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentList } from '../../store/actions';
import { useAssignedStudentsQuery, User } from '../../generated/graphql';
import StudentElement from './StudentElement';
import Session from '../../Types/session';
import socketIOClient from 'socket.io-client';
import CheckboxListSession from './CheckboxListSession';
import CheckboxListHistory from '../Calendar/CheckboxListHistory';
import StudentElementHistory from './StudentElementHistory';
const ENDPOINT = 'http://localhost:4000';

const listStyle = 'flex flex-col justify-start items-start px-8 shadow-bottom';

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
    socket.on('ASSIGNMENT_CHANGE', () => refetchAssigned());
  }, []);

  if (fetching) {
  }

  if (error) return <h2>Oops something went wrong try again</h2>;

  return (
    <div className={listStyle}>
      {students?.length ? (
        <div className='flex flex-row w-full justify-between'>
          <div className='flex flex-col'>
            {students.map((student) => {
              return (
                <div>
                  {!history ? (
                    <StudentElement
                      key={student!.email}
                      name={student!.name}
                      lastname={student!.lastname}
                    />
                  ) : (
                    <StudentElementHistory
                      key={student!.email}
                      name={student!.name}
                      lastname={student!.lastname}
                      studentId={student!.id}
                      courseId={courseId}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div>
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
        </div>
      ) : (
        <p>No students registered for this class yet</p>
      )}
    </div>
  );
};

export default StudentsList;
