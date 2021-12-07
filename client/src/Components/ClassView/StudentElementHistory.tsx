import React from 'react';
import { useNavigate } from 'react-router';

interface Props {
  courseId: number;
  studentId: number;
  name: string;
  lastname: string;
}

const StudentElementHistory: React.FC<Props> = ({
  name,
  lastname,
  courseId,
  studentId,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex justify-center place-items-center h-10"
      onClick={() =>
        navigate(`/homepage/classes/${courseId}/student/${studentId}`)
      }
    >
      <h3>{lastname}</h3>
      <h3>{name}</h3>
    </div>
  );
};

export default StudentElementHistory;
