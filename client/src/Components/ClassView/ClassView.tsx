import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelected, setHistory } from '../../store/actions';
import Course from '../../Types/course';
import { ReactComponent as CloseBtn } from '../../Assets/window-close-regular.svg';
import ClassDashboard from './ClassDashboard';
import Overview from '../Calendar/Overview';
import User from '../../Types/user';

const headerStyle =
  'bg-black text-white flex flex-row justify-between items-center content-center p-8 h-20 mb-4 text-3xl';
const attendanceStyle =
  'flex justify-center bg-black py-4 rounded-sm text-lg w-1/3 text-white mb-4 h-16';
const listHeader = 'w-1/2 bg-green p-2 text-white text-lg rounded-t-sm h-16';

const ClassView: React.FC = () => {
  const dispatch = useDispatch();
  const course = useSelector(
    (state: { selectedCourse: Course | null }) => state.selectedCourse
  );
  const history = useSelector((state: { history: boolean }) => state.history);
  const students = useSelector(
    (state: { currentList: User[] }) => state.currentList
  );

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
        <article className="flex flex-col px-10">
          <div className="flex flex-row justify-around w-full">
            <div className={listHeader}>
              <p>
                Students{' '}
                {history && `assigned to this course: ${students.length}`}
              </p>
            </div>
            <Link to={link} className={attendanceStyle}>
              <h3
                className="text-lg invisible md:visible w-0 md:w-full flex justify-center h-0 md:h-full"
                onClick={() => dispatch(setHistory(history))}
              >
                {history ? 'Back to dashboard' : 'Attendance history'}
              </h3>
              <h3 className="visible md:invisible md:w-0 md:h-0">History</h3>
            </Link>
          </div>
          {history ? <Outlet /> : <ClassDashboard courseId={courseId} />}
        </article>
      </section>
    );
  }

  return <p>no course selected</p>;
};

export default ClassView;

// the icon for the close button was downloaded from fontawesome.com under the following license: https://fontawesome.com/license
