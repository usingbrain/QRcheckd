import React from 'react';
import { Link } from 'react-router-dom';
import User from '../../Types/user';
import { useNavigate } from 'react-router';
import { useLogoutMutation } from '../../generated/graphql';
import { ReactComponent as QRLogo } from '../../Assets/thePerfectestLogo2.svg';

const navStyle = 'flex flex-row justify-between h-20 shadow-lg p-4';

const Navbar: React.FC<{ user: User }> = ({ user }) => {
  const [, logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logout();
    if (result.data?.logoutUser) {
      navigate('/');
    }
  };
  return (
    <nav className={navStyle}>
      <Link to='/'>
        <QRLogo className='w-1/2 lg:w-2/3 flex' />
      </Link>
      <section className='flex flex-row items-center'>
        <h3 className='pr-8 font-lato font-bold text-lg'>
          {user.name} {user.lastname}
        </h3>
        <button onClick={handleLogout}>Logout</button>
      </section>
    </nav>
  );
};

export default Navbar;
