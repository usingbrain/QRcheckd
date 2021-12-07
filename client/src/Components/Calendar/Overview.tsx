import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCourseOverviewQuery } from '../../generated/graphql';
//package for date format
import moment from 'moment';

const overviewStyle =
  'flex flex-col m-auto bg-green w-11/12 md:w-10/12 lg:w-9/12 xl:w-7/12 mt-8 h-1/2 lg:h-3/4 px-2 pb-2';

const historyStyle =
  'flex flex-row flex-wrap justify-start bg-white w-full overflow-scroll h-6/7';

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
    <div className="h-screen">
      <div className={overviewStyle}>
        <article className='flex flex-col justify-center h-full'>
          <p className='m-auto text-xl text-white pb-2 h-8 flex'>Attendance</p>
          <section className={historyStyle}>
            {!!sessions &&
              sessions.map((session) => {
                if (session) {
                  const date = new Date(Number(session.createdAt));
                  const UTCdate = date.toUTCString();
                  return (
                    <div className='h-20 p-2 w-32 text-center border-2 border-black m-1 hover:bg-green-xlight'>
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
