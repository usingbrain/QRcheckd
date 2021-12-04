import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelected } from '../../store/actions';
import CourseType from '../../Types/course';

let courseStyle = 'p-2 font-light text-left text-black w-full';

const Course: React.FC<{ course: CourseType }> = ({ course }) => {
  const dispatch = useDispatch();
  return (
    <p className={courseStyle} onClick={() => dispatch(setSelected(course))}>
      {course.name}
    </p>
  );
};

export default Course;
