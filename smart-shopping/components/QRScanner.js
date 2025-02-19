import { useState } from 'react';
import QrScanner from 'qr-scanner';
export default function QRScanner({ onScan }) {
  const [result, setResult] = useState(null);
  const handleScan = async (file) => {
    const qrResult = await QrScanner.scanImage(file);
    setResult(qrResult);
    onScan(qrResult);
  };
  return (
    <div>
      <input type='file' onChange={(e) => handleScan(e.target.files[0])} />
      {result && <p>Scanned: {result}</p>}
    </div>
  );
}