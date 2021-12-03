import React, { useState, useEffect } from 'react';
import { useCreateSessionMutation } from '../../generated/graphql';
import { useSelector, useDispatch } from 'react-redux';
import { setSession } from '../../store/actions';
import Session from '../../Types/session';

const sessionBtnStyle =
  'bg-green hover:bg-turqoise py-4 px-8 rounded font-bold text-lg mb-4';
const btnTextStyle = 'font-bold text-lg';

const SessionBtn: React.FC<{ courseId: number }> = ({ courseId }) => {
  console.log('session button');
  const [running, setRunning] = useState(false);
  const [, createSession] = useCreateSessionMutation();
  const dispatch = useDispatch();
  const session = useSelector(
    (state: { session: Session | null }) => state.session
  );

  useEffect(() => {
    console.log('use effect: ', session);
    // render QR
    if (session) {
      console.log('passing to new window: ', session);
      window.open(
        window.location.origin + `/${session.id}`,
        '_blank',
        'toolbar=0,location=0,menubar=0, resizable=yes, width=500, height=500'
      );
    }
  }, [session]);

  const btnText = running ? 'end' : 'start';

  const createSessionDB = async () => {
    // create new session in DB
    const response = await createSession({ courseId });
    const sessionData = response.data?.createSession.data;
    console.log('sessionData: ', sessionData);
    // dispatch session data
    if (sessionData) {
      const result = dispatch(setSession(sessionData));
      console.log('dispatched: ', result);
    }
  };

  const handleNewSession = async () => {
    console.log('inside handler');
    if (!running) {
      console.log('inside if runnning');
      await createSessionDB();
    }
    // TODO: close Session
    // toggle Button
    setRunning(!running);
  };

  return (
    <div className={sessionBtnStyle}>
      <button className={btnTextStyle} onClick={handleNewSession}>
        {btnText}
      </button>
    </div>
  );
};

export default SessionBtn;
