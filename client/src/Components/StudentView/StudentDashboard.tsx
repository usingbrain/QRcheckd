import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import { useMeQuery } from '../../generated/graphql';
import { ReactComponent as QRLogo } from '../../Assets/PerfectLogo2.svg';

const scannerStyle = "bg-green flex rounded-sm w-full h-full md:w-1/2 flex-col  items-center p-2";
const sectionStyle = "bg-white flex flex-row rounded-sm md:w-10/12 w-5/6 h-5/7 h-80 items-center m-auto shadow-2xl";
const lottieStyle = "md:w-1/2 w-0 invisible md:visible";
const cameraStyle = "w-5/6 h-1/2 bg-white overflow-hidden";
const buttonStyle = "w-4/6 h-14 bg-white m-auto text-2xl text-green font-medium";

const StudentDashboard: React.FC = () => {
  const [displayScanner, setDisplayScanner] = useState(false);
  const [{ fetching, data, error }] = useMeQuery();
  const student = data?.me?.name || 'Friend';

  if (fetching) {
    //TODO
  }
  if (error) {
    //TODO
  }

  const handleData = (data: string | null) => {
    console.log(data);
  };

  const handleError = (error: any) => {
    console.log(error);
  };

  return (
    <div className="h-screen w-full">
      <div className="h-24 w-44 m-auto md:my-4 md:h-28 md:w-40 lg:h-32 lg:w-44 my-4"><QRLogo /></div>
      <section className={sectionStyle}>
        <aside className={lottieStyle}>
          Lottie
        </aside>
        <div className={scannerStyle}>
          <div className="text-white text-3xl my-8">Welcome, {student}</div>
          <article className={cameraStyle}>
            {displayScanner && (
              <QrReader
                delay={300}
                onError={handleError}
                onScan={handleData}
                style={{ width: '100%', height: '100%' }}
              />
            )}
          </article>
          <button onClick={() => setDisplayScanner(!displayScanner)} className={buttonStyle}>{displayScanner ? 'End Scan' : 'Scan Code'}</button>
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;
