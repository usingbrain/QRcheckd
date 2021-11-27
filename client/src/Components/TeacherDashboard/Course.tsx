import React from 'react';
import { useSetCourseContext } from '../../CourseContext';

const Course: React.FC<{ name: string; id: string }> = ({ name, id }) => {
  const setCourseId = useSetCourseContext();

  return <p onClick={() => setCourseId(id)}>{name}</p>;
};

export default Course;
