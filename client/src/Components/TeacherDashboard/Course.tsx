// @ts-nocheck

import React from 'react';
import { useDispatch } from 'react-redux';
import { setHistory, setSelected } from '../../store/actions';
import CourseType from '../../Types/course';

const Course: React.FC<{ course: CourseType }> = ({ course }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    // setHistory returns opposite of what you give it!
    dispatch(setHistory(true));
    dispatch(setSelected(course));
  };

  return (
    <div className="w-full flex items-center flex-col" onClick={handleClick}>
      <p className='flex justify-center pb-4'>{course.name}</p>
      <hr className='border-t-2 border-white w-1/4' />
    </div>
  );
};

export default Course;
