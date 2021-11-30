import React from 'react';
import { useSetCourseContext } from '../../CourseContext';

let courseStyle = 'p-2 font-medium text-left text-grey w-full';

const Course: React.FC<{ name: string; id: string }> = ({ name, id }) => {
  const setSelectedCourse = useSetCourseContext();

  function handleClick() {
    setSelectedCourse({ name, id });
  }

  return (
    <p onClick={handleClick} className={courseStyle}>
      {name}
    </p>
  );
};

export default Course;
