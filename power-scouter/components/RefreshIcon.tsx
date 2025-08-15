
import React from 'react';

interface RefreshIconProps {
  className?: string;
}

const RefreshIcon: React.FC<RefreshIconProps> = ({ className }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="23 4 23 10 17 10"></polyline>
    <polyline points="1 20 1 14 7 14"></polyline>
    <path d="M20.49 9A9 9 0 0 0 7.54 5.49"></path>
    <path d="M3.51 15A9 9 0 0 0 16.46 18.51"></path>
  </svg>
);

export default RefreshIcon;
