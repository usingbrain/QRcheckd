import React from 'react';

interface Props {
  name: string;
  lastname: string;
}

const StudentElement: React.FC<Props> = ({ name, lastname }) => {
  return (
    <div className='flex justify-center place-items-center h-10'>
      <h3>{lastname}</h3>
      <h3>{name}</h3>
    </div>
  );
};

export default StudentElement;
