import React from 'react';
import { useSetCourseContext } from '../../CourseContext';

const Course: React.FC<{ name: string; id: string }> = ({ name, id }) => {
  const setSelectedCourse = useSetCourseContext();

  return <p onClick={() => setSelectedCourse({ name, id })}>{name}</p>;
};

export default Course;
