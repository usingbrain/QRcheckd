import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setForm } from '../../store/actions';
import CourseList from './CourseList';

const sidemenuStyle =
  'bg-white flex flex-col justify-start items-center w-1/4 pt-4 h-screen';
const btnStyle = 'bg-grey hover:bg-black p-3 rounded mb-4 w-3/5 text-center';
const btnTextStyle = 'text-white font-bold text-sm';

const Sidemenu: React.FC = () => {
  const open = useSelector((state: { form: boolean }) => state.form);
  const dispatch = useDispatch();

  return (
    <nav className={sidemenuStyle}>
      <div className={btnStyle}>
        <Link to="/homepage/new-course">
          <button
            onClick={() => dispatch(setForm(open))}
            className={btnTextStyle}
          >
            ADD NEW CLASS
          </button>
        </Link>
      </div>
      <CourseList />
    </nav>
  );
};

export default Sidemenu;

// bg-opacity-15
