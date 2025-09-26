import React, { useEffect } from "react";
import { ListDirectory } from "./Directory.styles";
import Chat from "../chat/Chat.Component";
import { useDispatch, useSelector } from "react-redux";
import { NoChat } from "./Directory.styles";
import { selectUserInfo } from "../../redux/user/user.selector";
import Searchbox from "../Searchbox/Searchbox.component";
import ChatSkeleton from "../ChatSkeleton/ChatSkeleton";
import { fetchChats } from "../../redux/chat/chat.slice";
import { selectChats } from "../../redux/chat/chat.selector";

const Directory = ({ socket, type, openModal }) => {
    const me = useSelector(selectUserInfo);
    const dispatch = useDispatch();
    const chats = useSelector(selectChats);
    const [loading, setLoading] = React.useState(true);
    // const [contactsArray, setContactsArray] = React.useState(Object.values(contacts));

    // React.useEffect(() => {
    //     setContactsArray(Object.values(contacts));
    // }, [contacts]);

    // React.useEffect(() => {
    //     const joinRooms = async () => {
    //         // Join all the contact rooms sequentially
    //         for (const key of Object.keys(contacts)) {
    //             await new Promise((resolve, reject) => {
    //                 socket.emit('bulkJoin', { room: key, userId: me._id }, (err, response) => {
    //                     if (err) {
    //                         // console.log(err);
    //                         reject(err);
    //                     } else {
    //                         resolve(response);
    //                     }
    //                 });
    //             });
    //         }

    //         // After all contact rooms are joined, join the blank_room
    //         socket.emit('bulkJoin', { room: blank_room, userId: me._id }, (err, response) => {
    //             if (err) {
    //                 // console.log(err);
    //             }
    //             // Optionally, handle the response or set state here
    //             // setMessages(response);
    //             // dispatch(resetUnreadMessagesCount(blank_room));
    //         });
    //     };

    //     joinRooms(); // Call the async function

    // }, [socket, me._id, contacts]);

    useEffect(() => {
        setLoading(true);
        dispatch(fetchChats(me._id)).unwrap()
            .then(() => {
                setLoading(false);
            })
            .catch((error) => {
                console.error("Failed to fetch chats:", error);
                setLoading(false);
            });
    }, [dispatch, me._id]);

    return (
        <>
            <Searchbox>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                    id="search"
                    type="text"
                    placeholder="Search a chat..."
                    // onChange={(e) => {
                    //     const search = e.target.value;
                    //     if (search === '') {
                    //         setContactsArray(Object.values(contacts));
                    //     } else {
                    //         const filtered = Object.values(contacts).filter((contact) => {
                    //             // console.log(contact.user.name.toLowerCase().includes(search.toLowerCase()));
                    //             return contact.user.name.toLowerCase().includes(search.toLowerCase());
                    //         });

                    //         filtered.sort((a, b) => {
                    //             const nameA = a.user.name.toLowerCase();
                    //             const nameB = b.user.name.toLowerCase();

                    //             if (nameA < nameB) return 1;
                    //             if (nameA > nameB) return -1;
                    //             return 0; // Keeps order the same if names are equal
                    //         });

                    //         setContactsArray(filtered);
                    //     }
                    // }}
                />
                <button
                // onClick={() => {
                //     document.getElementById('search').value = '';
                //     setContactsArray(Object.values(contacts));
                // }}
                >
                    <i className="fa-solid fa-x"></i>
                </button>
            </Searchbox>
            <ListDirectory>
                {loading ? (
                    <ChatSkeleton count={9} />
                ) : chats.length !== 0 ? (
                    chats.map((chat, index) => {
                        return <Chat chat={chat} key={index} />;
                    })
                ) : (
                    <NoChat>
                        <div>
                            <img src="/noChats.png" alt="No chats" />
                        </div>
                        <p>
                            Looks like you’ve mastered the art of social
                            distancing.
                        </p>
                        <button onClick={openModal}>Create new contact</button>
                    </NoChat>
                )}
            </ListDirectory>
        </>
    );
};

export default React.memo(Directory);
