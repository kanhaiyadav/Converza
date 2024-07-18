import './App.css';
import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { Routes, Route, useNavigate } from 'react-router-dom'
import HomeLayout from './Pages/Home/Home.Layout';
import Calls from './components/calls/calls.component';
import Status from './components/status/status.component';
import SecondaryNav from './components/SecondaryNav/SecondaryNav.component';
import Welcome from './Pages/ChatPage/Welcome';
import ChatPage from './Pages/ChatPage/ChatPage.component';
import { useDispatch, useSelector } from 'react-redux';
import { update } from './redux/contacts/contacts.slice';
import SignUpPage from './Pages/SignUp/SignUp.component';
import SignIn from './Pages/SignIn/SignIn.component';
import { selectJwt, selectUser } from './redux/contacts/contact.selector';

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const jwt = useSelector(selectJwt);
    useEffect(() => {
        if (!jwt) {
            navigate('/signin');
        }
        else {
            let socket = io('http://localhost:5000');
            socket.on('connect', () => {
                console.log(socket.id);
                dispatch(update({
                    chatid: socket.id,
                    id: user._id
                }))
            })
            socket.on('connected', (message) => {
                console.log(message)
            })
            socket.on('userJoined', (message) => {
                console.log(message)
            })
            socket.on('messageRecieved', (data) => {
                console.log(data)
            });
            return () => socket.disconnect();
        }
    },[navigate, jwt, dispatch, user._id]);
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<HomeLayout />}>
                    <Route path="signup" element={<SignUpPage />} />
                    <Route path='signin' element={<SignIn />} />
                    <Route path='chats' element={<SecondaryNav searchbox={true} type="Chats" NewChat={true} filter={true} />}>
                        <Route index element={<Welcome />} />
                        <Route path=':id' element={<ChatPage />} />
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
        </div>
    );
}

export default App;
