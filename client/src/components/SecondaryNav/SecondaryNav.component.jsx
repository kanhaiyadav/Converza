import React, { useEffect, useState } from 'react';
import { SecondaryNavContainer, NavHeader, Title, HeaderButtons, ChatsLayoutContainer } from './SecondaryNav.styles';
import { Outlet, useLocation } from 'react-router-dom';
import CustomButton from '../CustomButton/CutomButton.component';
import Directory from '../Directory/Directory.component';
import Modal from '../Modal/Modal.component';
import AddContactFrom from '../AddContactForm/AddContactFrom.Component';
import { useSocket } from '../../context/SocketContext';

const SecondaryNav = ({ type }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Track if it's mobile
    const location = useLocation(); // Get current location to track route changes
    const [displayAddContactModal, setAddContactModal] = useState(false);
    const socket = useSocket();

    // Update `isMobile` state on window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Check if the current path is exactly `/chats`
    const isChatsRoute = location.pathname === '/chats';

    return (
        <ChatsLayoutContainer>
            <SecondaryNavContainer>
                <NavHeader $title={type}>
                    <Title>{type}</Title>
                    <HeaderButtons>
                        <CustomButton
                            onClick={() => {
                                setAddContactModal(true);
                            }}
                            style={{ boxShadow: 'none' }}
                        >
                            <span style={{ fontSize: '1.5rem' }}>+</span>
                            <p style={{ fontSize: '1rem' }}>New</p>
                        </CustomButton>
                        {displayAddContactModal && (
                            <Modal onClick={() => setAddContactModal(false)}>
                                <AddContactFrom closeModal={() => setAddContactModal(false)} />
                            </Modal>
                        )}
                    </HeaderButtons>
                </NavHeader>
                <Directory
                    socket={socket}
                    type={type}
                    openModal={() => setAddContactModal(true)}
                />
            </SecondaryNavContainer>

            {/* Conditionally render the Outlet: don't render it on mobile for /chats route */}
            {!isMobile || !isChatsRoute ? <Outlet /> : null}
        </ChatsLayoutContainer>
    );
};

export default React.memo(SecondaryNav);
