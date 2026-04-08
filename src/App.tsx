import { AnimatePresence } from 'framer-motion'
import { useCallback, useState } from 'react'
import './App.css'
import Bubble from './bubble'
import BubbleInput from './bubble-input'
import Chat from './chat'
import useMessages from './use-messages'
import { SketchPicker } from 'react-color'

function App() {
  const [messages, addMessage] = useMessages([])
  const [newMessage, setNewMessage] = useState('')
  const [fillColour, setFillColour] = useState('#e6e5eb')
  const [strokeColour, setStrokeColour] = useState('#000000')
  const [bubbleTimeout, setBubbleTimeout] = useState(500)
  const [isPanelOpen, setIsPanelOpen] = useState(true)

  const handleSubmit = useCallback(
    (bubbleHeight: number) => {
      if (newMessage.length > 0) {
        addMessage({
          id: +new Date(),
          text: newMessage,
          height: bubbleHeight,
          timeout: bubbleTimeout
        })
        setNewMessage('')
      }
    },
    [newMessage, messages]
  )

  const handleFillColourChange = (color: { hex: string }) => {
    setFillColour(color.hex)
  }

  const handleStrokeColourChange = (color: { hex: string }) => {
    setStrokeColour(color.hex)
  }

  const lastMessage = messages[messages.length - 1]
  const dy = lastMessage ? lastMessage.height : 0

  const handleBubbleTimeoutIncrease = () => {
    setBubbleTimeout(bubbleTimeout + 500)
  }

  const handleBubbleTimeoutDecrease = () => {
    setBubbleTimeout(Math.max(0, bubbleTimeout - 500))
  }

  return (
    <div className="App">
      <Chat>
        <AnimatePresence>
          {messages.map(m => (
            <Bubble
              key={m.id}
              id={m.id}
              dy={dy}
              fillColour={fillColour}
              strokeColour={strokeColour}
            >
              {m.text}
            </Bubble>
          ))}
        </AnimatePresence>
        <BubbleInput
          value={newMessage}
          onChange={setNewMessage}
          onSubmit={handleSubmit}
          fillColour={fillColour}
          strokeColour={strokeColour}
        />
      </Chat>

      <div className={`settings-panel ${isPanelOpen ? 'open' : ''}`}>
        <button 
          className="panel-toggle" 
          onClick={() => setIsPanelOpen(!isPanelOpen)}
          aria-label={isPanelOpen ? 'Close settings' : 'Open settings'}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>
        
        <div className="panel-content">
          <div className="panel-header">
            <h2>Settings</h2>
          </div>
          
          <div className="settings-section">
            <div className="setting-item">
              <div className="setting-label">
                <span className="label-icon">🎨</span>
                <span>Bubble Fill Color</span>
              </div>
              <div className="color-preview" style={{ backgroundColor: fillColour }}>
                <span>{fillColour}</span>
              </div>
            </div>
            <div className="color-picker-wrapper">
              <SketchPicker color={fillColour} onChange={handleFillColourChange} />
            </div>
          </div>

          <div className="settings-section">
            <div className="setting-item">
              <div className="setting-label">
                <span className="label-icon">✏️</span>
                <span>Bubble Stroke Color</span>
              </div>
              <div className="color-preview" style={{ backgroundColor: strokeColour, border: '1px solid #ddd' }}>
                <span>{strokeColour}</span>
              </div>
            </div>
            <div className="color-picker-wrapper">
              <SketchPicker color={strokeColour} onChange={handleStrokeColourChange} />
            </div>
          </div>

          <div className="settings-section">
            <div className="setting-item">
              <div className="setting-label">
                <span className="label-icon">⏱️</span>
                <span>Bubble Timeout (ms)</span>
              </div>
              <div className="timeout-control">
                <button 
                  className="timeout-btn" 
                  onClick={handleBubbleTimeoutDecrease}
                  disabled={bubbleTimeout <= 0}
                >
                  −
                </button>
                <input
                  type="number"
                  className="timeout-input"
                  value={bubbleTimeout}
                  onChange={({ target: { value } }) =>
                    setBubbleTimeout(Math.max(0, Number(value)))
                  }
                  min="0"
                  step="100"
                />
                <button 
                  className="timeout-btn" 
                  onClick={handleBubbleTimeoutIncrease}
                >
                  +
                </button>
              </div>
            </div>
            <div className="timeout-presets">
              <button 
                className={`preset-btn ${bubbleTimeout === 0 ? 'active' : ''}`}
                onClick={() => setBubbleTimeout(0)}
              >
                Instant
              </button>
              <button 
                className={`preset-btn ${bubbleTimeout === 500 ? 'active' : ''}`}
                onClick={() => setBubbleTimeout(500)}
              >
                500ms
              </button>
              <button 
                className={`preset-btn ${bubbleTimeout === 1000 ? 'active' : ''}`}
                onClick={() => setBubbleTimeout(1000)}
              >
                1s
              </button>
              <button 
                className={`preset-btn ${bubbleTimeout === 2000 ? 'active' : ''}`}
                onClick={() => setBubbleTimeout(2000)}
              >
                2s
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
