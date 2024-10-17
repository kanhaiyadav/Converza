import React, { useEffect, useState } from 'react'
import { SecondaryNavContainer, NavHeader, Title, HeaderButtons, ChatsLayoutContainer } from './SecondaryNav.styles';
import { Outlet } from 'react-router-dom';
import CustomButton from '../CustomButton/CutomButton.component';
import Directory from '../Directory/Directory.component';
import Modal from '../Modal/Modal.component';
import AddContactFrom from '../AddContactForm/AddContactFrom.Component';
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "../../redux/contacts/contacts.slice";
import { selectUserInfo } from "../../redux/user/user.selector";


const SecondaryNav = ({ socket, type }) => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector(selectUserInfo);
    const dispatch = useDispatch();
    const [displayAddContactModal, setAddContactModal] = useState(false);

    useEffect(() => {
        dispatch(getContacts(user._id)).unwrap()
            .then(
                () => {
                    setIsLoading(false);
                }
            )
    }, [dispatch, user._id]);


    return (
        <ChatsLayoutContainer>
            <SecondaryNavContainer>
                <NavHeader $title={type}>
                    <Title>{type}</Title>
                    <HeaderButtons>
                        <CustomButton onClick={() => {
                            console.log('clicked');
                            setAddContactModal(true)
                        }}
                            style={{
                                boxShadow: 'none',
                            }}
                        ><span style={{ fontSize: '1.5rem' }}>+</span><p style={{ fontSize: "1rem" }}>New</p></CustomButton>
                        {
                            displayAddContactModal &&
                            <Modal onClick={() => {
                                setAddContactModal(false)
                            }}>
                                <AddContactFrom closeModal={() => {
                                    setAddContactModal(false)
                                }} />
                            </Modal>
                        }
                    </HeaderButtons>
                </NavHeader>
                <Directory contactLoading={isLoading} socket={socket} type={type} openModal={() => {
                    setAddContactModal(true)
                }}
                />
            </SecondaryNavContainer>
            <Outlet />
        </ChatsLayoutContainer>
    )
}

export default React.memo(SecondaryNav);