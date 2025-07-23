import React, { useState, useEffect } from "react";
import { ChatBody, ChatContainer } from "./chat.styles";
import { selectUserInfo } from "../../redux/user/user.selector";
import { useSelector } from "react-redux";
import Options from "./Options";
import { useSocket } from "../../context/SocketContext";
import StatusIndicator from "./StatusIndicator";

const Chat = ({ contact }) => {
    const [options, setOptions] = React.useState(false);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const me = useSelector(selectUserInfo);
    const { room, user } = contact;
    const date = new Date(room.lastMessage?.createdAt);
    const [status, setStatus] = useState("offline");
    const socket = useSocket();

    // Get local time hours and minutes
    const hours = date.getHours(); // Get the hours in the local time zone
    const minutes = date.getMinutes(); // Get the minutes in the local time zone
    let formattedTime = "";

    useEffect(() => {
        if (!socket) return;

        socket.on(`status-update:${room._id.toString()}`, (data) => {
            console.log("Status update received:", data);
            if (data && data.status) {
                setStatus(data.status);
            }
        });

        socket.emit("isOnline", room._id, (response) => {
            console.log("Status update response:", response);
            if (response) {
                setStatus(response.status);
            }
        });

        socket.emit("isActive", room._id, (response) => {
            console.log("Is active response:", response);
            if (response && response.isActive) {
                setStatus("active");
            }
        });

        return () => {
            socket.off("status-update");
            socket.off("isOnline");
            socket.off("isActive");
            socket.emit("chat-is-inactive", room._id);
        };
    }, []);

    if (hours && minutes)
        formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}`;

    return (
        <ChatContainer
            to={contact.room._id}
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
                <StatusIndicator status={status} style={{
                    display: status === "offline" ? "none" : "block"
                }}/>
            </div>
            <ChatBody>
                <div>
                    <span>{user.name}</span>
                    {contact.room.unreadMessageSender &&
                    me._id !== contact.room.unreadMessageSender &&
                    contact.room.unreadMessagesCount ? (
                        <p>{room.unreadMessagesCount}</p>
                    ) : (
                        ""
                    )}
                </div>
                <span>
                    {room.lastMessage
                        ? room.lastMessage.sender === me._id
                            ? "You: "
                            : ""
                        : ""}
                    {room.lastMessage
                        ? room.lastMessage.content
                        : "No messages yet..."}
                    <span>{formattedTime}</span>
                </span>
            </ChatBody>
            {options && (
                <Options
                    closeOptions={() => setOptions(false)}
                    style={{ top: position.y, left: position.x }}
                    contact={contact}
                />
            )}
        </ChatContainer>
    );
};

export default React.memo(Chat);
