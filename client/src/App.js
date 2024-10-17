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
import { selectJwt } from './redux/user/user.selector';
import { Navigate } from 'react-router-dom';
import { SkeletonTheme } from 'react-loading-skeleton';
import { useTheme } from 'styled-components';


function App({ theme, setTheme }) {
    const [isLoading, setIsLoading] = useState(true);
    const currentTheme = useTheme();
    const [socket, setSocket] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector(selectUserInfo);
    const jwt = useSelector(selectJwt);

    useEffect(() => {
        // Initialize socket connection inside useEffect
        console.log(process.env.REACT_APP_SERVER_URI);
        const newSocket = io(process.env.REACT_APP_SERVER_URI);
        setSocket(newSocket);

        setIsLoading(false);

        if (user?._id) {
            newSocket.emit('markOnline', { userId: user._id });
        }

        // newSocket.on('contactStatusUpdate', (data) => {
        //     console.log(data);
        // });

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
        <SkeletonTheme baseColor={currentTheme.colors.quaternary} highlightColor={currentTheme.colors.secondary}>

            {
                isLoading ? <Loader /> :
                    <Routes>
                        <Route path='/signin' element={ jwt? <Navigate to='/chats'/> : <SignIn type='signin' />} />
                        <Route path="signup" element={ jwt ? <Navigate to='/chats' /> : <SignIn type='signup' />} />
                        <Route path='/' element={jwt ? <HomeLayout theme={theme} setTheme={setTheme} /> : <Navigate to={'/signin'} />} >
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
        </SkeletonTheme>
    );
}

export default App;
