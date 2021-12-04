import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setForm } from '../../store/actions';
import CourseList from './CourseList';
import { ReactComponent as QRLogo } from '../../Assets/thePerfectestLogo2.svg';

const sidemenuStyle =
  'bg-green flex flex-col justify-start items-center w-full h-screen';
const btnStyle = 'bg-white hover:bg-green-light p-3 rounded-sm my-4 w-3/5 text-center';
const btnTextStyle = 'text-green font-bold text-sm';
const logoStyle = " flex w-full h-20 bg-white justify-center shadow-b-lg"

const Sidemenu: React.FC = () => {
  const open = useSelector((state: { form: boolean }) => state.form);
  const dispatch = useDispatch();

  return (
    <nav className={sidemenuStyle}>
      <Link to='/' className={logoStyle}>
        <QRLogo className="w-2/3 lg:w-1/2 flex" />
      </Link>
      <div className={btnStyle}>
        <Link to="/homepage/new-course">
          <button
            onClick={() => dispatch(setForm(open))}
            className={btnTextStyle}
          >
            <p className="invisible sm:visible h-0 sm:h-full w-0 sm:w-full">ADD NEW CLASS</p>
            <p className="text-5xl visible sm:invisible h-full sm:h-0">+</p>
          </button>
        </Link>
      </div>
      <CourseList />
    </nav>
  );
};

export default Sidemenu;

// bg-opacity-15
