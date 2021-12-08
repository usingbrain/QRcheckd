import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelected } from '../../store/actions';
import CourseList from './CourseList';

const sidemenuStyle =
  'bg-green flex flex-col justify-start items-center w-1/4 shadow-2xl overflow-scroll overflow-x-hidden';
const btnStyle =
  'bg-white hover:bg-green-xlight p-3 rounded-sm my-4 w-3/5 text-center';
const btnTextStyle = 'text-green font-bold text-sm';

const Sidemenu: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleClick() {
    console.log('add button');
    dispatch(setSelected(null));
    navigate('/homepage/new-course');
  }
  return (
    <nav className={sidemenuStyle}>
      <div className={btnStyle}>
        <button onClick={handleClick} className={btnTextStyle}>
          <p className='invisible sm:visible h-0 sm:h-full w-0 sm:w-full'>
            ADD NEW CLASS
          </p>
          <p className='text-5xl visible sm:invisible sm:h-0'>+</p>
        </button>
      </div>
      <CourseList />
    </nav>
  );
};

export default Sidemenu;
