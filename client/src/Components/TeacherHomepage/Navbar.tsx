import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Assets/PerfectLogo2.svg';

const navStyle = 'flex flex-row justify-between h-20 mb-4 px-8 py-4';

const Navbar: React.FC<{ image: string; name: string }> = ({ image, name }) => {
  return (
    <nav className={navStyle}>
      <Link to="/">
        <img src={logo} alt="qrcheckd logo" className="h-full" />
      </Link>
      <section className="flex flex-row justify-end items-center">
        <h3 className="pr-8 font-lato font-bold text-lg">{name}</h3>
        <img
          src={image}
          alt="user"
          className="rounded-full w-12 h-12 object-cover"
        />
      </section>
    </nav>
  );
};

export default Navbar;
