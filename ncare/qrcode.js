// Include the QRCode library (cdn link): https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js

import QRCode from "https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js";

const textInput = document.getElementById('text-input');
const generateBtn = document.getElementById('generate-btn');
const qrCanvas = document.getElementById('qr-canvas');

generateBtn.addEventListener('click', () => {
  const text = textInput.value;

  if (!text.trim()) {
    alert('Please enter text or a URL to generate a QR Code');
    return;
  }

  // Generate QR code and render it to the canvas
  
  QRCode.toCanvas(qrCanvas, text, (error) => {
    if (error) {
      console.error(error);
      alert('Failed to generate QR Code. Please try again.');
    }
  });
});
