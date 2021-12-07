import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Course from './Course';
import CourseType from '../../Types/course';

const listStyle = 'w-full text-left';

const CourseList: React.FC = () => {
  const coursesState = useSelector(
    (state: { courses: CourseType[] | null }) => state.courses // TODO: initialze with empty array instead of null
  );

  return (
    <div className={listStyle}>
      {!!coursesState &&
        // useredux state here instead of DB response
        coursesState.map((course) => {
          return (
            <article key={course?.id}>
              <Link to={`/homepage/classes/${course?.id}`}>
                {!!course && <Course course={course} />}
              </Link>
            </article>
          );
        })}
    </div>
  );
};

export default CourseList;
