'use client'

import React, { useState, useRef, useEffect } from 'react'
import './page.css'
import Link from 'next/link'

const HINT_GROUPS = [
  {
    title: 'The Photo of Moretti & Accomplices',
    hints: [
      { title: 'Hint 1 - I need a pointer...', content: 'Look back at Moretti’s prisoner profile again, wasn’t something mentioned about a strange symbol?' },
      { title: 'Hint 2 - I\'m really stuck...', content: 'Study Moretti in the center of the photo, particularly his hand, where a tattoo might reveal something significant. Finch has provided a guide on the noted tattoos of Moretti and his known associates that might be helpful here.' },
      { title: 'Hint 3 - Ok, just give it to me!', content: 'In the photo of Moretti, a tattoo on his hand, noted in his profile, cleverly hides the number 7 within a butterfly design, giving you the answer you’re looking for. ' }
    ]
  },
  {
    title: 'The Audio Recording of the Prison',
    hints: [
      { title: 'Hint 1 - I need a pointer...', content: 'The guards’ recording of strange repetitive and rhythmic tapping noises, feels like it holds patterns worth exploring.' },
      { title: 'Hint 2 - I\'m really stuck...', content: 'Listen to the tapping sounds and break them into high and low sounds, then use the correct code-breaking tool provided by Finch to translate the sequence into a codeword which may link to what you need. Finch has provided a guide on the noted tattoos of Moretti and his known associates that might be helpful here.' },
      { title: 'Hint 3 - Ok, just give it to me!', content: 'The audio’s tapping is in morse code, and instead of long and short taps, the prisoners are using high and low sounding taps. Using the decoder from your code-breaking toolkit, separate each pattern in its high and low taps using the chart. Each individual pattern reveals a letter, and all the letters form the word STALLION, which corresponds to the horse icon key in your toolkit, valued at 8, the answer you are looking for. ' }
    ]
  },
  {
    title: 'The 6 Icons',
    hints: [
      { title: 'Hint 1 - I need a pointer...', content: 'A detailed layout among your belongings draws your attention, its criss-crossed lines waiting for the right markers to reveal their purpose.' },
      { title: 'Hint 2 - I\'m really stuck...', content: 'Take the answers from each of the six puzzles you’ve solved in this room, each of these should relate to one of the 6 images on the icon card - might they pair with a blueprint already in your hands, tracing a path unseen?' },
      { title: 'Hint 3 - Ok, just give it to me!', content: 'The six numbers from the puzzle are coordinates. The order of the numbers is revealed by the order of the puzzles on the icon card. Plotting 348, 967 on the prison blueprint reveals the Laundry Room, the escape’s starting point.' }
    ]
  },
  {
    title: 'The Torn Letter',
    hints: [
      { title: 'Hint 1 - I need a pointer...', content: 'Gather the torn pieces and fit them together like a puzzle, does anything stand out?' },
      { title: 'Hint 2 - I\'m really stuck...', content: 'Standing back might help, look at the whole letter pieced together. Notice any differences in the ink colour across the page?' },
      { title: 'Hint 3 - Ok, just give it to me!', content: 'Once the letter is reassembled, step back to see some words in a lighter ink shade, forming the number 3 across the page, the solution to this puzzle.' }
    ]
  },
  {
    title: 'The Caesar’s Palace Postcard',
    hints: [
      { title: 'Hint 1 - I need a pointer...', content: 'Where the palace boasts its rank of 7, a cipher guards the tongue of ink - beyond each silent void, twist the trailing runes by the wonder’s count, and truth shall rise from the postcard’s veil.' },
      { title: 'Hint 2 - I\'m really stuck...', content: 'Check the number on the postcard’s front and use it to shift the letters after the unusual gaps in the message on the back to uncover a hidden word.' },
      { title: 'Hint 3 - Ok, just give it to me!', content: 'The postcard’s front refers to the number 7, indicating a Caesar Cipher with a shift of 7. On the back, there are three gaps in the words “glitz” (before the letter L) , “remember” (before the letter B), and “enquire” (before the letter Q). Taking those letters, and shifting them in the alphabet by 7 gives you the letters S, I, and X, - the number 6, your answer to this puzzle.' }
    ]
  },
  {
    title: 'The Paper with Markings',
    hints: [
      { title: 'Hint 1 - I need a pointer...', content: 'Where the wind meets its wings; in the shadow of the crease, a secret sings - bend the sheet as the sky demands, and the figure shall rise from folded hands.' },
      { title: 'Hint 2 - I\'m really stuck...', content: 'The inmates are folding paper 3 times, then in half to make a paper airplane. What does the final shape reveal?' },
      { title: 'Hint 3 - Ok, just give it to me!', content: 'You need to fold the paper into a paper airplane in the format the inmates are using. Start by folding the two corners in to meet at the middle. Repeat this for a total of three times, before folding the entire plane in half. Open up the wings as if ready to throw the plane - the number 4 is revealed on top in plain sight, your answer to this clue.' }
    ]
  }
]

export default function GuessCodewordPage() {
  const [input, setInput] = useState('')
  const [feedback, setFeedback] = useState('')
  const [incorrectGuesses, setIncorrectGuesses] = useState(0)
  const [expandedHints, setExpandedHints] = useState(
    HINT_GROUPS.map(group => group.hints.map(() => false))
  )
  const [loading, setLoading] = useState(false)
  const [showVideo, setShowVideo] = useState(true)
  const [fadeOutVideo, setFadeOutVideo] = useState(false)
  const [playAmbiance, setPlayAmbiance] = useState(false)
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0)
  const [isNavigating, setIsNavigating] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [videoStarted, setVideoStarted] = useState(false)
  const inputRef = useRef(null)
  const ambianceRef = useRef(null)
  const tappingSoundRef = useRef(null)
  const resumeTimeoutRef = useRef(null)
  const fadeIntervalRef = useRef(null)

  const correctAnswers = ['laundry', 'laundryroom', 'the laundry room', 'laundry room',  'the laundry']

  const handleSubmit = () => {
    if (loading) return
    setLoading(true)

    setTimeout(() => {
      const normalised = input.trim().toLowerCase().replace(/\s+/g, '')
      const isCorrect = correctAnswers.some(answer => normalised === answer.replace(/\s+/g, ''))
      setFeedback(isCorrect
        ? '✅ Correct! Finch has a message for you...'
        : '❌ Incorrect! This does not appear to be the correct location...'
      )
      if (isCorrect) {
        setShowSuccess(true)
      }
      if (!isCorrect) setIncorrectGuesses(prev => prev + 1)
      setLoading(false)
    }, 1500)
  }

  const toggleHint = (hintIndex) => {
    setExpandedHints(prev => {
      const newHints = prev.map(group => [...group])
      newHints[currentGroupIndex][hintIndex] = !newHints[currentGroupIndex][hintIndex]
      return newHints
    })
  }

  const handleVideoEnd = () => {
    setFadeOutVideo(true)
    setTimeout(() => {
      setShowVideo(false)
      setPlayAmbiance(true)
    }, 1000)
  }

  const setCurrentGroupIndexAndResetHints = (index) => {
    setIsNavigating(true)
    setCurrentGroupIndex(index)
    setTimeout(() => setIsNavigating(false), 300)
  }

  const currentGroup = HINT_GROUPS[currentGroupIndex]

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  const fadeInAmbiance = () => {
    if (!ambianceRef.current || !playAmbiance) return;
    
    ambianceRef.current.volume = 0;
    ambianceRef.current.play();
    
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }
    
    let volume = 0;
    fadeIntervalRef.current = setInterval(() => {
      if (volume < 0.3) {
        volume += 0.02;
        ambianceRef.current.volume = volume;
      } else {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
    }, 50);
  };

  const handleTappingSoundPlay = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
    if (ambianceRef.current) {
      ambianceRef.current.pause();
    }
  };

  const handleTappingSoundPause = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
    resumeTimeoutRef.current = setTimeout(() => {
      fadeInAmbiance();
      resumeTimeoutRef.current = null;
    }, 5000);
  };

  const handleTappingSoundEnded = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
    fadeInAmbiance();
  };

  return (
    <>
      {showVideo && (
        <div className={`video-overlay ${fadeOutVideo ? 'fade-out' : ''}`}>
          {!videoStarted ? (
            <div className="play-button-wrapper" style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
              textAlign: 'center'
            }}>
              <h1 style={{
                fontFamily: 'Courier New, Courier, monospace',
                fontSize: '3rem',
                color: 'white',
                marginBottom: '2rem',
                letterSpacing: '2px'
              }}>BARREN PLAINS<br />POLICE DEPT <br /><br />SECURE PORTAL</h1>
              <button 
                onClick={() => {
                  const video = document.querySelector('.intro-video');
                  if (video) {
                    video.play();
                    setVideoStarted(true);
                  }
                }}
                className="submit-button"
              >
                ENTER
              </button>
            </div>
          ) : null}
          <video
            key="intro-video"
            className="intro-video"
            playsInline
            onEnded={handleVideoEnd}
          >
            <source src="/prison cell intro.mp4" type="video/mp4" />
          </video>
          <div className="skip-wrapper">
            <button className="skip-intro" onClick={handleVideoEnd}>
              Skip Intro
            </button>
          </div>
        </div>
      )}

      {!showVideo && (
        <>
          <audio
            ref={ambianceRef}
            autoPlay={playAmbiance}
            loop
            src="/prison cell ambiance 1.mp3"
            volume={0.3}
          />
          <div className="guess-wrapper fade-in-content">
            <div className="guess-container">
              <img
                className="logo"
                src="/Escape From Ironwood Long Orange.png"
                alt="Escape From Ironwood Logo"
              />
              <h2 className="section-heading">Part I<br />- The Prison Cell -</h2>
              <div className="page-subtitle">
                Open the envelope marked <strong>"The Prison Cell"</strong> to get your instructions from Finch.
                <br /><br />
       When you think you have the answer, type the Escape Location below.  <br /><br />
                <div className="picker-label">Escape Location:</div>
                <textarea
                  ref={inputRef}
                  className="input-box"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSubmit()
                    }
                  }}
                  placeholder=". . ."
                  style={{ fontSize: '1.3rem' }}
                />
                <br />  
                <button
                  className="submit-button"
                  onClick={handleSubmit}
                  disabled={loading || input.trim() === ''}
                >
                  {loading ? <span className="spinner"></span> : 'Submit'}
                </button>

                {feedback && !showSuccess && <div className="feedback">{feedback}</div>}
                <div className="guess-counter">Incorrect Guesses: {incorrectGuesses}</div>
                <br />
                The secret audio recording, taken from inside Ironwood is available here:
                <br />
                
                <div className="audio-player-container">
                  <audio 
                    ref={tappingSoundRef}
                    controls 
                    className="audio-player"
                    src="/Tapping Sounds.mp3"
                    onPlay={handleTappingSoundPlay}
                    onPause={handleTappingSoundPause}
                    onEnded={handleTappingSoundEnded}
                  >
                    Your browser does not support the audio element.
                  </audio>
                </div><br />
                <div className="help-text">
                  Need some help?<br /><br />
                  Select the puzzle you're stuck on to get a hint. If you're really stuck, check the correct answer in the last hint.
                </div>
              </div>

              <div className="hint-group-title">{currentGroup.title}</div>
              <div className="hint-nav-buttons">
                <button 
                  className="hint-nav-button"
                  onClick={() => setCurrentGroupIndexAndResetHints(currentGroupIndex > 0 ? currentGroupIndex - 1 : HINT_GROUPS.length - 1)}
                  style={{ padding: '1rem 2rem' }}
                >
                  {'< Back'}
                </button>
                <button 
                  className="hint-nav-button"
                  onClick={() => setCurrentGroupIndexAndResetHints((currentGroupIndex + 1) % HINT_GROUPS.length)}
                  style={{ padding: '1rem 2rem' }}
                >
                  {'Next >'}
                </button>
              </div>

              <div className="hints">
                {currentGroup.hints.map((hint, i) => (
                  <div key={i} className={`hint-card ${expandedHints[currentGroupIndex][i] ? 'open' : ''}`} onClick={() => toggleHint(i)}>
                    <div className="hint-card-header">
                      <div className="hint-left">
                        <span className="hint-icon">📌</span>
                        <span className="hint-title">{hint.title}</span>
                      </div>
                      <span className="hint-toggle">
                        {expandedHints[currentGroupIndex][i] ? '−' : '+'}
                      </span>
                    </div>
                    <div className={`hint-card-body-wrapper ${expandedHints[currentGroupIndex][i] ? 'open' : ''} ${isNavigating ? 'no-transition' : ''}`}>
                      <div className="hint-card-body">{hint.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {showSuccess && (
        <div className="success-overlay">
          <div className="success-content">
            <div className="success-message">
              {feedback}
            </div>
            <div className="success-details">
            <img src="/Header info.png" alt="Header Information" style={{ width: '70%', marginBottom: '0.1rem' }} />
            <p>Congratulations!</p>

<p>You have successfully completed the first phase of your investigation, and I must commend you on your sharp instincts and diligence. Thanks to your efforts, we've learned invaluable information about the inmates' escape plans.</p>

<p>However, the situation is far from over, and it is critical that we stay ahead of these individuals.</p>

<p>I'm writing to brief you on the next stage of your investigation—one that will bring you closer to uncovering the full scope of the escape plot. You've figured out where their escape is planned; now you need to work out <b>how</b> Moretti is orchestrating it.</p>

<p>Part II of the investigation leads you to the Prison's Old Library, a place where we have noticed some unusual activity.</p>

<p>We've got reason to believe Moretti's been using the library computer to email a contact outside these walls, someone feeding critical information to the inmates for their escape plan.</p>

<p>In the library computer's inbox, we've found various draft emails — totally blank except for the recipient's address, <b style={{ fontSize: '1.1em', letterSpacing: '0.05em' }}>eagle@silentpartner.vip</b>. It's suspicious, and I'm certain it's tied to their scheme. You need to take a closer look at this, and potentially make contact under the guise of Moretti.</p>

<p>I trust that your mind will be sharp enough to piece everything together, and that you'll be able to infiltrate the inmates' communications before they can make their next move.</p>

<p>As before, once you think you have the answer use the secure portal to check your answer or get further assistance.</p>
<p>Yours in continued urgency,<br />  <br />
              Warden Douglas Finch<br />
        
            Ironwood Correctional Facility</p>
              <img src="/Finch Signature.png" alt="Warden Finch's Signature" style={{ maxWidth: '200px', marginTop: '1rem' }} />
          
            </div>
          

<Link href="/ironwood/library">
  <button className="success-button">
    Continue to the Old Library
  </button>
</Link>

          </div>
        </div>
      )}
    </>
  )
}
//recommit new intro video //