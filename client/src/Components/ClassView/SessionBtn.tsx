import React, { useState } from 'react';
import {
  useCreateSessionMutation,
  useEndSessionMutation,
} from '../../generated/graphql';
import { useSelector, useDispatch } from 'react-redux';
import { setSession } from '../../store/actions';
import Session from '../../Types/session';

const sessionBtnStyle =
  'flex justify-center bg-green hover:bg-green-light py-4 rounded-sm font-bold text-lg mb-4 h-16';
const btnTextStyle = 'font-bold text-lg text-white';

const SessionBtn: React.FC<{ courseId: number }> = ({ courseId }) => {
  const [running, setRunning] = useState(false);
  const [, createSession] = useCreateSessionMutation();
  const [, endSession] = useEndSessionMutation();
  const dispatch = useDispatch();
  const session = useSelector(
    (state: { session: Session | null }) => state.session
  );

  const btnText = running ? 'End Session' : 'Start Session';

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
      <button className={btnTextStyle} onClick={handleClick}>
        {btnText}
      </button>
    </div>
  );
};

export default SessionBtn;
