import React from 'react'
import { ChatBody, ChatContainer } from './chat.styles';

const Chat = ({contact}) => {
    const { room, user } = contact;
  return (
      <ChatContainer to={contact._id}>
          <img src={user.avatar} alt="" />
          <ChatBody>
              <p>{user.name}</p>
              <span>{room.lastMessage?room.lastMessage:"No messages yet..."}</span>
          </ChatBody>
    </ChatContainer>
  )
}

export default Chat;