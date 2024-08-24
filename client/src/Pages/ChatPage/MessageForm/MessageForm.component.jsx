import { Form } from "./Message.styles";
import { useState } from "react";
import { selectUserInfo } from "../../../redux/user/user.selector";
import { useSelector } from 'react-redux';


const MessageFrom = ({ socket, contact }) => {

    const { room, user } = contact;
    const me = useSelector(selectUserInfo);

    const [message, setMessage] = useState("");
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        socket.emit("message", {
            content: message,
            sender: me._id,
            room: room._id,
        }, (err, responce) => {
            if (err) {
                console.log(err);
            }
            console.log(responce);
        });
    }

    return (
        <Form id='message-form'
            onSubmit={handleSubmit}
        >
            <span style={{
                borderRadius: '50%',
                padding: '8px',
                color: 'grey',

            }}><i className="fa-regular fa-face-smile"></i></span>
            <span
                style={{
                    borderRadius: '50%',
                    padding: '8px',
                    color: 'grey',
                    marginLeft: '-10px',

                }}
            ><i className="fa-solid fa-paperclip"></i></span>
            <input onChange={handleMessageChange} type="text" placeholder='Type a message...' name="message" value={message} autoFocus required />
        </Form>
    )
};

export default MessageFrom;