'use client'

import React, { useState, useRef, useEffect } from 'react'
import './page.css'
import Link from 'next/link'

const HINT_GROUPS = [
  {
    title: 'The Playing Cards and Riddle',
    hints: [
      { title: 'Hint 1 - I need a pointer...', content: 'Among the fallen suits of jest, the inked voice speaks in veiled request.' },
      { title: 'Hint 2 - I\'m really stuck...', content: 'Read the poem carefully to identify which card details - like suits or numbers - it highlights. Towards the end it suggests what to do with them…' },
      { title: 'Hint 3 - Ok, just give it to me!', content: 'The poem guides you to select cards (Queen, 4, 5, Ace, 5) whose numbers summed (10 + 4 + 5 + 1 + 5 = 25) spell out the escape day, the 25th. The room introduction card points you to add-up the cards.' }
    ]
  },
  {
    title: 'The Sudoku Puzzle',
    hints: [
      { title: 'Hint 1 - I need a pointer...', content: 'There\'s something about the adjusted grid - it hints at more than just idle play. Might be worth seeing through.' },
      { title: 'Hint 2 - I\'m really stuck...', content: 'Solve the sudoku puzzle in the magazine, you need to identify the numbers in the bolded squares.' },
      { title: 'Hint 3 - Ok, just give it to me!', content: 'Completing the sudoku puzzle reveals the numbers 1 and 5 in the bolded cells, the answer, forming part of the escape\'s hour, 15.' }
    ]
  },
  {
    title: 'The Chalkboard',
    hints: [
      { title: 'Hint 1 - I need a pointer...', content: 'In the Rec Room where players dare, chalk marks battle in open air, but one line\'s gone, erased or missed - what\'s the number that should exist?' },
      { title: 'Hint 2 - I\'m really stuck...', content: 'Examine the tally marks and find the missing score by working out the rules of the number sequence.' },
      { title: 'Hint 3 - Ok, just give it to me!', content: 'The chalkboard\'s tallies are 5, 7, ?, 19, 31, 50. This is a number sequence pattern. The pattern is to add the previous two numbers together to get the next number in the sequence: 5 + 7 = 12, 12 + 19 = 31, etc. Your missing number, and so the answer you need, is 12.' }
    ]
  },
  {
    title: 'The Dominoes Game',
    hints: [
      { title: 'Hint 1 - I need a pointer...', content: 'I\'m played in turns, with tiles in hand, matching ends is how I stand. But place me wrong, the chain breaks fast - what simple rule have you surpassed?' },
      { title: 'Hint 2 - I\'m really stuck...', content: 'Check the dominoes for pairs that don’t follow the rules of dominoes (where the numbers on touching sides differ). Check the introduction card for a clue for what to do with them. ' },
      { title: 'Hint 3 - Ok, just give it to me!', content: 'Find the pieces in the game where the numbers don’t match. Using the clue of “add-up” on the introduction card, add these together next: 9 + 2 + 3 + 1 + 4+ 3 = 22. This provides 22 as the number you’re looking for.' }
    ]
  },
  {
    title: 'The 4 Icons',
    hints: [
      { title: 'Hint 1 - I need a pointer...', content: 'Once you\'ve completed all the puzzles, you now have 4 numbers, each number relating to one of the 4 images on the icon card. Finch has asked you to find out the date and time the inmates are planning their escape.' },
      { title: 'Hint 2 - I\'m really stuck...', content: 'When you\'ve completed each puzzle you now have 4 numbers. Might these correspond to a date and time?' },
      { title: 'Hint 3 - Ok, just give it to me!', content: 'Each of the numbers from the puzzles you\'ve solved correspond reveal a number that is the date and time of escape. The answer revealed is a date of the 25th December (25/12) and a time of 22:15pm.' }
    ]
  },
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
  const [showContent, setShowContent] = useState(false)
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0)
  const [isNavigating, setIsNavigating] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const inputRef = useRef(null)
  const audioRef = useRef(null)
  const videoRef = useRef(null)

  const correctAnswers = ['laundry', 'laundryroom', 'the laundry room', 'laundry room',  'the laundry']

  const handleSubmit = () => {
    if (loading) return
    setLoading(true)

    setTimeout(() => {
      const [date, time] = input.split(' ')
      const [day, month] = date.split('/')
      const [hours, minutes] = time.split(':')
      
      const isCorrect = day === '25' && month === '12' && hours === '22' && minutes === '15'
      
      setFeedback(isCorrect
        ? '✅ Correct! Finch has a message for you...'
        : '❌ Incorrect! This does not appear to be the correct date and time of escape...'
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
      setShowContent(true)
    }, 1000)
  }

  const setCurrentGroupIndexAndResetHints = (index) => {
    setIsNavigating(true)
    setCurrentGroupIndex(index)
    setTimeout(() => setIsNavigating(false), 300)
  }

  const currentGroup = HINT_GROUPS[currentGroupIndex]

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Video play error:', error)
      })
    }
  }, [])

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
  }, [showVideo])

  return (
    <>
      {showIntro && (
        <div className="intro-overlay">
          <button className="begin-button" onClick={() => {
            setShowIntro(false)
            setShowContent(true)
          }}>
            ENTER THE REC ROOM
          </button>
        </div>
      )}
      
      {showContent && (
        <>
          {showVideo && (
            <div className={`video-overlay ${fadeOutVideo ? 'fade-out' : ''}`}>
              <video
                ref={videoRef}
                key="intro-video"
                className="intro-video"
                autoPlay
                playsInline
                muted
                onEnded={handleVideoEnd}
              >
                <source src="/Rec room intro.mp4" type="video/mp4" />
              </video>
              <div className="skip-wrapper">
                <button className="skip-intro" onClick={handleVideoEnd}>
                  Skip Intro
                </button>
              </div>
            </div>
          )}

          {!showVideo && (
            <div className={`guess-wrapper ${showContent ? 'fade-in-content' : ''}`} style={{ backgroundColor: showContent ? 'transparent' : 'black' }}>
              <audio
                ref={audioRef}
                src="/rec room background audio.mp3"
                loop
                preload="auto"
                onError={(e) => console.error('Audio loading error:', e)}
                onCanPlay={() => console.log('Audio is ready to play')}
                onPlay={() => console.log('Audio play event triggered')}
              />
              <div className="guess-container">
                <img
                  className="logo"
                  src="/Escape From Ironwood Long Orange.png"
                  alt="Escape From Ironwood Logo"
                />
                <h2 className="section-heading">Part III<br />- The Rec Room -</h2>
                <div className="page-subtitle">
                  Open the envelope marked <strong>"The Rec Room "</strong> to get your instructions from Finch.
                  <br /><br />
                 When you think you have the Escape Date and Time, enter your answer below.           <br /><br />
 

                  <div className="date-time-picker">
                    <div className="picker-group">
                      <div className="picker-label">Date:</div>
                      <select
                        value={input.split(' ')[0]?.split('/')[0] || '0'}
                        onChange={(e) => {
                          const parts = input.split(' ')
                          const date = parts[0]?.split('/') || ['0', '0']
                          date[0] = e.target.value
                          setInput(`${date.join('/')} ${parts[1] || '00:00'}`)
                        }}
                      >
                        {Array.from({ length: 32 }, (_, i) => (
                          <option key={i} value={i.toString().padStart(2, '0')}>
                            {i.toString().padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                      <span>/</span>
                      <select
                        value={input.split(' ')[0]?.split('/')[1] || '0'}
                        onChange={(e) => {
                          const parts = input.split(' ')
                          const date = parts[0]?.split('/') || ['0', '0']
                          date[1] = e.target.value
                          setInput(`${date.join('/')} ${parts[1] || '00:00'}`)
                        }}
                      >
                        {Array.from({ length: 13 }, (_, i) => (
                          <option key={i} value={i.toString().padStart(2, '0')}>
                            {i.toString().padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="picker-group">
                      <div className="picker-label">Time:</div>
                      <select
                        value={input.split(' ')[1]?.split(':')[0] || '00'}
                        onChange={(e) => {
                          const parts = input.split(' ')
                          const time = parts[1]?.split(':') || ['00', '00']
                          time[0] = e.target.value
                          setInput(`${parts[0] || '00/00'} ${time.join(':')}`)
                        }}
                      >
                        {Array.from({ length: 25 }, (_, i) => (
                          <option key={i} value={i.toString().padStart(2, '0')}>
                            {i.toString().padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                      <span>   : </span>
                      <select
                        value={input.split(' ')[1]?.split(':')[1] || '00'}
                        onChange={(e) => {
                          const parts = input.split(' ')
                          const time = parts[1]?.split(':') || ['00', '00']
                          time[1] = e.target.value
                          setInput(`${parts[0] || '00/00'} ${time.join(':')}`)
                        }}
                      >
                        {Array.from({ length: 61 }, (_, i) => (
                          <option key={i} value={i.toString().padStart(2, '0')}>
                            {i.toString().padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
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
          )}
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
            <p>Congratulations on successfully solving and linking all III parts of the escape investigation!</p>

<p>Thanks to your efforts, we now understand the where, how, and when of the escape, disrupting Moretti's carefully orchestrated plot. Without your intervention, the inmates might have succeeded and put the wider society at risk.</p>

<p>Your sharp mind, attention to detail, and unwavering determination have proven invaluable in uncovering the full scope of Moretti and his crew's escape plan.</p>

<p>On behalf of Ironwood Correctional Facility, I extend my deepest thanks.</p>

<p>This gets me thinking…</p>

<p>Your same investigative skills could help us elsewhere too. Remarkably, detectives never solved Moretti's Midnight Vault Heist or traced the stolen millions in art and diamonds; perhaps your insight could unravel that mystery too?</p>

<p>With my sincerest gratitude,</p>

<p>Until we meet again,<br />  <br />
              Warden Douglas Finch<br />
        
            Ironwood Correctional Facility</p>
              <img src="/Finch Signature.png" alt="Warden Finch's Signature" style={{ maxWidth: '200px', marginTop: '1rem' }} />
          
            </div>
            <button 
              className="success-button"
              onClick={() => window.location.href = 'https://ciphergrampuzzles.com/#stayupdated'}
            >
              Thank you for playing! <br /><br />Click here to stay updated to be first to hear of new releases. 
            </button>
          </div>
        </div>
      )}
    </>
  )
}
