import { Form } from "./AddContactFrom.styles"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newContact } from '../../redux/contacts/contacts.slice';
import { selectUserInfo } from "../../redux/user/user.selector";

const AddContactFrom = ({closeModal}) => {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();
    const user = useSelector(selectUserInfo);

    const handleChange = (e) => {
        setUsername(e.target.value);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(newContact({
            myUsername: user.username,
            theirUsername: username
        })).unwrap()
            .then((res) => {
                closeModal();
                setUsername('');
        })
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