import { Form } from "./AddContactFrom.styles";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from "../../redux/user/user.selector";
import { toast } from 'react-toastify';
import { motion } from "framer-motion";
import { setOneChat } from "../../redux/chat/chat.slice";

const AddContactFrom = ({ closeModal }) => {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();
    const user = useSelector(selectUserInfo);

    const handleChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/v1/chats`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                participants: [username, user.username],
            }),
        });
        if (!res.ok) {
            console.error("Failed to create or fetch chat");
            return;
        }
        closeModal();
        toast.success("Contact added successfully!");
        const resJson = await res.json();
        dispatch(setOneChat(resJson.data));
        // dispatch(setSelectedChat(resJson.data));
    };

    // Define variants for parent and children
    const parentVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3, // Adjust the stagger delay
            },
        },
    };

    const childVariants = {
        hidden: { y: 100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 12,
            }
        },
    };

    return (
        <Form
            onSubmit={handleSubmit}
            variants={parentVariants}  
            initial="hidden"    
            animate="visible"        
            exit={{ scale: 0 }}
        >
            <h1>New Contact</h1>

            {/* Apply child animation */}
            <motion.input
                type="text"
                value={username}
                placeholder="username"
                onChange={handleChange}
                autoFocus
                variants={childVariants}  // Each child will animate according to its variants
            />

            <motion.button
                type="submit"
                variants={childVariants}  // Each child will animate according to its variants
            >
                Add Contact
            </motion.button>
        </Form>
    );
};

export default AddContactFrom;
