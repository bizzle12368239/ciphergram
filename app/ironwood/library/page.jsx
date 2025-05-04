'use client'

import React, { useState, useRef, useEffect } from 'react'
import './page.css'
import Link from 'next/link'

const HINT_GROUPS = [
  {
    title: 'The Library Inventory Card',
    hints: [
      { title: 'Hint 1 - I need a pointer...', content: 'Pluck the tail of each decimal\'s dance, find its echo in the title\'s letters, and weave those fragments into a hidden truth. The truth will unlock what\'s silently waiting to respond.' },
      { title: 'Hint 2 - I\'m really stuck...', content: 'Focus on the classification numbers\' last digits and count that many letters into each book\'s title to reveal a scrambled answer, the codeword to be sent via email to the accomplice.' },
      { title: 'Hint 3 - Ok, just give it to me!', content: 'Take the last digit of each classification number and count that many letters into the corresponding book title, revealing letters, which forms an anagram of the word SHADOW. The codeword to be sent in your email subject line. Can\'t send an email? By sending an email to Moretti\'s accomplice with the code word \'SHADOW\' in the subject line, the accomplice replies with the number you need: SIXTEEN.' }
    ]
  },
  {
    title: 'The Maze',
    hints: [
      { title: 'Hint 1 - I need a pointer...', content: 'Retreat a pace, and what flits unseen may perch upon the thread of fate.' },
      { title: 'Hint 2 - I\'m really stuck...', content: 'Trace the maze to its end and note the animal that appears. Finch has provided a guide on the noted tattoos of Moretti and his known associates that might be helpful here.' },
      { title: 'Hint 3 - Ok, just give it to me!', content: 'Solving the maze forms the image of an eagle. Matching it to the noted tattoos of Moretti\'s associates gives the number 5, the solution for this puzzle.' }
    ]
  },
  {
    title: 'The Crossword Puzzle',
    hints: [
      { title: 'Hint 1 - I need a pointer...', content: 'First thing to do is...to complete the crossword!' },
      { title: 'Hint 2 - I\'m really stuck...', content: 'Fill in the crossword, then scan the grid for number-related words that might be tucked away.' },
      { title: 'Hint 3 - Ok, just give it to me!', content: 'Once completed, the crossword hides the word TWENTY FIVE across its grid, giving you the answer 25.' }
    ]
  },
  {
    title: 'The Pencil Portrait by Moretti',
    hints: [
      { title: 'Hint 1 - I need a pointer...', content: 'Moretti\'s fresh drawing on the shelf stands out, its lines feeling deliberate.' },
      { title: 'Hint 2 - I\'m really stuck...', content: 'Look closely at the drawing for any hidden but obscure repeated shapes or patterns that might form a word.' },
      { title: 'Hint 3 - Ok, just give it to me!', content: 'The word "three" is subtly woven into the drawing multiple times, revealing 3 as the answer.' }
    ]
  },
  {
    title: 'The Cryptic Symbols on Inventory Card',
    hints: [
      { title: 'Hint 1 - I need a pointer...', content: 'Check your decoding tools from Finch, one of those might come in handy here.' },
      { title: 'Hint 2 - I\'m really stuck...', content: 'The symbols resemble a pigpen cipher—match each one to a letter using the codebreaking tool with similar shapes provided by Finch to decode the message.' },
      { title: 'Hint 3 - Ok, just give it to me!', content: 'Decoding the pigpen cipher symbols reveals the word TWELVE, corresponding to the number 12, your answer for this puzzle.' }
    ]
  },
  {
    title: 'The Clock Icon',
    hints: [
      { title: 'Hint 1 - I need a pointer...', content: 'In the captured scene, a timekeeper looms - its frozen hands might hold more than just the hour.' },
      { title: 'Hint 2 - I\'m really stuck...', content: 'Note the time shown on the clock in the room\'s photo - the time it\'s showing is the answer you may need.' },
      { title: 'Hint 3 - Ok, just give it to me!', content: 'The clock in the library photo shows 7pm, making 7 the answer for this clue.' }
    ]
  },
  {
    title: 'The 7 Icons',
    hints: [
      { title: 'Hint 1 - I need a pointer...', content: 'Once you\'ve completed all the puzzles, you now have 7 numbers. Each puzzle should relate to one of the images on the icon card. Finch has asked you to find out how the inmates are planning their escape. Are there any clues or tools you\'ve not utilised yet in the Library?' },
      { title: 'Hint 2 - I\'m really stuck...', content: 'When you\'ve completed each puzzle you now have 7 numbers. There\'s a scrap of paper that says 12 = A, this might be what you need to decode your 7 numbers.' },
      { title: 'Hint 3 - Ok, just give it to me!', content: 'Each of the numbers from the puzzles you’ve solved correspond to a letter. So the number 12 = A, number 13 = B etc. If you apply these to your numbers, the word ‘AIR VENT’ is revealed, the means of escape in the laundry room!' }
    ]
  }
]

export default function GuessCodewordPage() {
  const [showIntro, setShowIntro] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [input, setInput] = useState('')
  const [feedback, setFeedback] = useState('')
  const [incorrectGuesses, setIncorrectGuesses] = useState(0)
  const [expandedHints, setExpandedHints] = useState(
    HINT_GROUPS.map(group => group.hints.map(() => false))
  )
  const [loading, setLoading] = useState(false)
  const [showVideo, setShowVideo] = useState(true)
  const [fadeOutVideo, setFadeOutVideo] = useState(false)
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0)
  const [isNavigating, setIsNavigating] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const inputRef = useRef(null)
  const audioRef = useRef(null)

  const correctAnswers = ['airvent', 'air vent']

  const handleSubmit = () => {
    if (loading) return
    setLoading(true)

    setTimeout(() => {
      const normalised = input.trim().toLowerCase().replace(/\s+/g, '')
      const isCorrect = correctAnswers.some(answer => normalised === answer.replace(/\s+/g, ''))
      setFeedback(isCorrect
        ? '✅ Correct! Finch has a message for you...'
        : '❌ Incorrect! This does not appear to be the correct means of escape...'
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
    }, 500)
  }

  useEffect(() => {
    // Only try to play audio after video is hidden
    if (!showVideo && audioRef.current) {
      audioRef.current.volume = 0.3
      const playPromise = audioRef.current.play()
      console.log('Attempting to play audio...')
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => console.log('Audio started playing successfully'))
          .catch(error => {
            console.error('Audio playback error:', error)
          })
      }
    }
  }, [showVideo]) // Run this effect when showVideo changes

  const setCurrentGroupIndexAndResetHints = (index) => {
    setIsNavigating(true)
    setCurrentGroupIndex(index)
    setTimeout(() => setIsNavigating(false), 300)
  }

  const currentGroup = HINT_GROUPS[currentGroupIndex]

  return (
    <>
      {showIntro && (
        <div className="intro-overlay">
          <button className="begin-button" onClick={() => {
            setShowIntro(false)
            setShowContent(true)
          }}>
            ENTER THE OLD LIBRARY
          </button>
        </div>
      )}
      
      {showContent && (
        <>
          {showVideo && (
            <div className={`video-overlay ${fadeOutVideo ? 'fade-out' : ''}`}>
              <video
                key="intro-video"
                className="intro-video"
                autoPlay
                playsInline
                muted
                onEnded={handleVideoEnd}
              >
                <source src="/The Library intro.mp4" type="video/mp4" />
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
                ref={audioRef}
                src="/Library room background audio.mp3"
                loop
                preload="auto"
                autoPlay
                onError={(e) => console.error('Audio loading error:', e)}
                onCanPlay={() => console.log('Audio is ready to play')}
                onPlay={() => console.log('Audio play event triggered')}
              />
              <div className="guess-wrapper fade-in-content">
                <div className="guess-container">
                  <img
                    className="logo"
                    src="/Escape From Ironwood Long Orange.png"
                    alt="Escape From Ironwood Logo"
                  />
                  <h2 className="section-heading">Part II<br />- The Old Library -</h2>
                  <div className="page-subtitle">
                    Open the envelope marked <strong>"The Old Library"</strong> to get your instructions from Finch.
                    <br /><br /> When you think you have the Escape Method, type the answer below. 
                    <br /><br /> 
                    <div className="picker-label">Escape Method:</div>

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
                  <p>Congratulations once again on successfully completing Part II of your investigation!</p>

                  <p>Your efforts to crack the code in the Old Library have brought us much closer to understanding the full extent of the escape plot.</p>

                  <p>But now I have urgent news regarding the final stage of the investigation. The atmosphere inside Ironwood is becoming increasingly tense, and the guards have intercepted a series of strange developments that suggest the inmates are ramping up their plans.</p>

                  <p>The final stage of your investigation takes you to the Recreation Room, where Gavin Moretti is spending an increased amount of time playing cards with various inmates.</p>

                  <p>What might appear as idle pastime could be a cover for something far more calculated—perhaps a method of passing messages or finalising details right under our noses.</p>

                  <p>You've already figured out the where and how the inmates are planning their escape.</p>

                  <p>Your mission now is to solve these new clues to work out the <b>when</b>. The pieces are starting to fall into place, but time is running out.</p>

                  <p>I trust that you will be able to make sense of these seemingly unrelated events, help us get one step closer to foiling this plot, and avoid risking the safety of our wider community.</p>
                  <p>Yours in continued urgency,<br /><br />
                    Warden Douglas Finch<br />
                    Ironwood Correctional Facility
                  </p>
                  <img src="/Finch Signature.png" alt="Warden Finch's Signature" style={{ maxWidth: '200px', marginTop: '1rem' }} />
                </div>
                <Link href="/ironwood/recroom">
                  <button className="success-button">
                    Continue to the Rec Room
                  </button>
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
