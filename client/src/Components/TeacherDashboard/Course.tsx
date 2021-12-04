import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelected } from '../../store/actions';
import CourseType from '../../Types/course';

let courseStyle = 'flex py-2 font-light text-left text-white w-full hover:bg-green-light justify-center';

const Course: React.FC<{ course: CourseType }> = ({ course }) => {
  const dispatch = useDispatch();
  return (
    <div className={courseStyle} onClick={() => dispatch(setSelected(course))}>
      <p className="flex justify-center border-b-2 w-1/4 pb-4">{course.name}</p>
    </div>
  );
};

export default Course;
