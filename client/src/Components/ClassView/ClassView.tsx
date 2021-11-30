import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StudentsList from './StudentsList';

const headerStyle =
  'bg-green text-white flex flex-row justify-between items-center content-center p-8 h-24 mb-4 text-3xl';
const viewStyle =
  'flex flex-col justify-start items-left content-center pt-4 pl-8 h-full';
const closeBtnStyle = 'bg-none rounded font-bold';
const qrBtnStyle = 'bg-turqoise p-4 rounded font-bold text-lg mb-4';

const ClassView: React.FC<{ name: string; id: string }> = ({ name, id }) => {
  const [first, setFirst] = useState(true);
  const register = 'generate Register code';
  const checkin = 'generate Check In code';
  return (
    <section className="h-screen flex flex-col justify-start w-3/4">
      <div className={headerStyle}>
        <h1 className="font-bold">{name.toUpperCase()}</h1>
        <Link to="/">
          <button className={closeBtnStyle}>X</button>
        </Link>
      </div>
      <div className={viewStyle}>
        <Link to="session">
          <button className={qrBtnStyle}>{first ? register : checkin}</button>
        </Link>
        <StudentsList courseId={id} />
      </div>
    </section>
  );
};

export default ClassView;
