import React, { useEffect, useState } from 'react'
import { Container, Header, HeaderBody, Buttons, Body, Footer, Form} from './ChatPage.styles';
import CustomButton from '../../components/CustomButton/CutomButton.component';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectContact} from '../../redux/user/user.selector';


const ChatPage = ({ socket }) => {
    const id = useParams().id;
    const contact = useSelector(selectContact(id));
    const [message, setMessage] = useState("");
    
    useEffect(() => {
        socket.emit("join", {
            source_id: socket.id,
            partner_id: contact.id,
        });
        socket.on("join_requested", (id) => {
            socket.join(id);
        });
        socket.on('messageRecieved', (data) => {
            console.log(data)
        });
    }, [contact, socket]);
    
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        socket.emit("message", {
            message: message,
            id: contact.id,
        });    
    }

    return (
        <Container>
            <Header>
                <img src='https://cdn-icons-png.flaticon.com/512/149/149071.png' alt="" />
                <HeaderBody>
                    <p>{contact.name}</p>
                    <span>Active now</span>
                </HeaderBody>
                <Buttons>
                    <div 
                        style={{
                            display:'flex',
                            border: "1px solid #ccc",
                            borderRadius: '5px',
                        }}
                    >
                        <CustomButton style={{borderRadius: '0px'}}><i className="fa-solid fa-video"></i></CustomButton>
                        <span
                            style={{
                                display: 'inline-block',
                                width: '1px',
                                backgroundColor: '#ccc',
                            }}
                        ></span>
                        <CustomButton style={{ borderRadius: '0px' }}><i className="fa-solid fa-phone"></i></CustomButton>
                    </div>
                    <CustomButton><i className="fa-solid fa-search"></i></CustomButton>
                </Buttons>
            </Header>
            <Body>

            </Body>
            <Footer>
                <CustomButton><i className="fa-regular fa-face-smile"></i></CustomButton>
                <CustomButton><i className="fa-solid fa-paperclip"></i></CustomButton>
                <Form
                    onSubmit={handleSubmit}
                >
                    <input onChange={handleMessageChange} type="text" placeholder='Type a message...' name="message" value={message} autoFocus required/>
                    <CustomButton><i className="fa-solid fa-paper-plane"></i></CustomButton>
                </Form>
            </Footer>
        </Container>
    )
}

export default ChatPage;