import React from 'react';

export const Xicon = ({ className = '', ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg 
    width="100%" 
    height="100%" 
    viewBox="0 0 32 32" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    {...props}
  >
    <rect width="32" height="32" rx="6" fill="#D4BAFC" />
    <g transform="translate(4, 3.5)">
      <path 
        d="M16.6007 5H19.054L13.694 11.1267L20 19.462H15.0627L11.196 14.406L6.77067 19.462H4.316L10.0493 12.9087L4 5.00067H9.06267L12.558 9.622L16.6007 5ZM15.74 17.994H17.0993L8.324 6.39133H6.86533L15.74 17.994Z" 
        fill="white" 
      />
    </g>
  </svg>
);