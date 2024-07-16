import './App.css';
import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { Routes, Route } from 'react-router-dom'
import ChatLayout from './Pages/Chat/Chat.Layout';
import Chat from "./components/chat/Chat.Component";
import HomeLayout from './Pages/Home/Home.Layout';
import Calls from './components/calls/calls.component';
import CallsLayout from './Pages/Calls/CallsLayout.component';
import Status from './components/status/status.component';
import StatusLayout from './Pages/Status/StatusLayout.component';
import SecondaryNav from './components/SecondaryNav/SecondaryNav.component';

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
                        <Route index element={<Demo />} />
                        <Route path=':id' element={<Demo/>} />
                    </Route>
                    <Route path='calls' element={<SecondaryNav searchbox={true} type="Calls" addContacts={true}/>}>
                        <Route path=':id' element={<Calls/>} />
                    </Route>
                    <Route path='status' element={<SecondaryNav title="Status" />}>
                        <Route path=':id' element={<Status/>} />
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
