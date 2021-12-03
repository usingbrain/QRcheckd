import React from 'react';
import QRCode from 'react-qr-code';

const QrView: React.FC<{ sessionId: number }> = ({ sessionId }) => {
  console.log('session: ', sessionId);
  const qrValue = sessionId.toString();
  console.log('QR: ', qrValue);

  return (
    // display QR code
    <main className="w-screen h-screen flex flex-row justify-center items-center">
      <section>{!!qrValue && <QRCode value={qrValue} />}</section>
      {/* maybe display a timer for how long the qr code has been open? */}
    </main>
  );
};

export default QrView;
