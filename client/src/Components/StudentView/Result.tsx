import React from 'react';

interface Props {
  message: string;
}

const Result: React.FC<Props> = ({ message }) => {
  return (
    <div>
      <h2>{message}</h2>
      <button>Go to dashboard</button>
    </div>
  );
};

export default Result;
