import React from 'react';

const students = [
  { name: 'Pretty Boy' },
  { name: 'Smart Girl' },
  { name: 'Funny Boy' },
  { name: 'Nerdy Girl' },
  { name: 'Petty Bitch' },
];

const StudentsList = () => {
  return (
    <div>
      {students.map((student) => {
        return <p>{student.name}</p>;
      })}
    </div>
  );
};

export default StudentsList;
