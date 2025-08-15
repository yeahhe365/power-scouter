import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const Loader: React.FC = () => {
  const { t } = useTranslation();
  const [flickerText, setFlickerText] = useState("98128");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const num = Math.floor(Math.random() * 90000) + 10000;
      setFlickerText(num.toString());
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center backdrop-blur-sm z-10 overflow-hidden">
      {/* Scanning Line */}
      <div 
        className="absolute left-0 w-full h-1 bg-green-400/80" 
        style={{
          boxShadow: '0 0 10px #2fcc71, 0 0 20px #2fcc71',
          animation: 'scan-line-anim 2s cubic-bezier(0.4, 0, 0.2, 1) infinite'
        }}
      ></div>

      {/* Targeting Reticle */}
      <div 
        className="relative w-48 h-48"
        style={{
          animation: 'pulse-light 3s ease-in-out infinite'
        }}
      >
        {/* Crosshairs */}
        <div className="absolute w-full h-px bg-green-400/50 top-1/2 -translate-y-1/2"></div>
        <div className="absolute h-full w-px bg-green-400/50 left-1/2 -translate-x-1/2"></div>
        
        {/* Corner Brackets */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-green-400"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-green-400"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-green-400"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green-400"></div>
      </div>

      {/* Text */}
      <div className="absolute text-center">
        <p className="text-green-300 text-lg font-semibold tracking-widest uppercase">{t('loader.message')}</p>
        <p 
          className="text-green-400 text-3xl font-mono mt-2" 
          style={{ textShadow: '0 0 8px #2fcc71' }}
        >
          {flickerText}
        </p>
      </div>
    </div>
  );
};

export default Loader;