import React, { useEffect } from 'react';
import { useAssignedStudentsQuery } from '../../generated/graphql';
import Lottie from 'react-lottie';
import loadingAnimation from '../../Assets/loadinganimation.json';
import StudentElement from './StudentElement';
import StudentCheckbox from './StudentCheckbox';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://localhost:4000';

const listStyle = 'flex flex-col justify-start items-start';

const StudentsList: React.FC<{ courseId: number }> = ({ courseId }) => {
  const [{ fetching, data, error }] = useAssignedStudentsQuery({
    variables: { courseId: 1 },
  });

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('ATTENDANCE_CHANGE', () => console.log('I RAN!!!'));
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

  if (error) return <h2>Ooops something went wrong try again</h2>;

  return (
    <div className={listStyle}>
      {data?.getAssignedStudents?.data?.length ? (
        data?.getAssignedStudents.data.map((student) => {
          return (
            <div key={student!.email}>
              <StudentElement
                name={student!.name}
                lastname={student!.lastname}
              />
              <StudentCheckbox
                name={student!.name}
                lastname={student!.lastname}
                email={student!.email}
                isChecked={attendanceList.includes(student!.email)}
              />
            </div>
          );
        })
      ) : (
        <p>No students registered for this class yet</p>
      )}
    </div>
  );
};

export default StudentsList;
