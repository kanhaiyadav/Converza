import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { selectUserInfo, selectJwt } from "../redux/user/user.selector";
import { selectActiveChat } from "../redux/chat/chat.selector";
import {
    increamentChatUnreadCount,
    updateChatLastMessage,
    updateUnreadChats,
    setOneChat,
} from "../redux/chat/chat.slice";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const userData = useSelector(selectUserInfo);
    const jwt = useSelector(selectJwt);
    const [socket, setSocket] = useState(null);
    const dispatch = useDispatch();
    const activeChatId = useSelector(selectActiveChat);
    // A ref (not the `socket` state) so cleanup always disconnects the
    // socket that was actually created by *this* effect run, instead of a
    // stale closure value - and so `socket` doesn't need to be a dependency,
    // which would otherwise re-fire this effect every time it's set and
    // open a new connection in a loop.
    const socketRef = useRef(null);

    useEffect(() => {
        const init = () => {
            const newSocket = io(process.env.REACT_APP_SERVER_URI, {
                auth: { token: jwt?.replace(/^Bearer\s+/i, "") },
            });
            socketRef.current = newSocket;
            setSocket(newSocket);

            // Fires on the initial connection AND every automatic reconnect
            // (e.g. after a background-tab ping timeout). Room membership
            // lives on the server-side socket, so it must be re-established
            // every time a new underlying connection is made, not just once.
            newSocket.on("connect", () => {
                newSocket.emit("join-online-room");
            });

            newSocket.on("messageDeleted", (data) => {
                // dispatch(deleteMessage(data));
            });
        };
        if (userData?._id && jwt) {
            init();
            return () => {
                socketRef.current?.disconnect();
                socketRef.current = null;
            };
        }
    }, [userData._id, jwt]);

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (data) => {
            console.log(
                "SocketContext: Received new-message, activeChatId:",
                activeChatId
            );

            // Use setTimeout to ensure this runs after other handlers
            setTimeout(() => {
                // Handle global chat list updates
                if (
                    userData._id !== data.sender &&
                    data.chat !== activeChatId
                ) {
                    dispatch(increamentChatUnreadCount(data.chat));
                    dispatch(updateUnreadChats(data.chat));
                }
                dispatch(
                    updateChatLastMessage({
                        ...data,
                        timestamp: data.createdAt,
                    })
                );
            }, 0);
        };

        socket.on("new-message", handleNewMessage);
        return () => {
            socket.off("new-message", handleNewMessage);
        };
    }, [activeChatId, userData._id, socket, dispatch]);

    useEffect(() => {
        if (!socket) return;

        const handleNewChat = (chat) => {
            dispatch(setOneChat(chat));
        };

        socket.on("new-chat", handleNewChat);
        return () => {
            socket.off("new-chat", handleNewChat);
        };
    }, [socket, dispatch]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context.socket;
};
