import './App.css';
import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { Routes, Route } from 'react-router-dom'
import HomeLayout from './Pages/Home/Home.Layout';
import Calls from './components/calls/calls.component';
import Status from './components/status/status.component';
import SecondaryNav from './components/SecondaryNav/SecondaryNav.component';
import Welcome from './Pages/ChatPage/Welcome';
import ChatPage from './Pages/ChatPage/ChatPage.component';

const Demo = () => {
    return (
        <h1> There is nothing here</h1>
    )
}
function App() {
    let socket = io('http://localhost:5000');
    useEffect(() => {
        socket.on('connected', (message) => {
            console.log(message)
        })
        socket.on('userJoined', (message) => {
            console.log(message)
        })
    })
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<HomeLayout />}>
                    <Route path='chats' element={<SecondaryNav searchbox={true} type="Chats" NewChat={true} filter={true}/>}>
                        <Route index element={<Welcome />} />
                        <Route path=':id' element={<ChatPage />} />
                    </Route>
                    <Route path='calls' element={<SecondaryNav searchbox={true} type="Calls" addContacts={true}/>}>
                        <Route path=':id' element={<Calls/>} />
                    </Route>
                    <Route path='status' element={<SecondaryNav type="Status" />}>
                        <Route path=':id' element={<Status/>} />
                    </Route>
                    <Route path='starred_message' element={<SecondaryNav type="Starred Messages" />}>
                        <Route path=':id' element={<Status/>} />
                    </Route>
                    <Route path='archive' element={<SecondaryNav type="Archive" />}>
                        <Route path=':id' element={<Status/>} />
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
