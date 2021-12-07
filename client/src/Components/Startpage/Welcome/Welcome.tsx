import React from 'react';
import Prompt from './Prompt';
import QRExample from './QRExample';
import { ReactComponent as QRLogo } from '../../../Assets/thePerfectestLogo2.svg';
import Attendance from './Attendance';

const qrBarStyle =
  'bg-black flex rounded-sm h-60 md:h-56 lg:h-60 xl:h-80 justify-center flex-col p-20 invisible sm:visible my-40 w-screen invisible sm:visible';
const header =
  'flex place-items-center rounded-sm h-1/6 w-full justify-center md:justify-start md:px-10';
const textStyle =
  'bg-green flex rounded-sm h-60 md:h-56 lg:h-60 xl:h-80 justify-center flex-col p-20 invisible sm:visible my-0 w-screen invisible sm:visible';

const Welcome: React.FC = () => {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-col h-screen'>
        <header className={header}>
          <QRLogo className='h-10' />
        </header>
        <section className='flex justify-center h-5/6'>
          <Prompt />
        </section>
      </div>
      <article className={qrBarStyle}>
        <p className='text-white py-4 text-lg md:text-xl lg:text-2xl xl:text-3xl'>
          Students can scan a QR code to check attendance.
        </p>
      </article>
      <div className='h-screen w-full'>
        <section className='h-screen'>
          <QRExample />
        </section>
      </div>
      <article className={textStyle}>
        <p className='text-white py-4 text-lg md:text-xl lg:text-2xl xl:text-4xl'>
          Get attendance data in real time.
        </p>
      </article>
      <div className='h-screen w-full'>
        <section className='h-screen'>
          <Attendance />
        </section>
      </div>
      <footer className='border-t-2 border-grey-light invisible sm:visible h-0 sm:h-2'>
        <div className='mx-8 text-grey-light invisible sm:visible h-0 sm:h-2'>@ 2021 QRcheckd. Do whateva.</div>
      </footer>
    </div>
  );
};

export default Welcome;
