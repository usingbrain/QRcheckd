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
  console.log('seshBtn');
  const [running, setRunning] = useState(false);
  const dispatch = useDispatch();
  const session = useSelector((state: { session: Session }) => state.session);

  const btnText = running ? 'end session' : 'generate QR code';

  const [, createSession] = useCreateSessionMutation();

  async function newSession(courseId: number) {
    const response = await createSession({ courseId });
    if (response.error) {
    } // TODO: handle error
    const sessionData = response.data?.createSession?.data;
    console.log('response from DB', sessionData);
    if (sessionData) {
      console.log('action return: ', setSession(sessionData));
      dispatch(setSession(sessionData));
    }
  }

  function startSession() {
    // create new session
    newSession(courseId);
    // if successsful -->
    setRunning(true);
  }
  console.log('session: ', session);

  return (
    <div className={sessionBtnStyle}>
      {session ? session.id : ''}
      <button className={btnTextStyle} onClick={startSession}>
        {btnText}
      </button>
      {running && (
        <Portal>
          <QrView sessionId={session.id} />
        </Portal>
      )}
    </div>
  );
};

export default SessionBtn;
