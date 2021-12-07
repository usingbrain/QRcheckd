import React from 'react';
import { ReactComponent as CheckIcon } from '../../Assets/solo-check.svg';
import { ReactComponent as CrossIcon } from '../../Assets/solo-cross.svg';

import { useSessionAttendanceQuery } from '../../generated/graphql';
import User from '../../Types/user';
import { useParams } from 'react-router';

interface Props {
  studentList: (User | null | undefined)[];
}

const CheckboxListHistory: React.FC<Props> = ({ studentList }) => {
  const sessionId = Number(useParams().sessionId);
  const [{ fetching, data, error }] = useSessionAttendanceQuery({
    variables: { sessionId },
  });

  if (fetching) {
  } // TODO handle fetching
  if (error) {
  } // TODO handle error

  const studentsAttended = data?.getSessionAttendance?.data;

  return (
    <div>
      {!!studentsAttended &&
        studentList?.map((student) => {
          if (
            studentsAttended.some(
              (attendee) => attendee?.email === student?.email
            )
          ) {
            return (
              <div className='flex justify-center items-center w-16 h-16'>
                <CheckIcon className='w-7 h-7' />
              </div>
            );
          }
          return (
            <div className='flex justify-center items-center w-16 h-16'>
              <CrossIcon className='w-7 h-7' />
            </div>
          );
        })}
    </div>
  );
};

export default CheckboxListHistory;
