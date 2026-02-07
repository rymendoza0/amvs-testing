import React from 'react';

interface LogoProps {
  className?: string;
  color?: string;
  onClick?: () => void;
}

export default function Logo() {
  return (
    <div style={{fontWeight:"bold",fontSize:"24px"}}>
      AMVS
    </div>
  );
}
