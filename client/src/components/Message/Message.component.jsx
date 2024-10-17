import React from "react";
import { Container } from "./Message.styles";
import { MdCircle } from "react-icons/md";
import Options from "./Options";

const Message = ({ message, currId, socket, roomId, color }) => {
    const [options, setOptions] = React.useState(false);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const { content, sender } = message;
    const isSentByCurrentUser = sender === currId;
    
    // Extract hours and minutes from createdAt
    const date = new Date(message.createdAt);

    // Get local time hours and minutes
    const hours = date.getHours();  // Get the hours in the local time zone
    const minutes = date.getMinutes();  // Get the minutes in the local time zone

    // Format time as HH:MM
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    const deleteMessage = () => {
        socket.emit("deleteMessage", { roomId, messageId: message._id });
    };

    return (
        <Container 
            $isCurrentUser={isSentByCurrentUser}
            $isDeleted={message.status === "deleted"}

            onContextMenu={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setPosition({ x: e.pageX, y: e.pageY });
                setOptions(true);
            }}
        
        >
            <p>{content}</p>
            {message.status !== "deleted" && <span style={{ color: isSentByCurrentUser && "white", alignSelf: isSentByCurrentUser ? 'flex-end' : 'flex-start', }}>
                {formattedTime}
                {
                    isSentByCurrentUser && (
                        <MdCircle style={{ color: color, marginLeft: "5px" }} />
                    )
                }
            </span>}
            {options && isSentByCurrentUser && <Options deleteMessage={deleteMessage} closeOptions={() => setOptions(false)} style={{ top: position.y, left: position.x }} />}

        </Container>
    );
};

export default React.memo(Message);