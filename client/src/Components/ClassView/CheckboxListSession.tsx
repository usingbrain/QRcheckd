import React, { useEffect } from 'react';
import { ReactComponent as CircleEmpty } from '../../Assets/circle-empty.svg';
import { useSessionAttendanceQuery } from '../../generated/graphql';
import socketIOClient from 'socket.io-client';
import User from '../../Types/user';
import Lottie from 'react-lottie';
import checkAnimation from '../../Assets/circle-check-animation.json';
const ENDPOINT = 'http://localhost:4000';

interface Props {
  studentList: User[];
  sessionId: number;
}

const checkAnimOptions = {
  loop: false,
  autoplay: true,
  animationData: checkAnimation,
  rendererSettings: {},
};

const CheckboxListSession: React.FC<Props> = ({ studentList, sessionId }) => {
  const [{ fetching, data, error }, refetchAttendance] =
    useSessionAttendanceQuery({
      variables: { sessionId },
      requestPolicy: 'network-only',
    });

  if (fetching) {
  } // TODO handle fetching
  if (error) {
  } // TODO handle error

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('ATTENDANCE_CHANGE', () => refetchAttendance());
  }, [refetchAttendance]);

  return (
    <div>
      {studentList.map((student) => {
        if (
          data?.getSessionAttendance?.data?.some(
            (attendee) => attendee?.email === student.email
          )
        ) {
          return (
            <div className='w-16 h-16'>
              <Lottie
                options={checkAnimOptions}
                height={'100%'}
                width={'100%'}
              />
            </div>
          );
        }
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '64px',
              width: '64px',
            }}
          >
            <CircleEmpty className='w-7 h-7' />
          </div>
        );
      })}
    </div>
  );
};

export default CheckboxListSession;
