import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCourseOverviewQuery } from '../../generated/graphql';
//package for date format
import moment from 'moment';

const overviewStyle = "flex flex-col m-auto bg-white w-11/12 md:w-10/12 lg:w-9/12 xl:w-7/12 shadow-xl mt-8";
const headerStyle = "flex bg-green shadow-md p-4 justify-center text-white text-md sm:text-lg md:text-xl";
const historyStyle = "flex flex-row flex-wrap justify-start w-full";

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
  const total = history?.studentTotal;
  const sessions = history?.sessions;

  console.log('history: ', history);
  return (
    <div>
      <div className={overviewStyle}>
        <header>
          <h3 className={headerStyle}>Students assigned to this course: {total}</h3>
        </header>
        <article className="flex flex-col justify-center">
          <p className="m-auto text-xl">Attendance</p>
          <section className={historyStyle}>
            {!!sessions &&
              sessions.map((session) => {
                if (session) {
                  const date = new Date(Number(session.createdAt));
                  const UTCdate = date.toUTCString();
                  return (
                    <div className="w-26 p-2 md:w-32 text-center border-2 border-black m-1 hover:bg-green-xlight">
                      <Link to={`/homepage/classes/${courseId}/${session.id}`}>
                        <div>
                          <h5 className="text-lg sm:text-xl">{session.attendance}</h5>
                          <p className="text-sm sm:text-md">{moment(UTCdate).format('L')}</p>
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
