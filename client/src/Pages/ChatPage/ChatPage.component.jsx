import { Container, Header, HeaderBody, Buttons, Body, Footer, Form } from './ChatPage.styles';
import CustomButton from '../../components/CustomButton/CutomButton.component';
import RoundedButton from '../../components/RoundedButton/RoundedButton';
import { selectContact } from '../../redux/user/user.selector';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { selectUserInfo } from '../../redux/user/user.selector';
import Message from '../../components/Message/Message.component';
import MessageFrom from './MessageForm/MessageForm.component';


const ChatPage = ({ socket }) => {
    const id = useParams().id;
    const contact = useSelector(selectContact(id));
    const {user, room} = contact;
    const me = useSelector(selectUserInfo);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.emit("join", {
            room: room._id,
        }, (err, responce) => {
            if (err) {
                console.log(err);
            }
            setMessages(responce);
        });
    }, [socket, room._id]);

    useEffect(() => {

        socket.on('messageSent', (message) => {
            setMessages((prev)=>[...prev, message]);
        });
        
        return () => {
            socket.off('message', (message) => {
                console.log(message);
            });
        };

    }, [socket]);



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
                {
                    messages.map((message) => {
                        return (
                            <Message key={message._id} message={message} currId={me._id} />
                        )
                    })
                }
            </Body>
            <Footer>
                <MessageFrom socket={socket} contact={contact} />
                <RoundedButton type='submit' form='message-form'><i className="fa-solid fa-paper-plane"></i></RoundedButton>
            </Footer>
        </Container>
    )
}

export default ChatPage;