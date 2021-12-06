import React from 'react';
import { Link } from 'react-router-dom';
import Course from './Course';
import { useCoursesQuery } from '../../generated/graphql';

const listStyle = "w-full text-left";

const CourseList: React.FC = () => {
  const [{ fetching, data, error }] = useCoursesQuery({ variables: {} });
  const courses = data?.getCourses?.data;

  if (fetching) {
  } // TODO handle fetching
  if (error) {
  } // TODO handle error
  if (courses) {
    return (
      <div className={listStyle}>
        {courses.map((course) => {
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
  }

  return <article></article>;
};

export default CourseList;
