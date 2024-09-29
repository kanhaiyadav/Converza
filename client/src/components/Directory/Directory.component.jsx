import React from 'react'
import { ListDirectory} from './Directory.styles'
import Chat from '../chat/Chat.Component';
import { selectContacts } from '../../redux/contacts/contact.selector';
import { useSelector } from 'react-redux';
import { NoChat } from './Directory.styles';
import { selectUserInfo } from '../../redux/user/user.selector';

const Directory = ({ socket, type, openModal }) => {
    const me = useSelector(selectUserInfo); 
    const contacts = useSelector(selectContacts);
    const blank_room = '66f9499a5fd39ff250be10f9';
    React.useEffect(() => {
        const joinRooms = async () => {
            // Join all the contact rooms sequentially
            for (const key of Object.keys(contacts)) {
                await new Promise((resolve, reject) => {
                    socket.emit('bulkJoin', { room: key, userId: me._id }, (err, response) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            resolve(response);
                        }
                    });
                });
            }

            // After all contact rooms are joined, join the blank_room
            socket.emit('bulkJoin', { room: blank_room, userId: me._id }, (err, response) => {
                if (err) {
                    console.log(err);
                }
                // Optionally, handle the response or set state here
                // setMessages(response);
                // dispatch(resetUnreadMessagesCount(blank_room));
            });
        };

        joinRooms(); // Call the async function

    }, [socket, me._id, contacts]);

    return (
        <ListDirectory>
            {
                Object.keys(contacts).length !== 0?
                    Object.keys(contacts).map((key) => {
                        return <Chat contact={contacts[key]} key={key} />
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