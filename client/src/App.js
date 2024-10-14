import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import HomeLayout from './Pages/Home/Home.Layout';
import Status from './components/status/status.component';
import SecondaryNav from './components/SecondaryNav/SecondaryNav.component';
import Welcome from './Pages/ChatPage/Welcome';
import ChatPage from './Pages/ChatPage/ChatPage.component';
import SignIn from './Pages/SignIn/SignIn.component';
import { io } from 'socket.io-client';
import Loader from './components/Loader/Loader';
import { deleteMessage } from './redux/contacts/contacts.slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectUserInfo } from './redux/user/user.selector';


function App({ theme, setTheme }) {
    const [isLoading, setIsLoading] = useState(true);
    const [socket, setSocket] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector(selectUserInfo);

    useEffect(() => {
        // Initialize socket connection inside useEffect
        const newSocket = io("http://localhost:5000");
        setSocket(newSocket);

        setIsLoading(false);

        if (user?._id) {
            newSocket.emit('markOnline', { userId: user._id });
        }

        newSocket.on('contactStatusUpdate', (data) => {
            console.log(data);
        });

        newSocket.on('messageDeleted', (data) => {
            dispatch(deleteMessage(data));
        });

        return () => {
            newSocket.off('messageDeleted');
            newSocket.off('markOnline');
            newSocket.disconnect(); // Clean up the socket connection
        };
    }, [dispatch, user._id]);

    return (
        <>
            {
                isLoading ? <Loader /> :
                    <Routes>
                        <Route path='/signin' element={<SignIn type='signin' />} />
                        <Route path="signup" element={<SignIn type='signup' />} />
                        <Route path='/' element={<HomeLayout theme={theme} setTheme={setTheme} />} >
                            <Route index element={<Welcome socket={socket} />} />
                            <Route path='chats' element={<SecondaryNav socket={socket} type="Chats" />} >
                                <Route index element={<Welcome socket={socket} />} />
                                <Route path=':id' element={<ChatPage socket={socket} />} />
                            </Route>
                            <Route path='archive' element={<SecondaryNav type="Archive" />} >
                                <Route path=':id' element={<Status />} />
                            </Route>
                        </Route>
                    </Routes>
            }
        </>
    );
}

export default App;
