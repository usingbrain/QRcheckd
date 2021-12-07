import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCourses } from '../../store/actions';
import { Link } from 'react-router-dom';
import Course from './Course';
import { useCoursesQuery } from '../../generated/graphql';
import CourseType from '../../Types/course';

const listStyle = 'w-full text-left';

const CourseList: React.FC = () => {
  const dispatch = useDispatch();
  const [{ fetching, data, error }] = useCoursesQuery({ variables: {} });
  const courses = data?.getCourses?.data;

  const coursesState = useSelector(
    (state: { courses: CourseType[] | null }) => state.courses // initialze with empty array instead of null
  );
  // const [state, setState] = useState(coursesState);

  // useEffect(() => {
  //   setState(coursesState);
  // }, [coursesState]);

  useEffect(() => {
    if (courses) {
      // @ts-ignore
      dispatch(setCourses(courses));
    }
  }, []);

  if (fetching) {
  } // TODO handle fetching
  if (error) {
  } // TODO handle error

  // if (courses) {
  //   // @ts-ignore
  //   dispatch(setCourses(courses));

  return (
    <div className={listStyle}>
      {
        // useredux state here instead of DB response
        coursesState!.map((course) => {
          return (
            <article key={course?.id}>
              <Link to={`/homepage/classes/${course?.id}`}>
                {!!course && <Course course={course} />}
              </Link>
            </article>
          );
        })
      }
    </div>
  );
};

//   return <article></article>;
// };

export default CourseList;
