import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StudentsList from './StudentsList';
import { ReactComponent as CloseBtn } from '../../Assets/window-close-regular.svg';

const headerStyle =
  'bg-green text-white flex flex-row justify-between items-center content-center p-8 h-24 mb-4 text-3xl';
const viewStyle =
  'flex flex-col justify-start items-left content-center pt-4 pl-8 h-full';
const qrBtnStyle =
  'bg-green hover:bg-turqoise py-4 px-8 rounded font-bold text-lg mb-4';

const ClassView: React.FC<{ name: string; id: string }> = ({ name, id }) => {
  // const [first, setFirst] = useState(true);
  // const register = 'generate Register code';
  // const checkin = 'generate Check In code';

  return (
    <section className="h-screen flex flex-col justify-start w-3/4">
      <div className={headerStyle}>
        <h1 className="font-bold">{name.toUpperCase()}</h1>
        <Link to="/">
          <button>
            <CloseBtn className="w-10 h-10" />
          </button>
        </Link>
      </div>
      <div className={viewStyle}>
        <Link to="session">
          <button className={qrBtnStyle}>GENERATE QR CODE</button>
        </Link>
        <StudentsList courseId={id} />
      </div>
    </section>
  );
};

export default ClassView;

// the icon for the close button was downloaded from fontawesome.com under the following license: https://fontawesome.com/license
