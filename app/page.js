'use client';
import { useRouter } from 'next/navigation';
import './globals.css';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    document.title = 'Ciphergram - At-Home Escape Games'
  }, [])

  const handleClick = () => {
    router.push('/ironwood/ironwoodintro');
  };

  return (
    <>
      <div className="background" />

      <div className="content page-fade-in">
        <div className="teaser-banner">
          <img
            className="teaser-logo"
            src="Escape From Ironwood Long Black.png"
            alt="Escape From Ironwood Logo"
          />
          <h2 className="teaser-heading">- COMING SOON !!! -<br /><br />An All-New At-Home Escape Experience from Ciphergram Puzzles</h2>
          <br />  
          <button onClick={handleClick}>
            LEARN MORE <br />
          </button>
        </div>
      </div>

      <footer
        style={{
          position: 'absolute',
          bottom: '1rem',
          width: '100%',
          textAlign: 'center',
          color: '#fff',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
          fontFamily: 'var(--font-geist-sans)',
          fontSize: '0.9rem'
        }}
      >
      </footer>
    </>
  );
}
