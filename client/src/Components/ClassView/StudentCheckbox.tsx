import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as CheckBoxEmpty } from '../../Assets/chekcbox-empty.svg';

interface Props {
  name: string;
  lastname: string;
  email: string;
  isChecked: boolean;
}

const StudentCheckbox: React.FC<Props> = ({ name, lastname, email }) => {
  //   const currentSession = useSelector((state) => state.session);

  return isChecked ? soemthing : <CheckBoxEmpty className='w-10 h-10' />;
};
interface Props {
  name: string;
  lastname: string;
}

export default StudentCheckbox;
