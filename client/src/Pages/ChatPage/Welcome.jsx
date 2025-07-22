import React from 'react'
import { WelcomeTitle } from './Welcome.styles';
import { useDispatch } from 'react-redux';
import { updateBulkJoin } from '../../redux/contacts/contacts.slice';
import { Container } from './Welcome.styles';
import { useSocket } from '../../context/SocketContext';

const Welcome = () => {
    const dispatch = useDispatch();
    const socket = useSocket();


    React.useEffect(() => {
        socket.on('newMessage', (data, callback) => {
            callback({ messageSeen: false });
            console.log("new message received");
            socket.emit('messageNotSeen', { roomId: data.roomId, sender: data.message.sender });
            dispatch(updateBulkJoin({ roomId: data.roomId, message: data.message }));
        });

        return () => {
            socket.off('newMessage');
        };
    }, [socket, dispatch]);


    return (
        <Container
        // style={{
        //     textAlign: 'center',
        //     display: 'grid',
        //     placeContent: 'center',
        //     flexGrow: 1,
        // }}
        >
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <path stroke="none"  fill="#932ef9">
                        <animate
                            attributeName='d'
                            dur='5s'
                            repeatCount='indefinite'
                            values='
                                M74,62.5Q65,75,45.5,83.5Q26,92,16,71Q6,50,23,41Q40,32,50.5,31.5Q61,31,72,40.5Q83,50,74,62.5Z;
                                M72.5,68.5Q72,87,52.5,83Q33,79,20,64.5Q7,50,21.5,37.5Q36,25,48,29Q60,33,66.5,41.5Q73,50,72.5,68.5Z;
                                M74,66Q68,82,48.5,84Q29,86,26,68Q23,50,27.5,34.5Q32,19,47,24.5Q62,30,71,40Q80,50,74,66Z;
                                M70.5,64.5Q67,79,46.5,85.5Q26,92,14.5,71Q3,50,21.5,41Q40,32,49,34Q58,36,66,43Q74,50,70.5,64.5Z;
                                M74,62.5Q65,75,45.5,83.5Q26,92,16,71Q6,50,23,41Q40,32,50.5,31.5Q61,31,72,40.5Q83,50,74,62.5Z;
                            '
                        ></animate>
                    </path>
                </svg>
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <path stroke="none"  fill="#be55f6">
                        <animate
                            attributeName='d'
                            dur='5s'
                            repeatCount='indefinite'
                            values='
                                M72.5,68.5Q72,87,52.5,83Q33,79,20,64.5Q7,50,21.5,37.5Q36,25,48,29Q60,33,66.5,41.5Q73,50,72.5,68.5Z;
                                M74,62.5Q65,75,45.5,83.5Q26,92,16,71Q6,50,23,41Q40,32,50.5,31.5Q61,31,72,40.5Q83,50,74,62.5Z;
                                M70.5,64.5Q67,79,46.5,85.5Q26,92,14.5,71Q3,50,21.5,41Q40,32,49,34Q58,36,66,43Q74,50,70.5,64.5Z;
                                M74,66Q68,82,48.5,84Q29,86,26,68Q23,50,27.5,34.5Q32,19,47,24.5Q62,30,71,40Q80,50,74,66Z;
                                M72.5,68.5Q72,87,52.5,83Q33,79,20,64.5Q7,50,21.5,37.5Q36,25,48,29Q60,33,66.5,41.5Q73,50,72.5,68.5Z;
                            '
                        ></animate>
                    </path>
                </svg>
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <path stroke="none"  fill="#df55e5">
                        <animate
                            attributeName='d'
                            dur='5s'
                            repeatCount='indefinite'
                            values='
                                M70.5,69Q72,88,55,79.5Q38,71,29.5,60.5Q21,50,31.5,42.5Q42,35,51.5,33.5Q61,32,65,41Q69,50,70.5,69Z;
                                M69.5,66Q69,82,53,77.5Q37,73,22.5,61.5Q8,50,23,40Q38,30,48.5,32.5Q59,35,64.5,42.5Q70,50,69.5,66Z;
                                M75.5,65Q67,80,49.5,80.5Q32,81,27.5,65.5Q23,50,29,37Q35,24,47,29Q59,34,71.5,42Q84,50,75.5,65Z;
                                M70.5,69Q72,88,55,79.5Q38,71,29.5,60.5Q21,50,31.5,42.5Q42,35,51.5,33.5Q61,32,65,41Q69,50,70.5,69Z;
                            '
                        ></animate>
                    </path>
                </svg>
                <img src='/icon.svg' alt='icon' />
            </div>

            <WelcomeTitle>Converza</WelcomeTitle>
            <p>Your go-to for seamless conversations</p>
        </Container>
    )
}

export default Welcome;