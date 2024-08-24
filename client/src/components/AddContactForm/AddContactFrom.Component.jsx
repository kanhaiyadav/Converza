import { Form } from "./AddContactFrom.styles"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newContact } from '../../redux/contacts/contacts.slice';
import { selectUserInfo } from "../../redux/user/user.selector";
import { toast } from 'react-toastify';

const AddContactFrom = ({closeModal}) => {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();
    const user = useSelector(selectUserInfo);

    const handleChange = (e) => {
        setUsername(e.target.value);
    }


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
    }
    
    return (
        <Form onSubmit={handleSubmit}>
            <h1>New Contact</h1>
            <input type="text" value={username} placeholder="username" onChange={handleChange} autoFocus/>
            <button type="submit">Add Contact</button>
        </Form>
    )
}

export default AddContactFrom;