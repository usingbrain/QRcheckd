import React from 'react';

const Course: React.FC<{ name: string; id: number }> = ({ name, id }) => {
  return <p>{name}</p>;
};

export default Course;
