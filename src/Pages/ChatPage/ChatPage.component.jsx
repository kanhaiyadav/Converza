import React from 'react'
import { Container, Header, HeaderBody, Buttons, Body, Footer, Form} from './ChatPage.styles';
import CustomButton from '../../components/CustomButton/CutomButton.component';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectContact } from '../../redux/contacts/contact.selector';


const ChatPage = () => {
    const id = useParams().id;
    const contact = useSelector(selectContact(id));
    return (
        <Container>
            <Header>
                <img src={contact.img} alt="" />
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
                <CustomButton><i class="fa-regular fa-face-smile"></i></CustomButton>
                <CustomButton><i class="fa-solid fa-paperclip"></i></CustomButton>
                <Form>
                    <input type="text" placeholder='Type a message...' name="message" autoFocus required/>
                    <CustomButton><i class="fa-solid fa-paper-plane"></i></CustomButton>
                </Form>
            </Footer>
        </Container>
    )
}

export default ChatPage;