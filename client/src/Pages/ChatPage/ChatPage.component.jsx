import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../redux/user/user.selector';
import { selectContact, selectMessages, selectUnreadMessages } from '../../redux/contacts/contact.selector';
import { Container, Header, HeaderBody, Body, Footer } from './ChatPage.styles';
import RoundedButton from '../../components/RoundedButton/RoundedButton';
import Message from '../../components/Message/Message.component';
import MessageFrom from './MessageForm/MessageForm.component';
import { roomJoinUpdate, addOneReadMessage, addOneUnreadMessage, markMessagesRead, bannerShown } from '../../redux/contacts/contacts.slice';
import { useDispatch } from 'react-redux';
import { NewMessageBanner } from './NewMessageBanner.styles';
import { RiMenu5Fill } from "react-icons/ri";
import Options from './options';
import { useNavigate } from 'react-router-dom';
import NoMessages from './NoMessages';
import MessageSkeleton from '../../components/ChatSkeleton/MessageSkeleton';

const ChatPage = ({ socket }) => {
    const [options, setOptions] = React.useState(false);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [showUnreadBanner, setShowUnreadBanner] = useState(false);
    const id = useParams().id;
    const contact = useSelector(selectContact(id));
    const { user, room } = contact;
    const me = useSelector(selectUserInfo);
    const endOfMessagesRef = useRef(null);
    const dispatch = useDispatch();
    const messages = useSelector(selectMessages(room._id));
    const unreadMessages = useSelector(selectUnreadMessages(room._id));
    const unreadMessageBannerHeight = contact.room.unreadMessageBannerHeight ? contact.room.unreadMessageBannerHeight : 0;
    const messagesCount = messages.length;
    const navigate = useNavigate();
    const [loadingMessages, setMessages] = React.useState(true);


    useEffect(() => {
        if (unreadMessageBannerHeight > 0) {
            setShowUnreadBanner(true);

            const timer = setTimeout(() => {
                dispatch(bannerShown({ roomId: room._id }));
                setShowUnreadBanner(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [unreadMessageBannerHeight, dispatch, room._id]); // Use length instead of the full array to avoid deep comparisons



    // Scroll to bottom when messages change
    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView();
    }, [messages]);

    // Join the room when the component mounts
    useEffect(() => {
        socket.emit('join', { room: room._id, userId: me._id }, (err, response) => {
            if (err) {
                // console.log(err);
            }
            dispatch(roomJoinUpdate({ roomId: room._id, messages: response, userId: me._id }));
            setMessages(false)
        });
    }, [socket, room._id, dispatch, me._id]);

    // Listen for new messages (use a stable callback)
    useEffect(() => {
        socket.on('messageNotRecieved', (data) => {
            dispatch(addOneUnreadMessage({ message: data.message, userId: me._id }));
        });

        socket.on('newMessage', (data, callback) => {
            // console.log(contact.room.unreadMessageSender, me._id);
            if (data.roomId === room._id) {
                callback({ messageSeen: true });
                dispatch(addOneReadMessage({ message: data.message }));
            }
            else {
                callback({ messageSeen: false });
                dispatch(addOneUnreadMessage({ message: data.message, userId: me._id }));
            }
        });

        socket.on('messageSeen', (data) => {
            dispatch(addOneReadMessage({ message: data.message }));
        });

        socket.on('messageNotSeen', (data) => {
            dispatch(addOneUnreadMessage({ message: data.message, userId: me._id }));
        });

        socket.on('markMessagesRead', (data) => {
            dispatch(markMessagesRead({ roomId: data.roomId }));
        });

        return () => {
            socket.off('messageNotRecieved');
            socket.off('messageSeen');
            socket.off('messageNotSeen');
            socket.off('markMessagesRead');
            socket.off('newMessage');
        };
    }, [socket, room._id, dispatch, contact._id, me._id, contact.room.unreadMessageSender]);

    const closeChat = () => {
        navigate("../");
    };

    return (
        <Container>
            <Header>
                <img src={'/user.png'} alt="" />
                <HeaderBody>
                    <p>{user.name}</p>
                    <span>{user.status}</span>
                </HeaderBody>
            </Header>
            <Body
                onContextMenu={(e) => {
                    e.preventDefault();
                    const menuWidth = 150; // Approximate width of the options menu
                    const menuHeight = 75; // Approximate height of the options menu
                    const windowWidth = window.innerWidth;
                    const windowHeight = window.innerHeight;

                    let x = e.pageX;
                    let y = e.pageY;

                    // console.log(x + menuWidth, windowWidth);
                    // console.log(y + menuHeight, windowHeight);

                    // Check if the menu would overflow on the right
                    if (x + menuWidth > windowWidth) {
                        x = windowWidth - menuWidth;
                    }

                    // Check if the menu would overflow on the bottom
                    if (y + menuHeight > windowHeight) {
                        y = windowHeight - menuHeight;
                    }
                    setPosition({ x: x, y: y });
                    setOptions(true);
                }}
            >
                {
                    loadingMessages ? <MessageSkeleton /> :
                        messages.length === 0 && unreadMessages.length === 0 ? (
                            <NoMessages />
                        ) : (
                                <>
                                    {/* <MessageSkeleton /> */}
                                {
                                    messages.map((message, index) => {
                                        if (index !== (messagesCount - unreadMessageBannerHeight))
                                            return <Message key={message._id} message={message} currId={me._id} socket={socket} roomId={room._id} color="#00ff00" />
                                        else {
                                            if ((contact.room.unreadMessageSender !== me._id) && showUnreadBanner) {
                                                return (
                                                    <>
                                                        <NewMessageBanner><p>You have unread messages</p></NewMessageBanner>
                                                        <Message key={message._id} message={message} currId={me._id} socket={socket} roomId={room._id} color="#00ff00" />
                                                    </>
                                                )
                                            }
                                            else
                                                return <Message key={message._id} message={message} currId={me._id} socket={socket} roomId={room._id} color="#00ff00" />
                                        }
                                    }
                                    )
                                }
                                <div ref={endOfMessagesRef} />
                                {unreadMessages.map((message) => (
                                    <Message key={message._id} message={message} currId={me._id} socket={socket} roomId={room._id} color="yellow" />
                                ))}
                            </>
                        )
                }
            </Body>
            <Footer>
                <MessageFrom socket={socket} contact={contact} />
                <RoundedButton type="submit" form="message-form">
                    <i className="fa-solid fa-paper-plane" />
                </RoundedButton>
            </Footer>
            {options && <Options closeChat={closeChat} closeOptions={() => setOptions(false)} style={{ top: position.y, left: position.x }} contact={contact} />}

        </Container>
    );
};

export default React.memo(ChatPage);
