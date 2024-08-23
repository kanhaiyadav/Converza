import { Form } from "./AddContactFrom.styles"
import { useEffect, useState } from 'react';
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";

const AddContactFrom = ({closeModal}) => {
    const [username, setUsername] = useState('');

    const handleChange = (e) => {
        setUsername(e.target.value);
    }

    const ADD_CONTACT = gql`
        mutation addContact($username: String!){
            createContact(username: $username){

            currUser{
                id
                name
            }
                contact{
                id
                user {
                    id
                    name
                    username
                    avatar
                }
                room{
                    id
                    messages{
                        id
                        content
                        sender{
                            id
                            name
                            username
                            avatar
                        }
                    }
                }
            }
            }
    }`;
    
    const [addContact, {loading, data, error}] = useMutation(ADD_CONTACT, {
        variables: { username: username },
        update(cache, { data }) {
            const contact = data.createContact.contact;
            const id = data.createContact.currUser.id;
            cache.modify({
                id: cache.identify({ id: id, __typename: 'User' }),
                fields: {
                    contacts(existingContacts = []) {
                        return [...existingContacts, contact];
                    }
                }
            });
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setUsername('');
        addContact();
    }

    useEffect(() => {
        if(data){
            closeModal();
        }
    }, [data, closeModal]);
    
    return (
        <Form onSubmit={handleSubmit}>
            <h1>New Contact</h1>
            <input type="text" value={username} placeholder="username" onChange={handleChange} autoFocus/>
            <button type="submit">Add Contact</button>
        </Form>
    )
}

export default AddContactFrom;