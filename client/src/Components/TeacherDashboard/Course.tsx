import React from 'react';
import { useDispatch } from 'react-redux';
import { setHistory, setSelected } from '../../store/actions';
import CourseType from '../../Types/course';

let courseStyle =
  'py-2 font-light text-left text-white w-full border-b-2 border-white hover:bg-green-light';

const Course: React.FC<{ course: CourseType }> = ({ course }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    // setHistory returns opposite of what you give it!
    dispatch(setHistory(true));
    dispatch(setSelected(course));
  };
  return (
    <div className={courseStyle} onClick={handleClick}>
      <p className="pl-8">{course.name}</p>
    </div>
  );
};

export default Course;
