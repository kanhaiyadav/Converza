import React from "react";
import { Container } from "./Message.styles";

const Message = ({ message, currId }) => {
    const { content, sender} = message;
    const isSentByCurrentUser = sender === currId;
    console.log(currId, sender, isSentByCurrentUser);
    return (
        <Container style={{
            alignSelf: isSentByCurrentUser ? 'flex-end' : 'flex-start',
            backgroundColor: isSentByCurrentUser ? '#2979FF' : '#E0E0E0',
            color: isSentByCurrentUser ? 'white' : 'black',
        }}>
            <p>{content}</p>
            {/* <span>{moment(createdAt).fromNow()}</span> */}
        </Container>
    );
};

export default React.memo(Message);