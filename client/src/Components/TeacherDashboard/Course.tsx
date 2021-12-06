import React from 'react';
import { useDispatch } from 'react-redux';
import { setHistory, setSelected } from '../../store/actions';
import CourseType from '../../Types/course';

let courseStyle = 'flex flex-col py-2 font-light text-left text-white w-full hover:bg-green-light justify-center';

const Course: React.FC<{ course: CourseType }> = ({ course }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    // setHistory returns opposite of what you give it!
    dispatch(setHistory(true));
    dispatch(setSelected(course));
  };
  return (
    <div className={courseStyle} onClick={handleClick}>
      <p className="flex justify-center pb-4">{course.name}</p>
      <hr className="border-b-1 border-white w-1/4 m-auto"></hr>
    </div>
  );
};

export default Course;
