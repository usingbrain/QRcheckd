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
<<<<<<< HEAD
          <article>
            <Link to={`/homepage/classes/${course.id}`}>
              <Course name={course.name} id={course.id} key={course.id} />
=======
          <article key={course.id}>
            <Link to={`/classes/${course.id}`}>
              <Course name={course.name} id={course.id} />
>>>>>>> e0d8aa403e73bee95b1f858305545e9e2f29959d
            </Link>
          </article>
        );
      })}
    </div>
  );
};

export default CourseList;
