import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelected } from '../../store/actions';
import CourseType from '../../Types/course';

let courseStyle = 'py-2 font-light text-left text-white w-full border-b-2 border-white hover:bg-green-light';

const Course: React.FC<{ course: CourseType }> = ({ course }) => {
  const dispatch = useDispatch();
  return (
    <p className={courseStyle} onClick={() => dispatch(setSelected(course))}>
      <div className="pl-8">{course.name}</div>
    </p>
  );
};

export default Course;
