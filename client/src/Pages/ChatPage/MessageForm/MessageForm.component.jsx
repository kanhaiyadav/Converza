import { Form } from "./Message.styles";
import { useState, useRef, useEffect } from "react";
import { selectUserInfo } from "../../../redux/user/user.selector";
import { useSelector } from "react-redux";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import OptionModal from "../../../components/OptionModal/OptionModal";
import { useSocket } from "../../../context/SocketContext";

const MessageForm = ({ chat, chatStatus }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [emoji, setEmoji] = useState(false);
    const me = useSelector(selectUserInfo);
    const socket = useSocket();
    const inputRef = useRef(null);

    const [message, setMessage] = useState("");

    // Focus input when component mounts or chat changes
    useEffect(() => {
        if (inputRef.current) {
            // Small delay to ensure DOM is ready and other focus events have completed
            const timeoutId = setTimeout(() => {
                inputRef.current.focus();
            }, 100);

            return () => clearTimeout(timeoutId);
        }
    }, [chat?._id]); // Focus when chat changes

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };
    const addEmoji = (emoji) => {
        setMessage(message + emoji.native);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        const newMessage = {
            content: message,
            sender: me._id,
            chat: chat._id,
            status:
                chatStatus === "active"
                    ? "read"
                    : chatStatus === "online"
                    ? "delivered"
                    : "sent",
        };
        console.log("Sending message:", newMessage);
        socket.emit("message", newMessage);
    };

    return (
        <Form id="message-form" onSubmit={handleSubmit} className="glass">
            <div
                style={{
                    borderRadius: "50%",
                    padding: "8px",
                    color: "grey",
                }}
                onClick={(e) => {
                    setPosition({ x: e.pageX, y: e.pageY });
                    setEmoji(!emoji);
                }}
            >
                <i className="fa-regular fa-face-smile"></i>
            </div>
            {/* <span
                style={{
                    borderRadius: '50%',
                    padding: '8px',
                    color: 'grey',
                    marginLeft: '-10px',

                }}
            ><i className="fa-solid fa-paperclip"></i></span> */}
            <input
                ref={inputRef}
                onChange={handleMessageChange}
                type="text"
                placeholder="Type a message..."
                name="message"
                value={message}
                required
            />
            {emoji && (
                <OptionModal
                    closeModal={() => setEmoji(false)}
                    initial={{ top: position.y - 100, opacity: 0 }}
                    animate={{ top: position.y - 470, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 17,
                        duration: 0.1,
                    }}
                    innerStyle={{
                        width: "200px",
                        top: position.y - 470,
                        left: position.x - 83,
                        backgroundColor: "transparent",
                        padding: "0",
                        boxShadow: "none",
                    }}
                >
                    <Picker
                        data={data}
                        onEmojiSelect={addEmoji}
                        style={{ width: "100%" }}
                    />
                </OptionModal>
            )}
        </Form>
    );
};

export default MessageForm;
