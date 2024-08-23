import React from 'react'
import { ListDirectory} from './Directory.styles'
import Chat from '../chat/Chat.Component';
import { selectContacts } from '../../redux/user/user.selector';
import { useSelector } from 'react-redux';
import { NoChat } from './Directory.styles';

const Directory = ({ type, openModal }) => {
    const contacts = useSelector(selectContacts);

    return (
        <ListDirectory>
            {
                contacts.length !== 0 ?
                    contacts.map((contact) => {
                        return <Chat contact={contact} key={contact._id} />
                    })
                    :
                    <NoChat>
                        <div>
                            <img src='/noChats.png' alt='No chats' />
                        </div>
                        <p>Looks like you’ve mastered the art of social distancing in your chat list!</p>
                        <button onClick={openModal}>Create new contact</button>
                    </NoChat>
            }
        </ListDirectory>
    )
}

export default Directory