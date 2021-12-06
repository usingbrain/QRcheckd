import React from 'react';

interface Props {
  name: string;
  lastname: string;
}

const StudentElement: React.FC<Props> = ({ name, lastname }) => {
  return (
    <div className='flex justify-center place-items-center p-4'>
      <h3>{lastname} {name}</h3>
    </div>
  );
};

export default StudentElement;
