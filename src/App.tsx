import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, useCallback, useState } from 'react'
import './App.css'
import Bubble, { BubbleStyle } from './bubble'
import BubbleInput from './bubble-input'
import Chat from './chat'
import useMessages from './use-messages'
import { SketchPicker } from 'react-color'

type SectionKey = 'appearance' | 'colors' | 'effects' | 'timing' | 'presets'

interface ControlSectionProps {
  title: string
  sectionKey: SectionKey
  collapsed: boolean
  onToggle: (key: SectionKey) => void
  children: ReactNode
  className?: string
}

const ControlSection = ({
  title,
  sectionKey,
  collapsed,
  onToggle,
  children,
  className
}: ControlSectionProps) => {
  const sectionId = `section-${sectionKey}`

  return (
    <div className={`control-section ${className || ''}`.trim()}>
      <button
        type="button"
        className="section-toggle"
        onClick={() => onToggle(sectionKey)}
        aria-expanded={!collapsed}
        aria-controls={sectionId}
      >
        <h4>{title}</h4>
        <span>{collapsed ? '展开' : '收起'}</span>
      </button>
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            id={sectionId}
            className="section-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function App() {
  const [messages, addMessage] = useMessages([])
  const [newMessage, setNewMessage] = useState('')
  const [fillColour, setFillColour] = useState('#6366f1')
  const [strokeColour, setStrokeColour] = useState('#ffffff')
  const [bubbleTimeout, setBubbleTimeout] = useState(500)
  const [panelCollapsed, setPanelCollapsed] = useState(false)
  const [sectionCollapsed, setSectionCollapsed] = useState<Record<SectionKey, boolean>>({
    appearance: false,
    colors: false,
    effects: false,
    timing: false,
    presets: false
  })

  const [borderRadius, setBorderRadius] = useState(30)
  const [opacity, setOpacity] = useState(1)
  const [borderWidth, setBorderWidth] = useState(0)
  const [blur, setBlur] = useState(0)
  const [shadowIntensity, setShadowIntensity] = useState(1)
  const [styleType, setStyleType] = useState<BubbleStyle>('solid')
  const [gradientStart, setGradientStart] = useState('#6366f1')
  const [gradientEnd, setGradientEnd] = useState('#8b5cf6')
  const [chatBackground, setChatBackground] = useState('#00a000')

  const toggleSection = (key: SectionKey) => {
    setSectionCollapsed(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const expandAll = () => {
    setSectionCollapsed(prev => {
      const newState = { ...prev }
      Object.keys(newState).forEach(key => {
        newState[key as SectionKey] = false
      })
      return newState
    })
  }

  const collapseAll = () => {
    setSectionCollapsed(prev => {
      const newState = { ...prev }
      Object.keys(newState).forEach(key => {
        newState[key as SectionKey] = true
      })
      return newState
    })
  }

  const handleSubmit = useCallback(
    (bubbleHeight: number) => {
      if (newMessage.length > 0) {
        addMessage({
          id: +new Date(),
          text: newMessage,
          height: bubbleHeight,
          timeout: bubbleTimeout,
          styleParams: {
            fillColour,
            strokeColour,
            borderRadius,
            opacity,
            borderWidth,
            blur,
            shadowIntensity,
            styleType,
            gradientStart,
            gradientEnd
          }
        })
        setNewMessage('')
      }
    },
    [
      addMessage,
      blur,
      borderRadius,
      borderWidth,
      bubbleTimeout,
      fillColour,
      gradientEnd,
      gradientStart,
      newMessage,
      opacity,
      shadowIntensity,
      strokeColour,
      styleType
    ]
  )

  const lastMessage = messages[messages.length - 1]
  const dy = lastMessage ? lastMessage.height : 0

  return (
    <div className="App">
      <Chat background={chatBackground}>
        <AnimatePresence>
          {messages.map(m => (
            <Bubble
              key={m.id}
              id={m.id}
              dy={dy}
              fillColour={m.styleParams?.fillColour || fillColour}
              strokeColour={m.styleParams?.strokeColour || strokeColour}
              borderRadius={m.styleParams?.borderRadius || borderRadius}
              opacity={m.styleParams?.opacity || opacity}
              borderWidth={m.styleParams?.borderWidth || borderWidth}
              blur={m.styleParams?.blur || blur}
              shadowIntensity={m.styleParams?.shadowIntensity || shadowIntensity}
              styleType={m.styleParams?.styleType || styleType}
              gradientStart={m.styleParams?.gradientStart || gradientStart}
              gradientEnd={m.styleParams?.gradientEnd || gradientEnd}
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
          borderRadius={borderRadius}
          opacity={opacity}
          borderWidth={borderWidth}
          blur={blur}
          shadowIntensity={shadowIntensity}
          styleType={styleType}
          gradientStart={gradientStart}
          gradientEnd={gradientEnd}
        />
      </Chat>

      <button
        type="button"
        className={`panel-toggle ${panelCollapsed ? 'collapsed' : 'expanded'}`}
        onClick={() => setPanelCollapsed(prev => !prev)}
        aria-expanded={!panelCollapsed}
        aria-controls="style-control-panel"
        aria-label={panelCollapsed ? '打开样式面板' : '收起样式面板'}
      >
        <span className="panel-toggle-icon">{panelCollapsed ? '⚙️' : '✕'}</span>
        <span className="panel-toggle-text">{panelCollapsed ? '打开面板' : '收起面板'}</span>
      </button>

      <aside
        className={`picker ${panelCollapsed ? 'picker-hidden' : ''}`}
        id="style-control-panel"
        aria-hidden={panelCollapsed}
      >
        <h3>Bubble Style Settings</h3>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <button
            type="button"
            onClick={expandAll}
            style={{
              flex: 1,
              height: '32px',
              padding: '0 12px',
              border: '1px solid var(--stroke)',
              borderRadius: '9px',
              background: 'var(--control-bg)',
              color: 'var(--text-primary)',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            展开全部
          </button>
          <button
            type="button"
            onClick={collapseAll}
            style={{
              flex: 1,
              height: '32px',
              padding: '0 12px',
              border: '1px solid var(--stroke)',
              borderRadius: '9px',
              background: 'var(--control-bg)',
              color: 'var(--text-primary)',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            收起全部
          </button>
        </div>

        <details className="control-section preset-group" open>
          <summary>Presets</summary>
          <div className="style-preview">
            <h4>Quick Style Presets</h4>
            <button onClick={() => {
              setStyleType('glassmorphism')
              setFillColour('#ffffff')
              setStrokeColour('#333333')
              setBorderRadius(20)
              setOpacity(0.7)
              setBlur(10)
              setShadowIntensity(1)
            }}>🪟 Glassmorphism</button>

            <button onClick={() => {
              setStyleType('liquid')
              setFillColour('#00d4ff')
              setStrokeColour('#ffffff')
              setBorderRadius(35)
              setOpacity(1)
              setBlur(0)
              setShadowIntensity(2)
            }}>💧 Liquid</button>

            <button onClick={() => {
              setStyleType('neumorphism')
              setFillColour('#e0e0e0')
              setStrokeColour('#333333')
              setBorderRadius(30)
              setOpacity(1)
              setBlur(0)
              setShadowIntensity(1.5)
            }}>⬜ Neumorphism</button>

            <button onClick={() => {
              setStyleType('gradient')
              setGradientStart('#667eea')
              setGradientEnd('#764ba2')
              setFillColour('#667eea')
              setStrokeColour('#ffffff')
              setBorderRadius(25)
              setOpacity(1)
              setBlur(0)
              setShadowIntensity(1.5)
            }}>🌈 Gradient</button>
          </div>
        </details>
        
        <div className="control-section">
          <h4>Style Type</h4>
          <select
            value={styleType}
            onChange={e => setStyleType(e.target.value as BubbleStyle)}
            className="style-select"
          >
            <option value="solid">Solid</option>
            <option value="glassmorphism">Glassmorphism (毛玻璃)</option>
            <option value="liquid">Liquid (液态)</option>
            <option value="neumorphism">Neumorphism</option>
            <option value="gradient">Gradient</option>
          </select>
        </div>

        <ControlSection
          title="Appearance"
          sectionKey="appearance"
          collapsed={sectionCollapsed.appearance}
          onToggle={toggleSection}
        >
          <label>
            Border Radius: {borderRadius}px
            <input
              type="range"
              min="0"
              max="60"
              value={borderRadius}
              onChange={e => setBorderRadius(Number(e.target.value))}
              className="slider"
            />
          </label>

          <label>
            Border Width: {borderWidth}px
            <input
              type="range"
              min="0"
              max="10"
              value={borderWidth}
              onChange={e => setBorderWidth(Number(e.target.value))}
              className="slider"
            />
          </label>
        </ControlSection>

        <ControlSection
          title="Colors"
          sectionKey="colors"
          collapsed={sectionCollapsed.colors}
          onToggle={toggleSection}
        >
          <p>Fill / Start Gradient</p>
          <SketchPicker color={fillColour} onChange={color => setFillColour(color.hex)} />

          {(styleType === 'gradient' || styleType === 'glassmorphism') && (
            <>
              <p>Gradient End</p>
              <SketchPicker color={gradientEnd} onChange={color => setGradientEnd(color.hex)} />
            </>
          )}

          <p>Text Color</p>
          <SketchPicker color={strokeColour} onChange={color => setStrokeColour(color.hex)} />

          <p>Chat Background</p>
          <SketchPicker color={chatBackground} onChange={color => setChatBackground(color.hex)} />
        </ControlSection>

        <ControlSection
          title="Effects"
          sectionKey="effects"
          collapsed={sectionCollapsed.effects}
          onToggle={toggleSection}
        >
          <label>
            Opacity: {(opacity * 100).toFixed(0)}%
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={opacity}
              onChange={e => setOpacity(Number(e.target.value))}
              className="slider"
            />
          </label>

          <label>
            Blur Effect: {blur}px
            <input
              type="range"
              min="0"
              max="30"
              value={blur}
              onChange={e => setBlur(Number(e.target.value))}
              className="slider"
            />
          </label>

          <label>
            Shadow Intensity: {shadowIntensity.toFixed(1)}
            <input
              type="range"
              min="0"
              max="3"
              step="0.1"
              value={shadowIntensity}
              onChange={e => setShadowIntensity(Number(e.target.value))}
              className="slider"
            />
          </label>
        </ControlSection>

        <div className="control-section">
          <h4>Timing</h4>
          <p className="field-caption">Bubble Timeout (Milliseconds)</p>
          <div className="number-control">
            <button type="button" onClick={() => setBubbleTimeout(Math.max(100, bubbleTimeout - 500))}>
              -
            </button>
            <input
              type="number"
              min="100"
              value={bubbleTimeout}
              onChange={({ target: { value } }) => setBubbleTimeout(Math.max(100, Number(value) || 100))}
            />
            <button type="button" onClick={() => setBubbleTimeout(bubbleTimeout + 500)}>
              +
            </button>
          </div>
        </div>

      </aside>
    </div>
  )
}

export default App