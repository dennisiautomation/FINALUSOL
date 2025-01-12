import React from 'react';

interface LogoProps {
  className?: string;
}

export function Logo({ className = "h-8" }: LogoProps) {
  return (
    <img 
      src="https://usolenergiasolar.com.br/wp-content/uploads/2023/04/00.png" 
      alt="U-sol Energia Solar" 
      className={className}
    />
  );
}