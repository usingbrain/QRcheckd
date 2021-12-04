import React from 'react';
import { Link } from 'react-router-dom';
import User from '../../Types/user';
import { useNavigate } from 'react-router';
import { useLogoutMutation } from '../../generated/graphql';

const navStyle = 'flex flex-row justify-end h-20 p-4 w-3/4 float-right shadow-lg';

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
