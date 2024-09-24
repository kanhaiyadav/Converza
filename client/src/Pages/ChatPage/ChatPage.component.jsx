import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectContact, selectUserInfo } from '../../redux/user/user.selector';
import { Container, Header, HeaderBody, Buttons, Body, Footer } from './ChatPage.styles';
import CustomButton from '../../components/CustomButton/CutomButton.component';
import RoundedButton from '../../components/RoundedButton/RoundedButton';
import Message from '../../components/Message/Message.component';
import MessageFrom from './MessageForm/MessageForm.component';
import { updateContact } from '../../redux/contacts/contacts.slice';
import { useDispatch } from 'react-redux';

const ChatPage = ({ socket }) => {
    const id = useParams().id;
    const contact = useSelector(selectContact(id));
    const { user, room } = contact;
    const me = useSelector(selectUserInfo);
    const [messages, setMessages] = useState([]);
    const endOfMessagesRef = useRef(null);
    const dispatch = useDispatch();

    // Scroll to bottom when messages change
    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Join the room when the component mounts
    useEffect(() => {
        socket.emit('join', { room: room._id }, (err, response) => {
            if (err) {
                console.log(err);
            }
            setMessages(response);
        });
    }, [socket, room._id]);

    // Listen for new messages (use a stable callback)
    useEffect(() => {
        const handleMessage = (message) => {
            setMessages((prev) => [...prev, message]);
            dispatch(updateContact({ _id: contact._id, message: message }));
        };

        socket.on(`messageSent-${room._id}`, handleMessage); // Use a unique event name

        return () => {
            socket.off(`messageSent-${room._id}`, handleMessage); // Clean up the correct listener
        };
    }, [socket, room._id, dispatch, contact._id]);

    return (
        <Container>
            <Header>
                <img src={user.avatar} alt="" />
                <HeaderBody>
                    <p>{user.name}</p>
                    <span>Active now</span>
                </HeaderBody>
                <Buttons>
                    <div
                        style={{
                            display: 'flex',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                        }}
                    />
                    <CustomButton><i className="fa-solid fa-search" /></CustomButton>
                </Buttons>
            </Header>
            <Body>
                {messages.map((message) => (
                    <Message key={message._id} message={message} currId={me._id} socket={socket} roomId={room._id} />
                ))}
                <div ref={endOfMessagesRef} />
            </Body>
            <Footer>
                <MessageFrom socket={socket} contact={contact} />
                <RoundedButton type="submit" form="message-form">
                    <i className="fa-solid fa-paper-plane" />
                </RoundedButton>
            </Footer>
        </Container>
    );
};

export default ChatPage;
