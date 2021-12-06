import React from 'react';

const registerStyle = 'flex justify-center bg-green hover:bg-green-light py-4 rounded-sm font-bold text-lg mb-8 text-white h-16 w-full';

const RegisterBtn: React.FC<{ courseId: number }> = ({ courseId }) => {
  function openQR() {
    window.open(
      window.location.origin + `/register/${courseId}`,
      '_blank',
      'toolbar=0,location=0,menubar=0, resizable=yes, width=500, height=500',
    );
  }

  return <button onClick={openQR} className={registerStyle}>Register students</button>;
};

export default RegisterBtn;
