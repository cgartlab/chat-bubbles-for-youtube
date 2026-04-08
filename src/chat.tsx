import { ReactNode } from 'react'
import './chat.css'

interface ChatProps {
  children: ReactNode
  background?: string
}

const Chat = ({ children, background }: ChatProps) => {
  return (
    <div 
      className="chat" 
      style={background ? { background } : {}}
    >
      {children}
    </div>
  )
}

export default Chat
