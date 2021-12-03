import React from 'react';
import QRCode from 'react-qr-code';

const QrView: React.FC<{ sessionId: number }> = ({ sessionId }) => {
  console.log('session: ', sessionId);
  const qrValue = sessionId.toString();
  console.log('QR: ', qrValue);

  // style for separate window: className="w-screen h-screen flex flex-row justify-center items-center"
  return (
    // display QR code
    <main>
      <section>{!!qrValue && <QRCode value={qrValue} />}</section>
      {/* maybe display a timer for how long the qr code has been open? */}
    </main>
  );
};

export default QrView;
