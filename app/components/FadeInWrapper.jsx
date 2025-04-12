'use client';
import { useEffect, useState } from 'react';

export default function FadeInWrapper({ children }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 1.2s ease-in-out',
      }}
    >
      {children}
    </div>
  );
}
