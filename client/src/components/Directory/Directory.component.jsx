import React from 'react'
import { ListDirectory } from './Directory.styles'
import Chat from '../chat/Chat.Component';
import { selectContacts } from '../../redux/contacts/contact.selector';
import { useSelector } from 'react-redux';
import { NoChat } from './Directory.styles';
import { selectUserInfo } from '../../redux/user/user.selector';
import Searchbox from '../Searchbox/Searchbox.component';

const Directory = ({ socket, type, openModal }) => {
    const me = useSelector(selectUserInfo);
    const contacts = useSelector(selectContacts);
    const blank_room = '66f9499a5fd39ff250be10f9';
    const [contactsArray, setContactsArray] = React.useState(Object.values(contacts));

    React.useEffect(() => {
        setContactsArray(Object.values(contacts));
    }, [contacts]);
    
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
        <>
            <Searchbox>
                <i className="fa-solid fa-magnifying-glass fa-bounce"></i>
                <input id='search' type="text" placeholder='Search a chat...'
                    onChange={(e) => {
                        const search = e.target.value;
                        if (search === '') {
                            setContactsArray(Object.values(contacts));
                        } else {
                            const filtered = Object.values(contacts).filter((contact) => {
                                console.log(contact.user.name.toLowerCase().includes(search.toLowerCase()));
                                return contact.user.name.toLowerCase().includes(search.toLowerCase());
                            });

                            filtered.sort((a, b) => {
                                const nameA = a.user.name.toLowerCase();
                                const nameB = b.user.name.toLowerCase();

                                if (nameA < nameB) return 1;
                                if (nameA > nameB) return -1;
                                return 0; // Keeps order the same if names are equal
                            });
                            
                            setContactsArray(filtered);
                        }
                    }}
                />
                <button
                    onClick={() => {
                        document.getElementById('search').value = '';
                        setContactsArray(Object.values(contacts));
                    }}
                ><i className="fa-solid fa-x"></i></button>
            </Searchbox>
            <ListDirectory>
                {
                    Object.values(contacts).length !== 0 ?
                        contactsArray.map((contact, index) => {
                            return <Chat contact={contact} key={index} />
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
        </>
    )
}

export default React.memo(Directory);