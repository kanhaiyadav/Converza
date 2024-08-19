import React from 'react'
import { ListDirectory } from './Directory.styles'
import Chat from '../chat/Chat.Component';
// import { useContext } from 'react';
// import { userContext } from '../../Context';

const Directory = ({ type }) => {
    // const { userData } = useContext(userContext);
    // console.log(userData);
    // const user = userData.user;
    return (
        <ListDirectory>
            <Chat room={{
                img: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                name: 'John Doe',
                subtext: 'Hey there',
                to: '1'
            }} />
            <Chat room={{
                img: 'https://cdn-icons-png.flaticon.com/128/4140/4140048.png',
                name: 'Dhruv Jain',
                subtext: 'is there any chance of rain today?',
                to: '2'
            }} />
            <Chat room={{
                img: 'https://cdn-icons-png.flaticon.com/128/16683/16683419.png',
                name: 'Sabyasachi Sinha',
                subtext: 'see you tommorrow',
                to: '3'
            }} />
            <Chat room={{
                img: 'https://cdn-icons-png.flaticon.com/128/6997/6997662.png',
                name: 'Ananya Arya',
                subtext: 'what are you doing?',
                to: '4'
            }} />
        </ListDirectory>
    )
}

export default Directory