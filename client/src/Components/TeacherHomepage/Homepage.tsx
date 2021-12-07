import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidemenu from '../TeacherDashboard/Sidemenu';
import Navbar from './Navbar';
import Course from '../../Types/course';
import Instruction from './Instruction';
import { useCoursesQuery } from '../../generated/graphql';
import { setCourses } from '../../store/actions';

const Homepage: React.FC = () => {
  const dispatch = useDispatch();
  const [{ fetching, data, error }] = useCoursesQuery({ variables: {} });
  const courses = data?.getCourses?.data;

  if (fetching) {
  } // TODO handle fetching
  if (error) {
  } // TODO handle error
  if (courses) {
    // @ts-ignore
    dispatch(setCourses(courses));
  }

  const selectedCourse = useSelector(
    (state: { selectedCourse: Course | null }) => state.selectedCourse
  );

  return (
    <div>
      <Navbar />
      <main className="flex flex-row justify-start w-full h-screen">
        <Sidemenu />
        {selectedCourse ? <Outlet /> : <Instruction />}
      </main>
    </div>
  );
};

export default Homepage;
