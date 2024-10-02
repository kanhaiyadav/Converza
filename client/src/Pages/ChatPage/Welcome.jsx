import React from 'react'
import { WelcomeTitle } from './Welcome.styles';
import { useDispatch } from 'react-redux';
import { updateBulkJoin } from '../../redux/contacts/contacts.slice';

const Welcome = ({socket}) => {
    const dispatch = useDispatch();
    

    React.useEffect(() => {
        const handleMessage = (data) => {
            console.log("user is inactive");
            socket.emit('unreadMessage', { roomId: data.roomId, sender: data.message.sender });
            dispatch(updateBulkJoin({ roomId: data.roomId, message: data.message }));   
        };

        socket.on(`messageSent`, handleMessage); // Use a unique event name

        socket.on('newMessage', (data, callback) => {
            callback({ messageSeen: false });
            console.log("new message received");
            socket.emit('messageNotSeen', { roomId: data.roomId, sender: data.message.sender });
            dispatch(updateBulkJoin({ roomId: data.roomId, message: data.message }));
        });

        return () => {
            socket.off(`messageSent`, handleMessage); // Clean up the correct listener
            socket.off('newMessage');
        };
    }, [socket, dispatch]);


    return (
        <div
            style={{
                textAlign: 'center',
                display: 'grid',
                placeContent: 'center',
                flexGrow: 1,
            }}
        >
            <img src='/chat.png' alt=''
                style={{
                    width: "150px",
                    height: "150px",
                    margin: 'auto'
                }}
            />

            <WelcomeTitle>Converza</WelcomeTitle>
            <p style={{
                color: 'grey',
                fontSize: '1.2rem'
            }}>Your go-to for seamless conversations</p>
        </div>
    )
}

export default Welcome;