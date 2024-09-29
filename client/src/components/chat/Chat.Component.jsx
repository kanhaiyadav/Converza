import React from 'react'
import { ChatBody, ChatContainer } from './chat.styles';
import { selectUserInfo } from '../../redux/user/user.selector';
import { useSelector } from 'react-redux';

const Chat = ({ contact }) => {
    const me = useSelector(selectUserInfo);
    console.log(contact);
    const { room, user } = contact;
    console.log(room, user, user.avatar);
    const date = new Date(room.lastMessage?.createdAt);

    // Get local time hours and minutes
    const hours = date.getHours();  // Get the hours in the local time zone
    const minutes = date.getMinutes();  // Get the minutes in the local time zone

    // Format time as HH:MM
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    console.log(me._id, contact.room.unreadMessagesSender, contact.room.unreadMessagesCount);


    return (
        <ChatContainer to={contact.room._id}>
            <img src={user.avatar} alt="" />
            <ChatBody>
                <div><span>{user.name}</span>{(me._id !== contact.room.unreadMessagesSender) && contact.room.unreadMessagesCount ? <p>{room.unreadMessagesCount}</p> : "😑"}</div>
                <span>
                    {room.lastMessage ? room.lastMessage.sender === me._id ? "You: " : "" : ""}
                    {room.lastMessage ? room.lastMessage.content : "No messages yet..."}
                    <span>{formattedTime}</span>
                </span>
            </ChatBody>
        </ChatContainer>
    )
}

export default React.memo(Chat);