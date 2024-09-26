import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import HomeLayout from './Pages/Home/Home.Layout';
import Status from './components/status/status.component';
import SecondaryNav from './components/SecondaryNav/SecondaryNav.component';
import Welcome from './Pages/ChatPage/Welcome';
import ChatPage from './Pages/ChatPage/ChatPage.component';
import SignIn from './Pages/SignIn/SignIn.component';
import { io } from 'socket.io-client';
import handleChatEvents from './sockets/chatSocket';
import { useDispatch } from 'react-redux';

const socket = io("http://localhost:5000");

function App({ theme, setTheme }) {    
    const dispatch = useDispatch();
    handleChatEvents(socket, dispatch);
    
    return (
        <>
            <Routes>
                <Route path='/signin' element={<SignIn type='signin' />} />
                <Route path="signup" element={<SignIn type='signup' />} />
                <Route path='/' element={<HomeLayout theme={theme} setTheme={setTheme} />}>
                    <Route index element={<Welcome />} />
                    <Route path='chats' element={<SecondaryNav socket={socket} type="Chats" />}>
                        <Route index element={<Welcome />} />
                        <Route path=':id' element={<ChatPage socket={socket} />} />
                    </Route>
                    <Route path='archive' element={<SecondaryNav type="Archive" />}>
                        <Route path=':id' element={<Status />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
