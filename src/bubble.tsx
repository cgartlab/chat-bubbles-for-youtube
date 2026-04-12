import { motion, usePresence } from 'framer-motion'
import React from 'react'
import './bubble.css'

const transition = {
  type: 'spring',
  stiffness: 500,
  damping: 50,
  default: {
    duration: 0.4
  }
}

export type BubbleStyle = 'solid' | 'glassmorphism' | 'liquid' | 'neumorphism' | 'gradient'

interface BubbleProps {
  id: number
  dy: number
  children: React.ReactNode
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

const Bubble = ({ 
  id, 
  children, 
  dy, 
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
}: BubbleProps) => {
  const [isPresent, safeToRemove] = usePresence()

  const animations = {
    layout: true,
    initial: 'out',
    animate: 'in',
    variants: {
      in: { opacity: 1, translateY: 0 },
      out: { opacity: 1, translateY: `${dy}px` }
    },
    exit: { opacity: 0, translateY: 0 },
    onAnimationComplete: () => !isPresent && safeToRemove(),
    transition
  }

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

  const bubbleStyle: React.CSSProperties = {
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
    <motion.div key={id} className="bubble" {...animations}>
      <div style={{ position: 'static' }}>
        <div className="bubble-content" style={bubbleStyle}>{children}</div>
      </div>
    </motion.div>
  )
}

export default Bubble