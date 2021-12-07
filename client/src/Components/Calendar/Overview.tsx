import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCourseOverviewQuery } from '../../generated/graphql';
//package for date format
import moment from 'moment';

const overviewStyle =
  'flex flex-col m-auto bg-green w-11/12 md:w-10/12 lg:w-9/12 xl:w-7/12 mt-8 h-1/3 md:h-2/4 lg:h-2/3 xl:h-3/4';
const headerStyle =
  'flex bg-green shadow-md p-4 justify-center text-white text-md sm:text-lg md:text-xl';
const historyStyle = 'flex flex-row flex-wrap justify-start bg-white w-full h-full overflow-scroll';

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
    <div>
      <div className={overviewStyle}>
        <article className='flex flex-col justify-center p-2 h-full'>
          <p className='m-auto text-xl text-white pb-2'>Attendance</p>
          <section className={historyStyle}>
            {!!sessions &&
              sessions.map((session) => {
                if (session) {
                  const date = new Date(Number(session.createdAt));
                  const UTCdate = date.toUTCString();
                  return (
                    <div className='w-26 p-2 md:w-32 text-center border-2 border-black m-1 hover:bg-green-xlight'>
                      <Link to={`/homepage/classes/${courseId}/${session.id}`}>
                        <div>
                          <h5 className='text-lg sm:text-xl'>
                            {session.attendance}
                          </h5>
                          <p className='text-sm sm:text-md'>
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
    </div>
  );
};

export default Overview;
