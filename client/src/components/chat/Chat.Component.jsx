import React from 'react'
import { ChatBody, ChatContainer } from './chat.styles';
import { selectUserInfo } from '../../redux/user/user.selector';
import { useSelector } from 'react-redux';
import Options from './Options';

const Chat = ({ contact }) => {

    const [options, setOptions] = React.useState(false);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const me = useSelector(selectUserInfo);
    const { room, user } = contact;
    const date = new Date(room.lastMessage?.createdAt);

    // Get local time hours and minutes
    const hours = date.getHours();  // Get the hours in the local time zone
    const minutes = date.getMinutes();  // Get the minutes in the local time zone
    let formattedTime = ''

    // Format time as HH:MM

    
    if(hours && minutes)
        formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    return (
        <ChatContainer to={contact.room._id}
            onContextMenu={(e) => { 
                e.preventDefault();
                setPosition({ x: e.pageX, y: e.pageY });
                setOptions(true);
            }}
        >
            <img src={'/user.png'} alt="" />
            <ChatBody>
                <div><span>{user.name}</span>{contact.room.unreadMessageSender && (me._id !== contact.room.unreadMessageSender) && contact.room.unreadMessagesCount ? <p>{room.unreadMessagesCount}</p> : ""}</div>
                <span>
                    {room.lastMessage ? room.lastMessage.sender === me._id ? "You: " : "" : ""}
                    {room.lastMessage ? room.lastMessage.content : "No messages yet..."}
                    <span>{formattedTime}</span>
                </span>
            </ChatBody>
            {options && <Options closeOptions={() => setOptions(false)} style={{ top: position.y, left: position.x }} contact={contact} />}
        </ChatContainer>
    )
}

export default React.memo(Chat);