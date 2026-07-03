import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserInfo, selectJwt } from "../../redux/user/user.selector";
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
    const jwt = useSelector(selectJwt);
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

    const otherUser = selectedChat?.participants?.find((p) => p._id !== me._id);

    // Chats haven't loaded yet right after a refresh, so selectedChat is
    // briefly undefined for a legitimate chat too. Only treat it as "gone"
    // (e.g. deleted from another tile/tab) once we've actually seen it
    // exist for this id - otherwise we'd bounce the user away on every load.
    const hadChatRef = useRef(false);
    useEffect(() => {
        hadChatRef.current = false;
    }, [id]);
    useEffect(() => {
        if (selectedChat) {
            hadChatRef.current = true;
        } else if (hadChatRef.current) {
            navigate("/chats");
        }
    }, [selectedChat, navigate]);

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
        if(selectedChat?.lastMessage?.sender !== me._id) {
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
                        Authorization: jwt,
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
    }, [selectedChat?._id, jwt]);

    useEffect(() => {
        if (!socket || !selectedChat?._id) return;

        console.log(
            "ChatPage: Setting up socket listeners for chat:",
            selectedChat._id
        );
        console.log("ChatPage: Socket ID:", socket.id);

        // Re-announces presence for this chat. Must run again after every
        // reconnect (not just once on mount) since the server-side socket
        // room membership and "active" broadcast don't survive a dropped
        // connection (e.g. an idle background tab getting ping-timed-out).
        const announcePresence = () => {
            socket.emit("chat-is-active", selectedChat._id);

            socket.emit("isOnline", selectedChat._id, (response) => {
                if (response) {
                    setStatus(response.status);
                }
            });

            socket.emit("isActive", selectedChat._id, (response) => {
                if (response && response.isActive) {
                    setStatus("active");
                }
            });
        };

        announcePresence();
        socket.on("connect", announcePresence);

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
            socket.off("connect", announcePresence);
            socket.off(`status-update:${selectedChat._id}`, handleStatusUpdate);
            socket.off("isActive", handleIsActive);
            socket.off("new-message", handleNewMessage);
        };
    }, [selectedChat?._id, socket, appendMessage]);

    useEffect(() => {
        dispatch(setActiveChat(selectedChat?._id));
        if (selectedChat?._id && selectedChat?.lastMessage?.sender !== me._id) {
            socket?.emit("reset-chat-unread", selectedChat._id);
            dispatch(resetChatUnreadCount(selectedChat._id));
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
                    <span>{selectedChat?.blockedBy?.length > 0 ? "blocked" : status}</span>
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
                                    roomId={selectedChat?._id}
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
                                        roomId={selectedChat?._id}
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
                <RoundedButton
                    type="submit"
                    form="message-form"
                    disabled={selectedChat?.blockedBy?.length > 0}
                >
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
