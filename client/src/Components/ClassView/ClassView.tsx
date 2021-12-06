import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelected, setHistory } from '../../store/actions';
import Course from '../../Types/course';
import { ReactComponent as CloseBtn } from '../../Assets/window-close-regular.svg';
import ClassDashboard from './ClassDashboard';
import Overview from '../Calendar/Overview';

const headerStyle =
  'bg-black text-white flex flex-row justify-between items-center content-center p-8 h-20 mb-4 text-3xl';

const ClassView: React.FC = () => {
  const dispatch = useDispatch();
  const course = useSelector(
    (state: { selectedCourse: Course | null }) => state.selectedCourse
  );
  const history = useSelector((state: { history: boolean }) => state.history);
  const courseId = course?.id;

  const link = history
    ? `/homepage/classes/${courseId}`
    : `/homepage/classes/${courseId}/history`;

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
        <div>
          <Link to={link}>
            <h3
              className="text-lg"
              onClick={() => dispatch(setHistory(history))}
            >
              {history ? 'back to dashboard' : 'attendance history'}
            </h3>
          </Link>
          {history ? <Outlet /> : <ClassDashboard courseId={courseId} />}
        </div>
      </section>
    );
  }

  return <p>no course selected</p>;
};

export default ClassView;

// the icon for the close button was downloaded from fontawesome.com under the following license: https://fontawesome.com/license
