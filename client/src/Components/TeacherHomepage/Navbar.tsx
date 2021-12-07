import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useLogoutMutation, useMeQuery } from '../../generated/graphql';
import { ReactComponent as QRLogo } from '../../Assets/thePerfectestLogo2.svg';

const navStyle = 'flex flex-row justify-between h-10vh shadow-lg p-4';

const Navbar: React.FC = () => {
  const [, logout] = useLogoutMutation();
  const [{ data }] = useMeQuery({ variables: {} });
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
        <QRLogo className='w-48 flex' />
      </Link>
      <section className='flex flex-row items-center'>
        <h3 className='pr-8 font-lato font-bold text-lg'>
          {data?.me?.name} {data?.me?.lastname}
        </h3>
        <button onClick={handleLogout} className='font-normal hover:text-green'>
          Logout
        </button>
      </section>
    </nav>
  );
};

export default Navbar;
