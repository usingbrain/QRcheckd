import React from 'react';
import { useAssignStudentMutation } from '../../generated/graphql';

const RegisterBtn: React.FC<{ courseId: number }> = ({ courseId }) => {
  function openQR() {
    window.open(
      window.location.origin + `/register/${courseId}`,
      '_blank',
      'toolbar=0,location=0,menubar=0, resizable=yes, width=500, height=500'
    );
  }

  return <button onClick={openQR}>REGISTER BUTTON</button>;
};

export default RegisterBtn;
