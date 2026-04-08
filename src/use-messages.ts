import { useCallback, useState } from 'react'
import { BubbleStyle } from './bubble'

export interface StyleParams {
  fillColour: string
  strokeColour: string
  borderRadius: number
  opacity: number
  borderWidth: number
  blur: number
  shadowIntensity: number
  styleType: BubbleStyle
  gradientStart: string
  gradientEnd: string
}

export interface Message {
  id: number
  text: string
  height: number
  timeout: number
  styleParams?: StyleParams
}

const useMessages = (initialValue: Array<Message> = []) => {
  const [messages, setMessages] = useState(initialValue)

  const addMessage = useCallback(
    (msg: Message) => {
      setMessages(messages => [...messages, msg])
      setTimeout(() => {
        setMessages(current => {
          const n = [...current]
          n.shift()
          return n
        })
      }, msg.timeout)
    },
    [setMessages]
  )

  return [messages, addMessage] as const
}

export default useMessages
