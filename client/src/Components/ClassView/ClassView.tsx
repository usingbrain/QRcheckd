import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetCourseQuery } from '../../generated/graphql';
import StudentsList from './StudentsList';
import { ReactComponent as CloseBtn } from '../../Assets/window-close-regular.svg';

const headerStyle =
  'bg-green text-white flex flex-row justify-between items-center content-center p-8 h-24 mb-4 text-3xl';
const viewStyle =
  'flex flex-col justify-start items-left content-center pt-4 pl-8 h-full';
const qrBtnStyle =
  'bg-green hover:bg-turqoise py-4 px-8 rounded font-bold text-lg mb-4';

const ClassView: React.FC = () => {
  // use params hook to get the id
  const courseId = Number(useParams().courseId);
  // --> fetch the full course object from the DB
  const [{ fetching, data, error }] = useGetCourseQuery({
    variables: { courseId },
  });
  const course = data?.getCourse?.data;

  //on button click new window with QR code opens, the student list should be updating real time
  function openQR() {
    window.open(
      window.location.origin + '/session',
      '_blank',
      'toolbar=0,location=0,menubar=0'
    );
  }

  if (fetching) {
  } // TODO handle fetching
  if (error) {
  } // TODO handle error
  if (course !== null && course !== undefined) {
    return (
      <section className="h-screen flex flex-col justify-start w-3/4">
        <div className={headerStyle}>
          <h1 className="font-bold">{course.name?.toUpperCase()}</h1>
          <Link to="/homepage">
            <button>
              <CloseBtn className="w-10 h-10" />
            </button>
          </Link>
        </div>
        <div className={viewStyle}>
          <button className={qrBtnStyle} onClick={openQR}>
            GENERATE QR CODE
          </button>
          <StudentsList courseId={courseId} />
        </div>
      </section>
    );
  }

  return <p>no course selected</p>;
};

export default ClassView;

// the icon for the close button was downloaded from fontawesome.com under the following license: https://fontawesome.com/license
