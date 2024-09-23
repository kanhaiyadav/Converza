import { Form } from "./AddContactFrom.styles";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newContact } from '../../redux/contacts/contacts.slice';
import { selectUserInfo } from "../../redux/user/user.selector";
import { toast } from 'react-toastify';
import { delay, motion } from "framer-motion";

const AddContactFrom = ({ closeModal }) => {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();
    const user = useSelector(selectUserInfo);

    const handleChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const promise = dispatch(newContact({
            myUsername: user.username,
            theirUsername: username
        })).unwrap();
        toast.promise(promise, {
            pending: 'Adding Contact...',
            success: {
                render({ data }) {
                    closeModal();
                    setUsername('');
                    return data.message;
                }
            },
            error: {
                render({ data }) {
                    return data.message;
                }
            }
        });
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
            variants={parentVariants}  // Apply variants to the parent
            initial="hidden"           // Start with the hidden state
            animate="visible"           // Animate to the visible state
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
