import React from 'react'
import { ChatBody, ChatContainer } from './chat.styles';

const Chat = ({room}) => {
    const { img, to, name, subtext } = room;
  return (
      <ChatContainer to={to}>
          <img src={img} alt="" />
          <ChatBody>
              <p>{name}</p>
              <span>{subtext}</span>
          </ChatBody>
    </ChatContainer>
  )
}

export default Chat;