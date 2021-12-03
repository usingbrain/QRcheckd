import React, { useState } from 'react';
import { useCreateSessionMutation } from '../../generated/graphql';
import { useSelector, useDispatch } from 'react-redux';
import { setSession } from '../../store/actions';
import Session from '../../Types/session';
import QrView from '../QrView/QrView';
import { Portal } from '../QrView/Portal';

const sessionBtnStyle =
  'bg-green hover:bg-turqoise py-4 px-8 rounded font-bold text-lg mb-4';
const btnTextStyle = 'font-bold text-lg';

const SessionBtn: React.FC<{ courseId: number }> = ({ courseId }) => {
  const [running, setRunning] = useState(false);
  const [, createSession] = useCreateSessionMutation();
  const dispatch = useDispatch();
  const session = useSelector(
    (state: { session: Session | null }) => state.session
  );

  const btnText = running ? 'end' : 'start';

  const handleNewSession = async () => {
    if (!running) {
      // create new session in DB
      const response = await createSession({ courseId });
      const sessionData = response.data?.createSession.data;
      // dispatch session data
      if (sessionData) dispatch(setSession(sessionData));
      // render QR
    }
    // TODO: close Session
    // toggle Button
    setRunning(!running);
  };

  return (
    <div>
      <div className={sessionBtnStyle}>
        <button className={btnTextStyle} onClick={handleNewSession}>
          {btnText}
        </button>
      </div>
      {running && session && (
        // <Portal>
        <QrView sessionId={session.id} />
        // </Portal>
      )}
    </div>
  );
};

export default SessionBtn;
