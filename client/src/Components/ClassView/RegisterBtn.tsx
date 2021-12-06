import React from 'react';

const registerStyle = 'flex justify-center bg-green hover:bg-green-light py-4 rounded-sm text-lg mb-8 text-white h-16';

const RegisterBtn: React.FC<{ courseId: number }> = ({ courseId }) => {
  function openQR() {
    window.open(
      window.location.origin + `/register/${courseId}`,
      '_blank',
      'toolbar=0,location=0,menubar=0, resizable=yes, width=500, height=500',
    );
  }

  return <div className={registerStyle}>
    <button onClick={openQR} className="invisible md:visible w-0 md:w-full flex justify-center h-0 md:h-full">Register students</button>
    <p className="visible md:invisible md:w-0 md:h-0">Register</p>
  </div>;
};

export default RegisterBtn;
