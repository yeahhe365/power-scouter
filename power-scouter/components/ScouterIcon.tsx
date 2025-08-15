
import React from 'react';

interface ScouterIconProps {
  className?: string;
}

const ScouterIcon: React.FC<ScouterIconProps> = ({ className }) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" strokeOpacity="0.5" />
      <path d="M12 5a7 7 0 100 14 7 7 0 000-14z" />
      <path d="M12 9a3 3 0 100 6 3 3 0 000-6z" strokeOpacity="0.7" />
      <path d="M2 12h3" />
      <path d="M19 12h3" />
      <path d="M12 2v3" />
      <path d="M12 19v3" />
    </svg>
  );
};

export default ScouterIcon;
