import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { selectUserInfo } from "../redux/user/user.selector";
import { selectActiveChat } from "../redux/chat/chat.selector";
import {
    increamentChatUnreadCount,
    updateChatLastMessage,
    updateUnreadChats,
} from "../redux/chat/chat.slice";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const userData = useSelector(selectUserInfo);
    const [socket, setSocket] = useState(null);
    const dispatch = useDispatch();
    const activeChatId = useSelector(selectActiveChat);

    useEffect(() => {
        const init = () => {
            const newSocket = io(process.env.REACT_APP_SERVER_URI);
            setSocket(newSocket);

            newSocket.emit("join-online-room", userData._id);

            newSocket.on("messageDeleted", (data) => {
                // dispatch(deleteMessage(data));
            });
        };
        if (userData?._id) {
            init();
            return () => {
                if (socket) {
                    socket.disconnect();
                }
            };
        }
    }, [userData._id]);

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
