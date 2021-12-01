import React from 'react';
import QRCode from 'react-qr-code';

const QrView: React.FC<{ session: number }> = ({ session }) => {
  // generate QR code
  // const qrValue = session;
  const qrValue = 'session';

  return (
    // display QR code
    <main>
      <section>
        <QRCode value={qrValue} />
      </section>
    </main>
  );
};

export default QrView;
