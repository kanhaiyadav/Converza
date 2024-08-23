import { Container, Header, HeaderBody, Buttons, Body, Footer, Form } from './ChatPage.styles';
import CustomButton from '../../components/CustomButton/CutomButton.component';
import RoundedButton from '../../components/RoundedButton/RoundedButton';
import { selectContact } from '../../redux/user/user.selector';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';



const ChatPage = ({ socket }) => {
    const id = useParams().id;
    const contact = useSelector(selectContact(id));
    const {user, room} = contact;
    const [message, setMessage] = useState("");

    useEffect(() => {
        socket.emit("join", {
            room: room._id,
        });
    }, [socket, room._id]);

    useEffect(() => {
        socket.on('message', (message) => {
            console.log(message);
        });
        
        return () => {
            socket.off('message', (message) => {
                console.log(message);
            });
        };
    }, [socket]);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        socket.emit("message", {
            message: message,
            room: room._id,
        });    
    }

    return (
        <Container>
            <Header>
                <img src={user.avatar} alt="" />
                <HeaderBody>
                    <p>{user.name}</p>
                    <span>Active now</span>
                </HeaderBody>
                <Buttons>
                    <div
                        style={{
                            display: 'flex',
                            border: "1px solid #ccc",
                            borderRadius: '5px',
                        }}
                    >
                    </div>
                    <CustomButton><i className="fa-solid fa-search"></i></CustomButton>
                </Buttons>
            </Header>
            <Body>

            </Body>
            <Footer>
                <Form id='message-form'
                onSubmit={handleSubmit}
                >
                    <span style={{
                        borderRadius: '50%',
                        padding: '8px',
                        color: 'grey',

                    }}><i className="fa-regular fa-face-smile"></i></span>
                    <span
                        style={{
                            borderRadius: '50%',
                            padding: '8px',
                            color: 'grey',
                            marginLeft: '-10px',
    
                        }}
                    ><i className="fa-solid fa-paperclip"></i></span>
                    <input onChange={handleMessageChange} type="text" placeholder='Type a message...' name="message" value={message} autoFocus required/>
                </Form>
                <RoundedButton type='submit' form='message-form'><i className="fa-solid fa-paper-plane"></i></RoundedButton>
            </Footer>
        </Container>
    )
}

export default ChatPage;