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
                    <Chat key={chat.to} to={chat.to} img={chat.img} name={chat.name} subtext={chat.subtext} />
                ))
            }
        </ListDirectory>
    )
}

export default Directory