import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Course from './Course';
import CourseType from '../../Types/course';
import { NavLink } from 'react-router-dom';

const listStyle = 'w-full text-left';
let courseStyle =
  'flex flex-col py-2 font-light text-left text-white w-full border-2 border-green hover:border-white justify-center items-center';
const courseSelected =
  'flex flex-col py-2 font-light text-left text-white w-full border-2 border-white justify-center items-center';


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
              <NavLink className={({ isActive }) => {
                return isActive ? courseSelected : courseStyle
              }} to={`/homepage/classes/${course?.id}`}>
                {!!course && <Course course={course} />}
              </NavLink>
            </article>
          );
        })}
    </div>
  );
};

export default CourseList;
