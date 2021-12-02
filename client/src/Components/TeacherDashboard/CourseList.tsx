import React from 'react';
import { Link } from 'react-router-dom';
import Course from './Course';
import { useCoursesQuery } from '../../generated/graphql';

const CourseList: React.FC = () => {
  const [{ fetching, data, error }] = useCoursesQuery({ variables: {} });
  const courses = data?.getCourses?.data;

  if (fetching) {
  } // TODO handle fetching
  if (error) {
  } // TODO handle error
  if (courses) {
    return (
      <div className="w-full text-left pl-8 pt-8">
        {courses.map((course) => {
          return (
            <article key={course?.id}>
              <Link to={`/homepage/classes/${course?.id}`}>
                <Course name={course?.name} />
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
