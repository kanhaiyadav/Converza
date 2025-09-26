import React, { useState, useEffect } from "react";
import { ChatBody, ChatContainer } from "./chat.styles";
import { selectUserInfo } from "../../redux/user/user.selector";
import { useSelector } from "react-redux";
import Options from "./Options";
import { useSocket } from "../../context/SocketContext";
import StatusIndicator from "./StatusIndicator";

const Chat = ({ chat }) => {
    const [options, setOptions] = React.useState(false);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const me = useSelector(selectUserInfo);
    const date = new Date(chat?.lastMessage?.createdAt);
    const [status, setStatus] = useState("offline");
    const socket = useSocket();

    const otherUser = chat.participants.find((user) => user._id !== me._id);

    const hours = date.getHours(); // Get the hours in the local time zone
    const minutes = date.getMinutes(); // Get the minutes in the local time zone
    let formattedTime = "";

    useEffect(() => {
        if (!socket) return;

        socket.on(`status-update:${chat._id.toString()}`, (data) => {
            console.log("Status update received:", data);
            if (data && data.status) {
                setStatus(data.status);
            }
        });

        socket.emit("isOnline", chat._id, (response) => {
            console.log("Status update response:", response);
            if (response) {
                setStatus(response.status);
            }
        });

        socket.emit("isActive", chat._id, (response) => {
            console.log("Is active response:", response);
            if (response && response.isActive) {
                setStatus("active");
            }
        });

        return () => {
            socket.off("status-update");
            socket.off("isOnline");
            socket.off("isActive");
            socket.emit("chat-is-inactive", chat._id);
        };
    }, []);

    if (hours && minutes)
        formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}`;

    return (
        <ChatContainer
            to={chat._id}
            onContextMenu={(e) => {
                e.preventDefault();
                setPosition({ x: e.pageX, y: e.pageY });
                setOptions(true);
            }}
        >
            <div
                style={{
                    position: "relative",
                }}
            >
                <img src={"/user.png"} alt="" />
                <StatusIndicator
                    status={status}
                    style={{
                        display: status === "offline" ? "none" : "block",
                    }}
                />
            </div>
            <ChatBody>
                <div>
                    <span>{otherUser.name}</span>
                    {chat?.unreadCount > 0 &&
                        me._id !== chat?.lastMessage?.sender && (
                            <p>{chat.unreadCount}</p>
                        )}
                </div>
                <span>
                    {chat.lastMessage
                        ? chat.lastMessage.sender === me._id
                            ? "You: "
                            : ""
                        : ""}
                    {chat.lastMessage && chat.lastMessage.content
                        ? chat.lastMessage.content
                        : "No messages yet..."}
                    <span>{formattedTime}</span>
                </span>
            </ChatBody>
            {options && (
                <Options
                    closeOptions={() => setOptions(false)}
                    style={{ top: position.y, left: position.x }}
                    otherUser={otherUser}
                />
            )}
        </ChatContainer>
    );
};

export default React.memo(Chat);
