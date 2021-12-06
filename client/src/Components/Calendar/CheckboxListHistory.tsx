import React from 'react';
import { ReactComponent as CheckBoxChecked } from '../../Assets/chekcbox-checked.svg';
import { ReactComponent as CheckBoxCrossed } from '../../Assets/chekcbox-cross.svg';

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
            return <CheckBoxChecked className="w-10 h-10" />;
          }
          return <CheckBoxCrossed className="w-10 h-10" />;
        })}
    </div>
  );
};

export default CheckboxListHistory;
