import React from 'react';

interface Props {
  name: string;
  lastname: string;
}

const StudentElement: React.FC<Props> = ({ name, lastname }) => {
  return (
    <div className='flex h-10 mx-2'>
      <h3 className="mt-2">{lastname} {name}</h3>
    </div>
  );
};

export default StudentElement;
