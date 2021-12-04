import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Assets/PerfectLogo2.svg';
import User from '../../Types/user';
import { useNavigate } from 'react-router';
import { useLogoutMutation } from '../../generated/graphql';

const navStyle = 'flex flex-row justify-between h-20 mb-4 px-8 py-4';

const Navbar: React.FC<{ user: User }> = ({ user }) => {
  const [, logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logout();
    if (result.data?.logoutUser) {
      navigate('/login');
    }
  };
  return (
    <nav className={navStyle}>
      <Link to='/'>
        <img src={logo} alt='qrcheckd logo' className='h-full' />
      </Link>
      <section className='flex flex-row justify-end items-center'>
        <h3 className='pr-8 font-lato font-bold text-lg'>
          {user.name} {user.lastname}
        </h3>
        <button onClick={handleLogout}>Logout</button>
      </section>
    </nav>
  );
};

export default Navbar;
