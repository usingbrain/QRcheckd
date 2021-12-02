import React from 'react';

const students = [
  { name: 'Pretty' },
  { name: 'Smart' },
  { name: 'Funny' },
  { name: 'Nerdy' },
  { name: 'Petty' },
];

const listStyle = 'flex flex-col justify-start items-start';

const StudentsList: React.FC<{ courseId: number }> = ({ courseId }) => {
  return (
    <div className={listStyle}>
      {students.length ? (
        students.map((student) => {
          return <p>{student.name}</p>;
        })
      ) : (
        <p>No students registered for this class yet</p>
      )}
    </div>
  );
};

export default StudentsList;
