import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { selectUserInfo } from "../redux/user/user.selector";
import { deleteMessage } from "../redux/contacts/contacts.slice";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const userData = useSelector(selectUserInfo);
    console.log("SocketProvider userData:", userData);
    const [socket, setSocket] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const init = () => {
            const newSocket = io(process.env.REACT_APP_SERVER_URI);
            setSocket(newSocket);

            newSocket.emit("join-online-room", userData._id);

            newSocket.emit("markOnline", { userId: userData._id });

            newSocket.on("messageDeleted", (data) => {
                dispatch(deleteMessage(data));
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
