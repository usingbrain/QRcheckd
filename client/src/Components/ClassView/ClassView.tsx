import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StudentsList from './StudentsList';

const ClassView: React.FC<{ name: string; id: string }> = ({ name, id }) => {
  const [first, setFirst] = useState(true);
  const register = 'generate Register code';
  const checkin = 'generate Check In code';
  return (
    <section>
      <div>
        <h1>{name}</h1>
        <Link to="/">
          <button>X</button>
        </Link>
      </div>
      <div>
        <Link to="session">
          <button>{first ? register : checkin}</button>
        </Link>
        <StudentsList />
      </div>
    </section>
  );
};

export default ClassView;
