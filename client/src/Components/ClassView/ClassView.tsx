import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelected } from '../../store/actions';
import Course from '../../Types/course';
import StudentsList from './StudentsList';
import SessionBtn from './SessionBtn';
import { ReactComponent as CloseBtn } from '../../Assets/window-close-regular.svg';

const headerStyle =
  'bg-green text-white flex flex-row justify-between items-center content-center p-8 h-24 mb-4 text-3xl';
const viewStyle =
  'flex flex-col justify-start items-left content-center pt-4 pl-8 h-full';

const ClassView: React.FC = () => {
  const dispatch = useDispatch();
  const course = useSelector(
    (state: { selectedCourse: Course | null }) => state.selectedCourse
  );
  const courseId = course?.id;

  if (course && courseId) {
    return (
      <section className="h-screen flex flex-col justify-start w-3/4">
        <div className={headerStyle}>
          <h1 className="font-bold">{course.name?.toUpperCase()}</h1>
          <Link to="/homepage">
            <button onClick={() => dispatch(setSelected(null))}>
              <CloseBtn className="w-10 h-10" />
            </button>
          </Link>
        </div>
        <div className={viewStyle}>
          <SessionBtn courseId={courseId} />
          <StudentsList courseId={courseId} />
        </div>
      </section>
    );
  }

  return <p>no course selected</p>;
};

export default ClassView;

// the icon for the close button was downloaded from fontawesome.com under the following license: https://fontawesome.com/license
