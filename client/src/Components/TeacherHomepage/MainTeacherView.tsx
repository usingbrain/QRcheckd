import React from 'react';
import { useParams } from 'react-router';
import AddForm from '../TeacherDashboard/AddForm';
import Instruction from './Instruction';

const MainTeacherView = () => {
  const { type } = useParams();
  const addForm = type === 'new-course' && true;

  return <div className="w-3/4">{addForm ? <AddForm /> : <Instruction />}</div>;
};

export default MainTeacherView;
