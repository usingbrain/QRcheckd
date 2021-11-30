import React, { useState } from 'react';
import QrReader from 'react-qr-reader';

const bakcgroudnStyle = 'bg-green h-screen';

const StudentDashboard: React.FC = () => {
  const [displayScanner, setDisplayScanner] = useState(false);
  const handleData = (data: any) => {
    console.log(data);
  };

  const handleError = (error: any) => {
    console.log(error);
  };

  return (
    <div className={bakcgroudnStyle}>
      <div>Welcome undefined</div>
      <div>Scan QR</div>
      {displayScanner && (
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleData}
          style={{ width: '30%' }}
        />
      )}
      <button onClick={() => setDisplayScanner(!displayScanner)}>Scan?</button>
    </div>
  );
};

export default StudentDashboard;
