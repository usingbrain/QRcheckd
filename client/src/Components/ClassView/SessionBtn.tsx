import React, { useState } from 'react';
import {
  useCreateSessionMutation,
  useEndSessionMutation,
} from '../../generated/graphql';
import { useSelector, useDispatch } from 'react-redux';
import { setSession } from '../../store/actions';
import Session from '../../Types/session';

const sessionBtnStyle =
  'flex justify-center bg-green hover:bg-green-light py-4 rounded-sm text-lg mb-4 h-16 shadow-2xl';
const btnTextStyle = 'text-lg text-white';

const SessionBtn: React.FC<{ courseId: number }> = ({ courseId }) => {
  const [running, setRunning] = useState(false);
  const [, createSession] = useCreateSessionMutation();
  const [, endSession] = useEndSessionMutation();
  const dispatch = useDispatch();
  const session = useSelector(
    (state: { session: Session | null }) => state.session
  );

  const btnText = running ? 'End Session' : 'Start Session';
  const smallBtn = running ? 'End' : 'Start';

  const createSessionDB = async () => {
    // create new session in DB
    const response = await createSession({ courseId });
    const sessionData = response.data?.createSession.data;
    // dispatch session data
    if (sessionData) {
      dispatch(setSession(sessionData));
      // open QR code in new window
      window.open(
        window.location.origin + `/attend/${sessionData.id}`,
        '_blank',
        'toolbar=0,location=0,menubar=0, resizable=yes, width=500, height=500'
      );
    }
  };

  const endSessionDB = async () => {
    if (session) {
      const sessionId = session.id;
      // close session in DB
      const response = await endSession({ sessionId });
      const result = response.data?.endSession.data;
      if (result) {
        dispatch(setSession(null));
      }
    }
  };

  const handleClick = async () => {
    if (!running) {
      await createSessionDB();
    } else {
      // TODO: close Session
      await endSessionDB();
    }
    // toggle Button
    setRunning(!running);
  };

  return (
    <div className={sessionBtnStyle}>
      <button
        className={btnTextStyle}
        onClick={handleClick}
        disabled={!!session?.course && !(session?.course === courseId)}
      >
        <p className='invisible md:visible w-0 md:w-full flex justify-center h-0 md:h-full'>
          {btnText}
        </p>
        <p className='visible md:invisible md:w-0 md:h-0'>{smallBtn}</p>
      </button>
    </div>
  );
};

export default SessionBtn;
