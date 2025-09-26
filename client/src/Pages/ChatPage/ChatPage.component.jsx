import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../redux/user/user.selector";
import {
    Container,
    Header,
    HeaderBody,
    Body,
    Footer,
    NewMessageBanner,
} from "./ChatPage.styles";
import RoundedButton from "../../components/RoundedButton/RoundedButton";
import Message from "../../components/Message/Message.component";
import { useDispatch } from "react-redux";
import Options from "./options";
import { useNavigate } from "react-router-dom";
import NoMessages from "./NoMessages";
import MessageSkeleton from "../../components/ChatSkeleton/MessageSkeleton";
import { useSocket } from "../../context/SocketContext";
import { selectChatById } from "../../redux/chat/chat.selector";
import MessageForm from "./MessageForm/MessageForm.component";
import {
    resetChatUnreadCount,
    setActiveChat,
} from "../../redux/chat/chat.slice";

const ChatPage = () => {
    const [options, setOptions] = React.useState(false);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [messages, setMessages] = React.useState(null);
    const me = useSelector(selectUserInfo);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const socket = useSocket();
    const [status, setStatus] = useState("offline");
    const statusRef = useRef("offline"); // Add ref to track current status
    const id = useParams().id;
    const selectedChat = useSelector(selectChatById(id));
    console.log("😂😂😂", selectedChat);
    const unreadMessagesCountRef = useRef(0);
    const endOfMessagesRef = useRef(null);

    const otherUser = selectedChat?.participants[0];

    // Update the ref whenever status changes
    useEffect(() => {
        statusRef.current = status;
    }, [status]);

    const appendMessage = useCallback((message) => {
        setMessages((prevMessages) => {
            const currentStatus = statusRef.current; // Use ref to get current status
            return [
                ...(prevMessages || []),
                {
                    ...message,
                    status:
                        currentStatus === "active"
                            ? "read"
                            : currentStatus === "online"
                            ? "delivered"
                            : "sent",
                },
            ];
        });
    }, []); // Remove status from dependencies since we're using ref

    useEffect(() => {
        if(selectedChat.lastMessage?.sender !== me._id) {
            unreadMessagesCountRef.current = selectedChat?.unreadCount || 0;
        }
        return () => {
            unreadMessagesCountRef.current = 0;
        };
    }, [messages, selectedChat?._id, selectedChat?.lastMessage, me._id]);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView();
        }
    }, [messages]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedChat?._id) return;
            const res = await fetch(
                `${process.env.REACT_APP_SERVER_URI}/api/v1/messages/${selectedChat._id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!res.ok) {
                console.error("Failed to fetch messages");
                setMessages([]);
                return;
            }
            const resJson = await res.json();
            setMessages(resJson.data);
        };
        fetchMessages();
    }, [selectedChat?._id]);

    useEffect(() => {
        if (!socket || !selectedChat?._id) return;

        console.log(
            "ChatPage: Setting up socket listeners for chat:",
            selectedChat._id
        );
        console.log("ChatPage: Socket ID:", socket.id);

        socket.emit("chat-is-active", selectedChat._id);

        socket.emit("isOnline", selectedChat._id, (response) => {
            console.log("Status update response:", response);
            if (response) {
                setStatus(response.status);
            }
        });

        socket.emit("isActive", selectedChat._id, (response) => {
            console.log("Is active response:", response);
            if (response && response.isActive) {
                setStatus("active");
            }
        });

        const handleStatusUpdate = (data) => {
            if (data && data.status) {
                setStatus(data.status);
                statusRef.current = data.status;
            }
        };

        const handleIsActive = (chatId, callback) => {
            callback({ isActive: chatId === selectedChat._id });
        };

        const handleNewMessage = (message) => {
            // Only handle messages for the current chat
            if (String(message.chat) === String(selectedChat._id)) {
                appendMessage(message);
            }
        };

        // Set up event listeners
        socket.on(`status-update:${selectedChat._id}`, handleStatusUpdate);
        socket.on("isActive", handleIsActive);

        // Listen to the original new-message event
        socket.on("new-message", handleNewMessage);

        return () => {
            socket.emit("chat-is-inactive", selectedChat._id);
            socket.off(`status-update:${selectedChat._id}`, handleStatusUpdate);
            socket.off("isActive", handleIsActive);
            socket.off("new-message", handleNewMessage);
        };
    }, [selectedChat?._id, socket, appendMessage]);

    useEffect(() => {
        dispatch(setActiveChat(selectedChat?._id));
        if (selectedChat?.lastMessage?.sender !== me._id) {
            socket?.emit("reset-chat-unread", selectedChat._id);
            dispatch(resetChatUnreadCount(selectedChat?._id));
        }
        return () => {
            dispatch(setActiveChat(null));
        };
    }, [
        selectedChat?._id,
        selectedChat?.lastMessage?.sender,
        me._id,
        socket,
        dispatch,
    ]);

    const closeChat = () => {
        navigate("../");
    };

    return (
        <Container>
            <Header>
                <img src={"/user.png"} alt="" />
                <HeaderBody status={status}>
                    <p>{otherUser?.name}</p>
                    <span>{status}</span>
                </HeaderBody>
            </Header>
            <Body
                className="styled-scrollbar"
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
                {messages === null ? (
                    <MessageSkeleton />
                ) : messages.length === 0 ? (
                    <NoMessages />
                ) : (
                    <>
                        {messages
                            .slice(
                                0,
                                -1 * unreadMessagesCountRef.current ||
                                    messages.length
                            )
                            .map((message, index) => (
                                <Message
                                    key={message._id}
                                    message={message}
                                    currId={me._id}
                                    socket={socket}
                                    roomId={selectChatById._id}
                                />
                            ))}
                        <div ref={endOfMessagesRef} />
                        {unreadMessagesCountRef.current > 0 && (
                            <NewMessageBanner>
                                <hr />
                                <div>
                                    {unreadMessagesCountRef.current} unread
                                    messages
                                </div>
                                <hr />
                            </NewMessageBanner>
                        )}
                        {unreadMessagesCountRef.current > 0 &&
                            messages
                                .slice(-1 * unreadMessagesCountRef.current)
                                .map((message, index) => (
                                    <Message
                                        key={message._id}
                                        message={message}
                                        currId={me._id}
                                        socket={socket}
                                        roomId={selectChatById._id}
                                    />
                                ))}
                    </>
                )}
            </Body>
            <Footer>
                <MessageForm
                    chat={selectedChat}
                    chatStatus={statusRef.current}
                />
                <RoundedButton type="submit" form="message-form">
                    <i className="fa-solid fa-paper-plane" />
                </RoundedButton>
            </Footer>
            {options && (
                <Options
                    closeChat={closeChat}
                    closeOptions={() => setOptions(false)}
                    style={{ top: position.y, left: position.x }}
                    contact={selectedChat}
                />
            )}
        </Container>
    );
};

export default React.memo(ChatPage);
