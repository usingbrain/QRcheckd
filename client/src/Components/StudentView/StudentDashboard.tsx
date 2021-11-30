import React, { useState } from 'react';

const bakcgroudnStyle = 'bg-green h-screen';

interface ScannerState {
  value: string;
  watching: boolean;
}

const StudentDashboard: React.FC = () => {
  const [scanner, setScanner] = useState<ScannerState>({
    value: '',
    watching: false,
  });

  return (
    <div className={bakcgroudnStyle}>
      <div>Welcome undefined</div>
      <div>Scan QR</div>
    </div>
  );
};

export default StudentDashboard;
