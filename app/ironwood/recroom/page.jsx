'use client'

import React, { useState, useRef, useEffect } from 'react'
import './page.css'
import Link from 'next/link'
import Head from 'next/head'

const HINT_GROUPS = [
  {
    title: 'Photo on the Wall',
    hints: [
      { title: 'Hint 1 - I need a pointer...', content: 'Upon the wall, a spectre stands, his wrist a canvas for the seer\'s mark—where flesh meets shade, digits whisper through the veil, a silent tally bared to those who dare to gaze.' },
      { title: 'Hint 2 - I\'m really stuck...', content: 'Examine the photo of The Ghost closely, especially his wrist, where a tattoo shows the number you\'re looking for.' },
      { title: 'Hint 3 - Ok, just give it to me!', content: 'If you look closely at the photo of the Ghost and the tattoo on his wrist (which was mentioned in his Psychologic Profile) you\'ll notice the number 7 disguised in the tattoo of a butterfly.' }
    ]
  },
  {
    title: 'Audio Recording',
    hints: [
      { title: 'Hint 1 - I need a pointer...', content: 'In the echo of metal struck, a rhythm hides—swift strikes and lingering beats weave a silent tongue; chase the cadence through the bars, and from the void of sound, a code shall sing its secret.' },
      { title: 'Hint 2 - I\'m really stuck...', content: 'Listen to the tapping on the bars—it\'s Morse code, so break it into low and high sounds to figure out the message.' },
      { title: 'Hint 3 - Ok, just give it to me!', content: 'Using the morse code decoder provided in the introductory pack, you needed to identify the high and low sounds revealed in the tapping sound on the prison cell bars. This revealed the following pattern: xxx which when decoded gives the word STALLION which relates to the horse icon key which = xxxx' }
    ]
  },
  {
    title: '6 Icon Picture Key',
    hints: [
      { title: 'Hint 1 - I need a pointer...', content: 'From folded wing, inked shade, ciphered hall, ghostly mark, and rhythmic clang, a pattern of figures emerges—bind them as the cartographer\'s key, and upon the prison\'s chart, their union shall unveil the hidden cell.' },
      { title: 'Hint 2 - I\'m really stuck...', content: 'Take the answers from each of the six puzzles you\'ve solved—numbers whispered through folded wings, torn ink, ciphered halls, ghostly marks, rhythmic clangs, and scattered shards. Do these figures align like points on a lattice, a grid of intent veiled as mere digits? Might they pair with a chart already in your hands, tracing a path unseen?' },
      { title: 'Hint 3 - Ok, just give it to me!', content: 'Take the answers from the previous puzzles you should have 6 numbers. These are grid co-ordinates to be used with the blueprint of the prison already provided. The answer is: 345,967 which on the map reveals the Laundry Room.' }
    ]
  },
  {
    title: 'Torn Letter',
    hints: [
      { title: 'Hint 1 - I need a pointer...', content: 'Gather the shards of whispered words, where hue betrays the quill\'s intent; in the mosaic of shadow and light, a digit dances—unseen up close, yet bold when the eye retreats.' },
      { title: 'Hint 2 - I\'m really stuck...', content: 'Piece the torn letter back together like a puzzle, then notice any differences in the ink colour to spot the hidden number.' },
      { title: 'Hint 3 - Ok, just give it to me!', content: 'Once you\'ve pieced the torn pieces of letter together, if you step back you\'ll notice some of the text is in a different shade of ink. This reveals the number 3.' }
    ]
  },
  {
    title: 'Postcard',
    hints: [
      { title: 'Hint 1 - I need a pointer...', content: 'Where the palace boasts its rank of seven, a cipher guards the tongue of ink—beyond each silent void, twist the trailing runes by the wonder\'s count, and truth shall rise from the postcard\'s veil.' },
      { title: 'Hint 2 - I\'m really stuck...', content: 'Look at the word "seventh" on the front of the postcard, then check the message on the back—shift the letters after each blank space to find the hidden answer.' },
      { title: 'Hint 3 - Ok, just give it to me!', content: 'This is a caesar cipher using a shift of 7 as revealed on the front of the postcard. You then take each of the letters revealed after each deliberate space: L (glitz), B (remember) ,Q (enquire), and apply the shift of 7 (simply counting along 7 letters) so L = S, Q = X, B = I, revealing the answer of SIX.' }
    ]
  },
  {
    title: 'Paper with Lines',
    hints: [
      { title: 'Hint 1 - I need a pointer...', content: 'Seek the cipher where the wind meets its wings; in the shadow of the crease, a secret sings—bend the sheet as the sky demands, and the figure shall rise from folded hands.' },
      { title: 'Hint 2 - I\'m really stuck...', content: 'Start by folding the paper into a basic paper airplane shape with the point at the top, and look closely at the final shape for any visible numbers.' },
      { title: 'Hint 3 - Ok, just give it to me!', content: 'If you fold this paper into a paper airplane, the marking on the plane join together to reveal the answer 4.' }
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
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0)
  const [isNavigating, setIsNavigating] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const inputRef = useRef(null)

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
    }, 1200)
  }

  const setCurrentGroupIndexAndResetHints = (index) => {
    setIsNavigating(true)
    setCurrentGroupIndex(index)
    setTimeout(() => setIsNavigating(false), 300)
  }

  const currentGroup = HINT_GROUPS[currentGroupIndex]

  useEffect(() => {
    document.title = 'Escape From Ironwood - The Rec Room'
  }, [])

  return (
    <>
      {showVideo && (
        <div className={`video-overlay ${fadeOutVideo ? 'fade-out' : ''}`}>
          <video
            key="intro-video"
            className="intro-video"
            autoPlay
            playsInline
            onEnded={handleVideoEnd}
          >
            <source src="/Intro Video Rec Room.mp4" type="video/mp4" />
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
              onClick={() => window.location.href = 'https://ciphergrampuzzles.com'}
            >
              You have have completed the game. Thank you for playing!
            </button>
          </div>
        </div>
      )}
    </>
  )
}
