import { Container, Header, HeaderBody, Buttons, Body, Footer, Form } from './ChatPage.styles';
import CustomButton from '../../components/CustomButton/CutomButton.component';
import RoundedButton from '../../components/RoundedButton/RoundedButton';
// import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { selectContact} from '../../redux/user/user.selector';


const ChatPage = ({ socket }) => {
    const id = useParams().id;
    // const contact = useSelector(selectContact(id));
    // const [message, setMessage] = useState("");

    // useEffect(() => {
    //     socket.emit("join", {
    //         source_id: socket.id,
    //         partner_id: contact.id,
    //     });
    //     socket.on("join_requested", (id) => {
    //         socket.join(id);
    //     });
    //     socket.on('messageRecieved', (data) => {
    //         console.log(data)
    //     });
    // }, [contact, socket]);

    // const handleMessageChange = (e) => {
    //     setMessage(e.target.value);
    // }
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setMessage("");
    //     socket.emit("message", {
    //         message: message,
    //         id: contact.id,
    //     });    
    // }

    const data = {
        1: {
            img: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
            name: 'John Doe',
            subtext: 'Hey there',
            to: '1'
        },
        2: {
            img: 'https://cdn-icons-png.flaticon.com/128/4140/4140048.png',
            name: 'Dhruv Jain',
            subtext: 'is there any chance of rain today?',
            to: '2'
        },
        3: {
            img: 'https://cdn-icons-png.flaticon.com/128/16683/16683419.png',
            name: 'Sabyasachi Sinha',
            subtext: 'see you tommorrow',
            to: '3'
        },
        4: {
            img: 'https://cdn-icons-png.flaticon.com/128/6997/6997662.png',
            name: 'Ananya Arya',
            subtext: 'what are you doing?',
            to: '4'
        },
    }
    return (
        <Container>
            <Header>
                <img src={data[id].img} alt="" />
                <HeaderBody>
                    <p>{data[id].name}</p>
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
                // onSubmit={handleSubmit}
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
                    {/* <input onChange={handleMessageChange} type="text" placeholder='Type a message...' name="message" value={message} autoFocus required/> */}
                    <input type="text" placeholder='Type a message...' name="message" autoFocus required />
                </Form>
                <RoundedButton type='submit' form='message-form'><i className="fa-solid fa-paper-plane"></i></RoundedButton>
            </Footer>
        </Container>
    )
}

export default ChatPage;