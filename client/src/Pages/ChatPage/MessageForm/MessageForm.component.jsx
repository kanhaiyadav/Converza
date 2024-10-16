import { Form } from "./Message.styles";
import { useState } from "react";
import { selectUserInfo } from "../../../redux/user/user.selector";
import { useSelector } from 'react-redux';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import OptionModal from "../../../components/OptionModal/OptionModal";


const MessageFrom = ({ socket, contact }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [emoji, setEmoji] = useState(false);
    const { room } = contact;
    const me = useSelector(selectUserInfo);

    const [message, setMessage] = useState("");
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }
    const addEmoji = (emoji) => {
        setMessage(message + emoji.native);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        socket.emit("message", {
            content: message,
            sender: me._id,
            room: room._id,
            contact: contact._id,
        }, (err, responce) => {
            if (err) {  
                // console.log(err);
            }
            // console.log(responce);
        });
    }

    return (
        <Form id='message-form'
            onSubmit={handleSubmit}
        >
            <div style={{
                borderRadius: '50%',
                padding: '8px',
                color: 'grey',

            }}
                onClick={(e) => {
                    setPosition({ x: e.pageX, y: e.pageY });
                    setEmoji(!emoji);
                }}
            >
                <i className="fa-regular fa-face-smile"></i>
            </div>
            <span
                style={{
                    borderRadius: '50%',
                    padding: '8px',
                    color: 'grey',
                    marginLeft: '-10px',

                }}
            ><i className="fa-solid fa-paperclip"></i></span>
            <input onChange={handleMessageChange} type="text" placeholder='Type a message...' name="message" value={message} autoFocus required />
            {
                emoji &&
                <OptionModal closeModal={() => setEmoji(false)}
                        initial={{ top: position.y-100, opacity: 0 }}
                        animate={{ top: position.y - 470, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 17, duration: 0.1 }}
                    innerStyle={{
                        top: position.y-470,
                        left: position.x - 10,
                        backgroundColor: 'transparent',
                        padding: '0',
                        boxShadow: 'none',
                    }}>
                    <Picker data={data} onEmojiSelect={addEmoji} />
                </OptionModal>
            }
        </Form>
    )
};

export default MessageFrom;