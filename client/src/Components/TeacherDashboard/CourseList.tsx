import React from 'react';
import { Link } from 'react-router-dom';
import Course from './Course';

interface CourseInterface {
  name: string;
  id: string;
}

const courses: CourseInterface[] = [
  { name: 'Test course', id: '123' },
  { name: 'Test course 2', id: '1234' },
  { name: 'Test course 3', id: '12345' },
];

const CourseList: React.FC = () => {
  return (
    <div className="w-full text-left pl-8 pt-8">
      {courses.map((course) => {
        return (
          <article key={course.id}>
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
