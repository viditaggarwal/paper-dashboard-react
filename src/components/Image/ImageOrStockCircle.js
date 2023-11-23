import React, { useState, useEffect, useRef } from 'react';

const ImageOrStockCircle = ({ ticker, logoUrl, imageClassName }) => {
  const [imgError, setImgError] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (imgError && canvasRef.current && ticker) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = 100;
      canvas.height = 100;

      // Create a linear gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#3C53F4');
      gradient.addColorStop(1, '#9f9f9f');

      // Apply the gradient and draw the circle
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(50, 50, 50, 0, 2 * Math.PI);
      ctx.fill();

      // Draw the text
      ctx.fillStyle = 'white';
      ctx.font = '48px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(ticker.charAt(0).toUpperCase(), 50, 50);
    }
  }, [imgError, ticker]);

  return (
    imgError ? 
      <canvas ref={canvasRef} className={imageClassName} /> :
      <img 
        src={logoUrl} 
        onError={() => setImgError(true)} 
        alt={`${ticker} Logo`} 
        className={imageClassName}
      />
  );
};

export default ImageOrStockCircle;
