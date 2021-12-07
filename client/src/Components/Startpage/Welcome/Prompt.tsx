import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../Assets/checklist.json';
import { ReactComponent as QRStamp } from '../../../Assets/thePerfectestLogo2.svg';

const promptStyle =
  'flex flex-col justify-around w-full h-full md:h-3/4 md:self-center';
const checklistStyle = 'h-auto w-44 md:w-4/6 sm:w-1/2';
const welcomeStyle =
  'flex flex-col justify-around items-center sm:w-full md:flex-row';
const registerStyle =
  'w-11/12 bg-green text-white text-center mb-6 p-4 sm:m-0 sm:w-5/12';
const loginStyle =
  'w-11/12 text-green border-2 border-green text-center p-4 sm:w-5/12';

const Prompt: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {},
  };

  return (
    <div className='flex w-full h-full 2xl:px-32 2xl:w-3/4'>
      <Outlet />
      <section className={promptStyle}>
        <h1 className='text-green font-bold text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-center'>
          Welcome to QRCheckd!
        </h1>
        <article className={welcomeStyle}>
          <div className='flex flex-col justify-around w-full sm:h-4/6'>
            <p className='text-black text-2xl lg:text-3xl xl:text-4xl text-center p-4'>
              Take attendance quickly, easily, and without hassle.
            </p>
            <div className='flex flex-col justify-around items-center sm:flex-row w-full'>
              <Link to={'/register'} className={registerStyle}>
                Register
              </Link>
              <Link to={'/login'} className={loginStyle}>
                Login
              </Link>
            </div>
          </div>
          <div className={checklistStyle}>
            <Lottie options={defaultOptions} height={'100%'} width={'100%'} />
          </div>
        </article>
      </section>
    </div>
  );
};

export default Prompt;
