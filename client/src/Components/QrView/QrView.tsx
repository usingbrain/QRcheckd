import React from 'react';
import QRCode from 'react-qr-code';

const QrView: React.FC<{ sessionId: number }> = ({ sessionId }) => {
  // generate QR code
  // const qrValue = session;
  const qrValue = 'session';

  return (
    // display QR code
    <main className="w-screen h-screen flex flex-row justify-center items-center">
      <section>
        <QRCode value={qrValue} />
      </section>
      {/* maybe display a timer for how long the qr code has been open? */}
    </main>
  );
};

export default QrView;
