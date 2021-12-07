import React from 'react';
import { useIndividualAttendanceQuery } from '../../generated/graphql';
import { useParams } from 'react-router';
import { ReactComponent as CheckBoxChecked } from '../../Assets/chekcbox-checked.svg';
import { ReactComponent as CheckBoxCrossed } from '../../Assets/chekcbox-cross.svg';
import moment from 'moment';

const StudentHistory: React.FC = () => {
  const courseId = Number(useParams().courseId);
  const studentId = Number(useParams().studentId);
  const [{ fetching, data, error }] = useIndividualAttendanceQuery({
    variables: { courseId, studentId },
  });

  if (fetching) {
  } // TODO handle fetching
  if (error) {
  } // TODO handle error

  const indivHistory = data?.getIndividualAttendance?.data; // returns {attended, date}

  if (indivHistory) {
    return (
      <div className=" flex flex-row flex-wrap w-5/6 justify-start ">
        {indivHistory.map((session) => {
          const date = new Date(Number(session!.date));
          const UTCdate = date.toUTCString();

          return (
            <div className="flex flex-col justify-center p-4 items-center">
              {session!.attended ? (
                <CheckBoxChecked className="w-10 h-10" />
              ) : (
                <CheckBoxCrossed className="w-10 h-10" />
              )}
              <p>{moment(UTCdate).format('L')}</p>
            </div>
          );
        })}
      </div>
    );
  }
  return <p>This student has no history of attendance</p>;
};

export default StudentHistory;

// return (
//   <div>
//     {!!studentsAttended &&
//       studentList?.map((student) => {
//         if (
//           studentsAttended.some(
//             (attendee) => attendee?.email === student?.email
//           )
//         ) {
//           return <CheckBoxChecked className="w-10 h-10" />;
//         }
//         return <CheckBoxCrossed className="w-10 h-10" />;
//       })}
//   </div>
// );

// if (session) {
//   const date = new Date(Number(session.createdAt));
//   const UTCdate = date.toUTCString();
//   return (
//     <div className="w-26 p-2 md:w-32 text-center border-2 border-black m-1 hover:bg-green-xlight">
//       <Link to={`/homepage/classes/${courseId}/${session.id}`}>
//         <div>
//           <h5 className="text-lg sm:text-xl">{session.attendance}</h5>
//           <p className="text-sm sm:text-md">{moment(UTCdate).format('L')}</p>
//         </div>
//       </Link>
//     </div>
//   );
// }
