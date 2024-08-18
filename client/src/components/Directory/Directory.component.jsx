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
            {
                <Chat room={{
                    img: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                    name: 'John Doe',
                    subtext: 'Hey there',
                    to: '1'
                }} />
            }
        </ListDirectory>
    )
}

export default Directory