import React, { useEffect, useState } from 'react'
import { SecondaryNavContainer, NavHeader, Title, HeaderButtons, ChatsLayoutContainer } from './SecondaryNav.styles';
import { Outlet } from 'react-router-dom';
import CustomButton from '../CustomButton/CutomButton.component';
import Searchbox from '../Searchbox/Searchbox.component';
import Directory from '../Directory/Directory.component';
import { IoAddCircleOutline } from "react-icons/io5";
import { LuFilter } from "react-icons/lu";
import Modal from '../Modal/Modal.component';
import AddContactFrom from '../AddContactForm/AddContactFrom.Component';
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "../../redux/contacts/contacts.slice";
import { selectUserInfo } from "../../redux/user/user.selector";


const SecondaryNav = ({ socket, type }) => {

    const user = useSelector(selectUserInfo);
    const dispatch = useDispatch();
    const [displayAddContactModal, setAddContactModal] = useState(false);
    
    useEffect(() => {
        dispatch(getContacts(user._id));
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
                        }}><IoAddCircleOutline /></CustomButton>
                        <CustomButton><LuFilter /></CustomButton>
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
                <Searchbox>
                    <i className="fa-solid fa-magnifying-glass fa-bounce"></i>
                    <input type="text" placeholder='Search a chat...' />
                    <CustomButton><i className="fa-solid fa-x"></i></CustomButton>
                </Searchbox>
                <Directory socket={socket} type={type} openModal={() => {
                    setAddContactModal(true)
                }}
                />
            </SecondaryNavContainer>
            <Outlet />
        </ChatsLayoutContainer>
    )
}

export default React.memo(SecondaryNav);