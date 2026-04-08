import {
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import './bubble-input.css'
import { BubbleStyle } from './bubble'

interface BubbleInputProps {
  onChange: (value: string) => void
  onSubmit: (height: number) => void
  value: string
  fillColour: string
  strokeColour: string
  borderRadius?: number
  opacity?: number
  borderWidth?: number
  blur?: number
  shadowIntensity?: number
  styleType?: BubbleStyle
  gradientStart?: string
  gradientEnd?: string
}

const BubbleInput = ({
  onChange,
  onSubmit,
  value,
  fillColour,
  strokeColour,
  borderRadius = 30,
  opacity = 1,
  borderWidth = 0,
  blur = 0,
  shadowIntensity = 1,
  styleType = 'solid',
  gradientStart,
  gradientEnd
}: BubbleInputProps) => {
  const refEditable = useRef<HTMLDivElement>(null)
  const refContainer = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleKeyDown: KeyboardEventHandler = e => {
    const { current: elContainer } = refContainer
    const { current: elEditable } = refEditable
    if (elContainer === null || elEditable === null) return

    const { isComposing } = e.nativeEvent
    if (e.key === 'Enter' && !isComposing) {
      const height = elContainer.clientHeight
      onSubmit && onSubmit(height)
      e.preventDefault()
      setSubmitted(true)
      requestAnimationFrame(() => {
        elEditable.focus()
        elEditable.innerText = ''
        setSubmitted(false)
      })
    }
  }
  const handleBlur = useCallback(() => {
    const { current: elDiv } = refEditable
    if (elDiv) {
      elDiv.focus()
    }
  }, [refEditable])

  useEffect(handleBlur, [handleBlur])

  // Generate background based on style type
  const getBackground = () => {
    switch (styleType) {
      case 'glassmorphism':
        return `linear-gradient(135deg, ${fillColour}40, ${fillColour}10)`
      case 'liquid':
        return `linear-gradient(135deg, ${fillColour}, ${fillColour}dd)`
      case 'neumorphism':
        return fillColour
      case 'gradient':
        return `linear-gradient(135deg, ${gradientStart || fillColour}, ${gradientEnd || strokeColour})`
      default:
        return fillColour
    }
  }

  // Generate border radius based on style type
  const getBorderRadius = () => {
    if (styleType === 'liquid') {
      return `${borderRadius}px ${borderRadius + 10}px ${borderRadius - 5}px ${borderRadius + 5}px`
    }
    return `${borderRadius}px`
  }

  // Generate box shadow based on style type
  const getBoxShadow = () => {
    const baseShadow = shadowIntensity * 10
    switch (styleType) {
      case 'glassmorphism':
        return `0 8px ${baseShadow + 16}px rgba(0, 0, 0, 0.1), 0 4px ${baseShadow}px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.3)`
      case 'liquid':
        return `0 ${baseShadow}px ${baseShadow * 2}px rgba(0, 0, 0, 0.3), inset 0 -4px 8px rgba(0, 0, 0, 0.1), inset 0 4px 8px rgba(255, 255, 255, 0.3)`
      case 'neumorphism':
        return `${-baseShadow/2}px ${-baseShadow/2}px ${baseShadow}px rgba(255, 255, 255, 0.5), ${baseShadow/2}px ${baseShadow/2}px ${baseShadow}px rgba(0, 0, 0, 0.3)`
      case 'gradient':
        return `0 8px ${baseShadow + 16}px rgba(0, 0, 0, 0.2)`
      default:
        return `0 4px ${baseShadow}px rgba(0, 0, 0, 0.15)`
    }
  }

  // Generate backdrop filter for glass effects
  const getBackdropFilter = () => {
    if (styleType === 'glassmorphism') {
      return `blur(${blur + 10}px)`
    }
    return blur > 0 ? `blur(${blur}px)` : 'none'
  }

  // Generate border based on style type
  const getBorder = () => {
    if (styleType === 'glassmorphism') {
      return `1px solid rgba(255, 255, 255, 0.3)`
    }
    if (borderWidth > 0) {
      return `${borderWidth}px solid ${strokeColour}`
    }
    return 'none'
  }

  const inputStyle: React.CSSProperties = {
    background: getBackground(),
    borderRadius: getBorderRadius(),
    opacity,
    boxShadow: getBoxShadow(),
    backdropFilter: getBackdropFilter(),
    WebkitBackdropFilter: getBackdropFilter(),
    border: getBorder(),
    color: styleType === 'gradient' ? '#ffffff' : strokeColour,
    transition: 'all 0.3s ease',
  }

  return (
    <div className="bubble-container">
      <div
        ref={refContainer}
        className={`bubble input  ${value.length === 0 ? 'empty' : ''} ${
          submitted ? 'submitted' : ''
        }`}
      >
        <div
          ref={refEditable}
          className="bubble-content"
          contentEditable
          style={inputStyle}
          spellCheck="false"
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onInput={e => onChange(e.currentTarget.innerText)}
        />
      </div>
    </div>
  )
}

export default BubbleInput
