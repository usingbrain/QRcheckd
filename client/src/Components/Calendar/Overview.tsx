import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useCourseOverviewQuery } from '../../generated/graphql';

const overviewStyle = 'flex flex-col w-11/12 mt-4 self-center';

const historyStyle = 'grid grid-cols-6 bg-white w-full h-6/7';
const historyBoxStyle =
  'flex items-center justify-center h-32 w-32 text-center border-2 border-white hover:border-green';

const Overview: React.FC = () => {
  const navigate = useNavigate();
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

  const handleClick = (session: {
    id: number;
    createdAt: string;
    attendance: number;
  }) => {
    navigate(
      `/homepage/classes/${courseId}/${session.id}/${session.createdAt}`
    );
  };

  return (
    <div className={overviewStyle}>
      <article className="flex flex-col justify-center h-full">
        <p className="flex justify-center items-center text-4xl bg-green text-white h-16">
          Sessions Attendance
        </p>
        <section className={historyStyle}>
          {!!sessions &&
            sessions.map((session) => {
              if (session) {
                const displayDate = new Date(
                  Number(session.createdAt)
                ).toLocaleDateString();
                return (
                  <div
                    className={historyBoxStyle}
                    onClick={() => handleClick(session)}
                  >
                    <div>
                      <h5 className="font-bold text-6xl text-green">
                        {session.attendance}
                      </h5>
                      <p className="text-sm sm:text-md text-black">
                        {displayDate}
                      </p>
                    </div>
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
