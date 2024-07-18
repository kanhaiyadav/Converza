import React from 'react'
import { SecondaryNavContainer, NavHeader, Title, HeaderButtons } from './SecondaryNav.styles';
import { Outlet } from 'react-router-dom';
import CustomButton from '../CustomButton/CutomButton.component';
import Searchbox from '../Searchbox/Searchbox.component';
import Directory from '../Directory/Directory.component';

const SecondaryNav = ({ type, NewChat, filter, searchbox }) => {
    return (
        <>
            <SecondaryNavContainer>
                <NavHeader $title={type} $NewChat={NewChat} $filter={filter}>
                    <Title>{type}</Title>
                    <HeaderButtons>
                        {
                            NewChat ? <CustomButton><i className="fa-solid fa-pen-to-square"></i></CustomButton> : null
                        }
                        {
                            filter ? <CustomButton><i className="fa-solid fa-filter"></i></CustomButton> : null
                        }
                    </HeaderButtons>
                </NavHeader>
                {
                    searchbox ?
                        <Searchbox>
                            <i className="fa-solid fa-magnifying-glass fa-bounce"></i>
                            <input type="text" placeholder='Search a chat...' />
                            <CustomButton><i className="fa-solid fa-x"></i></CustomButton>
                        </Searchbox>
                        : null
                }
                <Directory type={type} />
            </SecondaryNavContainer>
            <Outlet />
        </>
    )
}

export default SecondaryNav;