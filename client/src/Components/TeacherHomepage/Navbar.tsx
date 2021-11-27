import React from 'react';
import logo from '../Assets/PerfectLogo.svg';

const navStyle = 'flex flex-row justify-between h-12';

const Navbar: React.FC<{ image: string; name: string }> = ({ image, name }) => {
  return (
    <div className={navStyle}>
      <img src={logo} alt="qrcheckd logo" className="h-full" />
      <section className="flex flex-row justify-end">
        <h3>{name}</h3>
        <img src={image} alt="user" className="h-full rounded-full w-12" />
      </section>
    </div>
  );
};

export default Navbar;
