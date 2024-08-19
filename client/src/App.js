import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import HomeLayout from './Pages/Home/Home.Layout';
import Calls from './components/calls/calls.component';
import Status from './components/status/status.component';
import SecondaryNav from './components/SecondaryNav/SecondaryNav.component';
import Welcome from './Pages/ChatPage/Welcome';
import ChatPage from './Pages/ChatPage/ChatPage.component';
import SignUpPage from './Pages/SignUp/SignUp.component';
import SignIn from './Pages/SignIn/SignIn.component';
import { io } from 'socket.io-client';

const socket = io("http://localhost:5000");
function App({theme, setTheme }) {
    // useEffect(() => {
    // if (!jwt) {
    //     navigate('/signin');
    // }
    // else {
    //     if (!socket.connected) {
    //         socket.connect();
    //     }
    //     socket.on('userJoined', (message) => {
    //         console.log(message)
    //     });
    //     socket.on('disconnect', (reason) => {
    //         console.log('Socket disconnected:', reason);
    //     });

    //     // Cleanup on unmount
    //     return () => {
    //         socket.off('connect');
    //         socket.off('userJoined');
    //         socket.off('messageRecieved');
    //         socket.off('disconnect');
    //     };
    // }
    // },[navigate, jwt, dispatch, user._id]);
    return (
            <Routes>
                <Route path='/Signin' element={<SignIn />} />
                <Route path="signup" element={<SignUpPage />} />
            <Route path='/' element={<HomeLayout theme={theme} setTheme={setTheme} />}>
                    <Route index element={<Welcome y />} />
                    <Route path='chats' element={<SecondaryNav socket={socket} searchbox={true} type="Chats" NewChat={true} filter={true} />}>
                        <Route index element={<Welcome />} />
                        <Route path=':id' element={<ChatPage socket={socket} />} />
                    </Route>
                    <Route path='calls' element={<SecondaryNav searchbox={true} type="Calls" addContacts={true} />}>
                        <Route path=':id' element={<Calls />} />
                    </Route>
                    <Route path='status' element={<SecondaryNav type="Status" />}>
                        <Route path=':id' element={<Status />} />
                    </Route>
                    <Route path='starred_message' element={<SecondaryNav type="Starred Messages" />}>
                        <Route path=':id' element={<Status />} />
                    </Route>
                    <Route path='archive' element={<SecondaryNav type="Archive" />}>
                        <Route path=':id' element={<Status />} />
                    </Route>
                </Route>
            </Routes>
    );
}

export default App;
