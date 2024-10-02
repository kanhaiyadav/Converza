import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../redux/user/user.selector';
import { selectContact, selectMessages, selectUnreadMessages } from '../../redux/contacts/contact.selector';
import { Container, Header, HeaderBody, Buttons, Body, Footer } from './ChatPage.styles';
import CustomButton from '../../components/CustomButton/CutomButton.component';
import RoundedButton from '../../components/RoundedButton/RoundedButton';
import Message from '../../components/Message/Message.component';
import MessageFrom from './MessageForm/MessageForm.component';
import { roomJoinUpdate, addOneReadMessage, addOneUnreadMessage, markMessagesRead} from '../../redux/contacts/contacts.slice';
import { useDispatch } from 'react-redux';

const ChatPage = ({ socket }) => {
    const id = useParams().id;
    const contact = useSelector(selectContact(id));
    const { user, room } = contact;
    const me = useSelector(selectUserInfo);
    const endOfMessagesRef = useRef(null);
    const dispatch = useDispatch();
    const messages = useSelector(selectMessages(room._id));
    const unreadMessages = useSelector(selectUnreadMessages(room._id));


    // Scroll to bottom when messages change
    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView();
    }, [messages]);

    // Join the room when the component mounts
    useEffect(() => {
        socket.emit('join', { room: room._id, userId: me._id }, (err, response) => {
            if (err) {
                console.log(err);
            }
            dispatch(roomJoinUpdate({ roomId: room._id, messages: response, userId: me._id }));
        });
    }, [socket, room._id, dispatch, me._id, contact.room.unreadMessagesSender]);

    // Listen for new messages (use a stable callback)
    useEffect(() => {
        const handleMessage = (data) => {
            if (data.roomId === room._id)
            {
                console.log("user is active");
                dispatch(addOneReadMessage({ message: data.message }));
            }
            else {
                console.log("user is inactive");
                socket.emit('unreadMessage', { roomId: data.roomId, sender: data.message.sender, messageId: data.message._id });
                dispatch(addOneUnreadMessage({message: data.message}));
            }
        };


        socket.on('messageNotRecieved', (data) => {
            dispatch(addOneUnreadMessage({ message: data.message }));
        });

        socket.on(`messageSent`, handleMessage); // Use a unique event name

        socket.on('newMessage', (data, callback) => {
            console.log("new message received");
            if (data.roomId === room._id) {
                callback({ messageSeen: true });
                dispatch(addOneReadMessage({ message: data.message }));
            }
            else {
                callback({ messageSeen: false });
                dispatch(addOneUnreadMessage({ message: data.message }));
            }
        });

        socket.on('messageSeen', (data) => {
            dispatch(addOneReadMessage({ message: data.message }));
        });

        socket.on('messageNotSeen', (data) => {
            dispatch(addOneUnreadMessage({ message: data.message }));
        });

        socket.on('markMessagesRead', (data) => {
            setTimeout(() => {
                dispatch(markMessagesRead({ roomId: data.roomId }));
            }, 10000);
        });

        return () => {
            socket.off(`messageSent`, handleMessage);
            socket.off('newMessage');
        };
    }, [socket, room._id, dispatch, contact._id]);

    return (
        <Container>
            <Header>
                <img src={'/user.png'} alt="" />
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
                    <Message key={message._id} message={message} currId={me._id} socket={socket} roomId={room._id} color="#00ff00"/>
                ))}
                <div ref={endOfMessagesRef} />
                {contact.room.unreadMessagesSender !== me._id && unreadMessages.length > 0 && <p style={{textAlign: 'center', color: 'red', borderBottom: '2px solid red'}}>You have unread messages</p>}
                {unreadMessages.map((message) => (
                    <Message key={message._id} message={message} currId={me._id} socket={socket} roomId={room._id} color="yellow"/>
                ))}
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

export default React.memo(ChatPage);
