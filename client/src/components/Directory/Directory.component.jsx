import React from 'react'
import { ListDirectory} from './Directory.styles'
import Chat from '../chat/Chat.Component';
import { selectContacts } from '../../redux/user/user.selector';
import { useSelector } from 'react-redux';
import { NoChat } from './Directory.styles';
import { selectUserInfo } from '../../redux/user/user.selector';

const Directory = ({ socket, type, openModal }) => {
    const me = useSelector(selectUserInfo); 
    const contacts = useSelector(selectContacts);
    const blank_room = '66f656d722b21e5df07dcc79';
    React.useEffect(() => {
        contacts.forEach((contact) => {
            socket.emit('bulkJoin', { room: contact.room._id, userId: me._id }, (err, response) => {
                if (err) {
                    console.log(err);
                }
            });
        });
        socket.emit('bulkJoin', { room: blank_room, userId: me._id }, (err, response) => {
            if (err) {
                console.log(err);
            }
            // setMessages(response);
            // dispatch(resetUnreadMessagesCount(room._id));
        });

    }, [socket, me._id, contacts]);

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

export default React.memo(Directory);