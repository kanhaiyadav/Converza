import React from 'react'
import { ListDirectory } from './Directory.styles'
import Chat from '../chat/Chat.Component';
import { useSelector } from 'react-redux';
import { selectAllContacts } from '../../redux/contacts/contact.selector';


const Directory = ({ type }) => {
    const chats = useSelector(selectAllContacts);
    return (
        <ListDirectory>
            {
                chats.map((chat) => (
                    <Chat key={chat._id} to={chat._id} img={chat.img || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} name={chat.name || chat.phoneNo} subtext={chat.subtext} />
                ))
            }
        </ListDirectory>
    )
}

export default Directory