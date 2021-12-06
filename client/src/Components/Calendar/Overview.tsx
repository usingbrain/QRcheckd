import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCourseOverviewQuery } from '../../generated/graphql';
//package for date format
import moment from 'moment';

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
      <h3>Students assigned to this course: {total}</h3>
      <section className="flex flex-row flex-wrap justify-evenly w-5/6">
        {!!sessions &&
          sessions.map((session) => {
            if (session) {
              const date = new Date(Number(session.createdAt));
              const UTCdate = date.toUTCString();
              return (
                <div className="w-1/3 p-2 text-center">
                  <Link to={`/homepage/classes/${courseId}/${session.id}`}>
                    <div>
                      <h5 className="text-lg">{session.attendance}</h5>
                      <p>{moment(UTCdate).format('L')}</p>
                    </div>
                  </Link>
                </div>
              );
            }
          })}
      </section>
    </div>
  );
};

export default Overview;
