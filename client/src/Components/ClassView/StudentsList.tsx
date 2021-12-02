import React from 'react';
import { useSelector } from 'react-redux';
import { useAssignedStudentsQuery } from '../../generated/graphql';
import Lottie from 'react-lottie';
import loadingAnimation from '../../Assets/loadinganimation.json';
import StudentElement from './StudentElement';
import CheckboxList from './CheckboxList';
import Session from '../../Types/session';

const listStyle = 'flex flex-col justify-start items-start';

const StudentsList: React.FC<{ courseId: number }> = ({ courseId }) => {
  const [{ fetching, data, error }] = useAssignedStudentsQuery({
    variables: { courseId },
  });
  const session = useSelector(
    (state: { session: Session | null }) => state.session
  );

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
        <div className='flex'>
          <div>
            {data?.getAssignedStudents.data.map((student) => {
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
              studentList={data.getAssignedStudents.data}
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
