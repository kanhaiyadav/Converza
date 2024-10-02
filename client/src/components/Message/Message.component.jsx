import React, { useEffect } from "react";
import { Container } from "./Message.styles";
import { MdCircle } from "react-icons/md";

const Message = ({ message, currId, socket, roomId, color }) => {
    const { content, sender } = message;
    const isSentByCurrentUser = sender === currId;
    
    // Extract hours and minutes from createdAt
    const date = new Date(message.createdAt);

    // Get local time hours and minutes
    const hours = date.getHours();  // Get the hours in the local time zone
    const minutes = date.getMinutes();  // Get the minutes in the local time zone

    // Format time as HH:MM
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;


    return (
        <Container style={{
            alignSelf: isSentByCurrentUser ? 'flex-end' : 'flex-start',
            background: isSentByCurrentUser && "linear-gradient(130deg, #4A00E0 0%, #8E2DE2 100%)",
            textAlign: isSentByCurrentUser ? 'right' : 'left',
        }}>
            <p style={{ color: isSentByCurrentUser && "white"}}>{content}</p>
            <span style={{ color: isSentByCurrentUser && "white", alignSelf: isSentByCurrentUser ? 'flex-end' : 'flex-start', }}>
                {formattedTime}
                {
                    isSentByCurrentUser && (
                        <MdCircle style={{ color: color, fontSize: "0.7rem", marginLeft: "5px" }} />
                    )
                }
            </span>
        </Container>
    );
};

export default React.memo(Message);