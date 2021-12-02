import React from 'react';

let courseStyle = 'p-2 font-light text-left text-black w-full';

const Course: React.FC<{ name: string | null | undefined }> = ({ name }) => {
  return <p className={courseStyle}>{name}</p>;
};

export default Course;
