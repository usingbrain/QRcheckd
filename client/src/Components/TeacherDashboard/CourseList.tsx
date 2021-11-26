import React from 'react';
import Course from './Course';

interface CourseInterface {
  name: string;
  id: number;
}
const courses: CourseInterface[] = [
  { name: 'test course', id: 123 },
  { name: 'test course 2', id: 123 },
  { name: 'test course 3', id: 123 },
];

const CourseList: React.FC = () => {
  return (
    <div>
      {courses.map((course) => {
        return <Course name={course.name} id={course.id} />;
      })}
    </div>
  );
};

export default CourseList;
