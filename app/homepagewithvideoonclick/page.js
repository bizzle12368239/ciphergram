'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './page.css';

export default function Home() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [fadeToBlackOverlay, setFadeToBlackOverlay] = useState(false);
  const [isFadingBackIn, setIsFadingBackIn] = useState(false);
  const [hasFaded, setHasFaded] = useState(false); // prevent re-trigger
  const videoRef = useRef(null);

  const handleClick = () => {
    setIsTransitioning(true);

    setTimeout(() => {
      setIsPlaying(true);
      setShowOverlay(true);

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch((e) => {
            console.error('Video failed to play:', e);
          });
        }

        setTimeout(() => {
          setShowOverlay(false);
        }, 1000);
      }, 100);
    }, 1500);
  };

  // 🔁 Monitor time to trigger fade early enough
  useEffect(() => {
    let animationFrameId;

    const checkVideoTime = () => {
      const video = videoRef.current;
      if (video && video.duration && !fadeToBlackOverlay && !hasFaded) {
        const remaining = video.duration - video.currentTime;
        if (remaining <= 1.5) {
          setFadeToBlackOverlay(true);
          setHasFaded(true); // ensure it only runs once
        }
      }
      animationFrameId = requestAnimationFrame(checkVideoTime);
    };

    if (isPlaying) {
      animationFrameId = requestAnimationFrame(checkVideoTime);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, fadeToBlackOverlay, hasFaded]);

  const handleVideoEnd = () => {
    // Hold full black for 1s, then fade back in
    setTimeout(() => {
      setIsPlaying(false);
      setIsTransitioning(false);
      setFadeToBlackOverlay(false);
      setHasFaded(false);
      setIsFadingBackIn(true);
      
      // Navigate to ironwoodinto page after fade back in
      setTimeout(() => {
        router.push('/ironwood/ironwoodintro');
      }, 1200);
    }, 1000);
  };

  useEffect(() => {
    if (isFadingBackIn) {
      const timer = setTimeout(() => {
        setIsFadingBackIn(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isFadingBackIn]);

  return (
    <>
      <div className="background" />

      <div className="content">
      

        <div className="teaser-banner">
  <img
    className="teaser-logo"
    src="Escape From Ironwood Long Black.png"
    alt="Escape From Ironwood Logo"
  />
  <h2 className="teaser-heading">COMING SOON <br /> <br />An All-New At-Home Escape Experience from Ciphergram Puzzles</h2>
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

      {/* Fade to black before video starts */}
      {isTransitioning && <div className="transition-overlay" />}

      {/* Fade out after video starts */}
      {showOverlay && <div className="overlay" />}

      {/* Fade to black 1.5s before video ends */}
      {fadeToBlackOverlay && (
  <div
    key="fade-before-end"
    style={{
      position: 'fixed',
      inset: 0,
      background: 'black',
      zIndex: 1001, // ← must be above the video
      animation: 'fadeToBlack 1.5s ease-in forwards',
      pointerEvents: 'none',
    }}
  />
)}



      {/* Fade back intro page */}
      {isFadingBackIn && (
        <div
          key="fade-back-in"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'black',
            zIndex: 997,
            animation: 'fadeFromBlack 1.2s ease-out forwards',
          }}
        />
      )}

      {isPlaying && (
        <div className="video-container">
          <video
            ref={videoRef}
            onEnded={handleVideoEnd}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 1000
            }}
            muted
            playsInline
          >
            <source src="/Ciphergram vault opening.mp4" type="video/mp4" />
          </video>
        </div>
      )}
    </>
  );
}
