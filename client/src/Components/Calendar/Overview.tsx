import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCourseOverviewQuery } from '../../generated/graphql';
//package for date format
import moment from 'moment';

const overviewStyle = 'flex flex-col bg-green w-11/12 mt-4 self-center';

const historyStyle = 'grid grid-cols-6 bg-white w-full h-6/7';

const Overview: React.FC = () => {
  const courseId = Number(useParams().courseId);
  const [{ fetching, data, error }] = useCourseOverviewQuery({
    variables: { courseId },
  });

  if (fetching) {
  } // TODO handle fetching
  if (error) {
  } // TODO handle error

  const history = data?.getCourseOverview?.data;
  const sessions = history?.sessions;

  console.log('history: ', history);
  return (
    <div className={overviewStyle}>
      <article className='flex flex-col justify-center h-full'>
        <p className='flex justify-center items-center text-4xl text-white h-16'>
          Sessions Attendance
        </p>
        <section className={historyStyle}>
          {!!sessions &&
            sessions.map((session) => {
              if (session) {
                const date = new Date(Number(session.createdAt));
                const UTCdate = date.toUTCString();
                return (
                  <div className='flex items-center justify-center h-32 w-32 text-center border-2 border-white hover:border-green'>
                    <Link to={`/homepage/classes/${courseId}/${session.id}`}>
                      <div>
                        <h5 className='font-bold text-6xl text-green'>
                          {session.attendance}
                        </h5>
                        <p className='text-sm sm:text-md text-black'>
                          {moment(UTCdate).format('L')}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              }
            })}
        </section>
      </article>
    </div>
  );
};

export default Overview;
