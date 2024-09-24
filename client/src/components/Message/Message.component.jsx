import React, { useEffect } from "react";
import { Container } from "./Message.styles";
// import { MdCircle } from "react-icons/md";

const Message = ({ message, currId, socket, roomId }) => {
    const { content, sender } = message;
    const isSentByCurrentUser = sender === currId;
    console.log(currId, sender, isSentByCurrentUser);

    // Extract hours and minutes from createdAt
    const date = new Date(message.createdAt);

    // Get local time hours and minutes
    const hours = date.getHours();  // Get the hours in the local time zone
    const minutes = date.getMinutes();  // Get the minutes in the local time zone

    // Format time as HH:MM
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    console.log(formattedTime);  // This will display the time in your local time zone


    

    return (
        <Container style={{
            alignSelf: isSentByCurrentUser ? 'flex-end' : 'flex-start',
            backgroundColor: isSentByCurrentUser ? "#932ef9" : '#2979FF',
            textAlign: isSentByCurrentUser ? 'right' : 'left',
        }}>
            <p>{content}</p>
            <span>{formattedTime}</span>
        </Container>
    );
};

export default React.memo(Message);