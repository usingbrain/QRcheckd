import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import {
  useAttendMutation,
  useAssignStudentMutation,
  useLogoutMutation,
  useMeQuery,
} from '../../generated/graphql';
import { ReactComponent as QRLogo } from '../../Assets/thePerfectestLogo2.svg';
import Result from './Result';
import { useNavigate } from 'react-router';

const scannerStyle =
  'bg-green flex rounded-sm w-full h-full md:w-1/2 flex-col  items-center p-2';
const sectionStyle =
  'bg-green flex flex-col justify-around w-full h-5/6 items-center';
const cameraStyle =
  'flex flex-col justify-around items-center text-center w-80 h-80 bg-white';
const buttonStyle = 'w-4/6 h-14 bg-white text-2xl text-green font-medium';

const StudentDashboard: React.FC = () => {
  const [displayScanner, setDisplayScanner] = useState(false);
  const [{ fetching, data, error }] = useMeQuery();
  const student = data?.me?.name || 'Friend';
  const navigate = useNavigate();
  const [, attend] = useAttendMutation();
  const [, assignStudent] = useAssignStudentMutation();
  const [, logout] = useLogoutMutation();
  const [showResult, setShowResult] = useState(false);
  const [message, setMessage] = useState('');

  if (fetching) {
    //TODO
  }
  if (error) {
    //TODO
  }

  const attendClass = async (sessionId: number) => {
    const response = await attend({ sessionId });

    if (response.data?.attend.data) {
      // checked succesfully
      setMessage('Q R Checkd!');
    } else if (response.data?.attend.error) {
      // check not getting through
      setMessage(response.data.attend.error);
    } else {
      // network/query error
      setMessage('Check your network connection!');
    }
  };

  const registerToClass = async (courseId: number) => {
    const response = await assignStudent({ courseId });

    if (response.data?.assignStudent.data) {
      // checked succesfully
      setMessage('Register successfull');
    } else if (response.data?.assignStudent.error) {
      // check not getting through
      setMessage(response.data.assignStudent.error);
    } else {
      // network/query error
      setMessage('Check your network connection!');
    }
  };

  const handleScan = async (data: string | null) => {
    if (data) {
      const dataArr = data.split(' ');
      const type = dataArr[0];
      const id = Number(dataArr[1]);

      if (type === 'register') {
        await registerToClass(id);
      }
      if (type === 'attend') {
        await attendClass(id);
      }

      setDisplayScanner(false);
      setShowResult(true);
      console.log(message);
      setInterval(() => {
        setShowResult(false);
        setMessage('');
      }, 5000);
    }
  };

  const handleError = (error: any) => {
    console.log(error);
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.data?.logoutUser) {
      navigate('/login');
    }
  };

  return (
    <div className='h-screen w-full'>
      <div className='flex flex-row justify-around place-items-center h-24 w-full md:my-4 md:h-28 lg:h-32 my-4'>
        <div className='w-40'>
          <QRLogo />
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <section className={sectionStyle}>
        <div className='text-white text-3xl'>Welcome, {student}</div>
        <article className={cameraStyle}>
          {displayScanner && (
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: '100%', height: '100%' }}
            />
          )}
          {showResult && <Result message='Q R Checkd!' />}
        </article>
        <button
          onClick={() => setDisplayScanner(!displayScanner)}
          className={buttonStyle}
        >
          {displayScanner ? 'End Scan' : 'Scan Code'}
        </button>
      </section>
    </div>
  );
};

export default StudentDashboard;
