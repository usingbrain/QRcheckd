import React from 'react';

interface Props {
  name: string;
  lastname: string;
}

const StudentElement: React.FC<Props> = ({ name, lastname }) => {
  return (
    <div className='flex flex-col justify-center h-16'>
      <h3 className='text-xl'>
        {lastname} {name}
      </h3>
    </div>
  );
};

export default StudentElement;
