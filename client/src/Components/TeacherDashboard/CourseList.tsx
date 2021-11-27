import React from 'react';
import { Link } from 'react-router-dom';
import Course from './Course';

interface CourseInterface {
  name: string;
  id: string;
}
const courses: CourseInterface[] = [
  { name: 'test course', id: '123' },
  { name: 'test course 2', id: '1234' },
  { name: 'test course 3', id: '12345' },
];

const CourseList: React.FC = () => {
  return (
    <div>
      {courses.map((course) => {
        return (
          <article>
            <Link to={`/classes/${course.id}`}>
              <Course name={course.name} id={course.id} />
            </Link>
          </article>
        );
      })}
    </div>
  );
};

export default CourseList;
