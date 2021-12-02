import React, { useEffect } from 'react';
import { ReactComponent as CheckBoxEmpty } from '../../Assets/chekcbox-empty.svg';
import { ReactComponent as CheckBoxChecked } from '../../Assets/chekcbox-checked.svg';
import { useSessionAttendanceQuery } from '../../generated/graphql';
import socketIOClient from 'socket.io-client';
import User from '../../Types/user';
const ENDPOINT = 'http://localhost:4000';

interface Props {
  studentList: User[];
  sessionId: number;
}

const CheckboxList: React.FC<Props> = ({ studentList, sessionId }) => {
  const [{ fetching, data, error }, refetchAttendance] =
    useSessionAttendanceQuery({
      variables: { sessionId },
      requestPolicy: 'network-only',
    });

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('ATTENDANCE_CHANGE', () => refetchAttendance());
  }, []);

  return (
    <div>
      {studentList.map((student) => {
        if (
          data?.getSessionAttendance?.data?.some(
            (attendee) => attendee?.email === student.email
          )
        ) {
          return <CheckBoxChecked className='w-10 h-10' />;
        }
        return <CheckBoxEmpty className='w-10 h-10' />;
      })}
    </div>
  );
};

export default CheckboxList;
