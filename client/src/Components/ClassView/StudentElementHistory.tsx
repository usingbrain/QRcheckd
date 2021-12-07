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
      className="flex place-items-center h-10"
      onClick={() =>
        navigate(`/homepage/classes/${courseId}/student/${studentId}`)
      }
    >
      <h3 className="mx-4">{lastname} {name}</h3>
    </div>
  );
};

export default StudentElementHistory;
