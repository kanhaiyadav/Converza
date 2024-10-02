import React, { useEffect, useState } from 'react'
import { HomeNav, NavItem, MenuButton, HomeLayoutContainer, BottomNav } from './Home.styles';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { PiSignOutFill } from "react-icons/pi";
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';

const HomeLayout = ({ theme, setTheme }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <HomeLayoutContainer>
            <HomeNav $menuOpen={menuOpen}>
                <MenuButton
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <i className="fa-solid fa-bars"></i>
                </MenuButton>
                <NavItem
                    className={({ isActive }) => (isActive ? 'HomeNavItemActive' : '')}
                    to='chats'><span></span><i className="fa-solid fa-comments"></i><p>Chat</p></NavItem>
                <NavItem to='starred_message'><span></span><i className="fa-regular fa-star"></i><p>Star chats</p></NavItem>
                <NavItem to='archive'><span></span><i className="fa-solid fa-box-archive"></i><p>Archive</p></NavItem>
                <BottomNav>
                    <NavItem as='div'><span></span><i className="fa-solid fa-user"></i><p>Profile</p></NavItem>
                    <NavItem as='div'><span></span><i className="fa-solid fa-gear"></i><p>Settings</p></NavItem>
                    <NavItem as='div' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}><span></span><i className="fa-solid fa-moon"></i><p>Theme</p></NavItem>
                    <NavItem as='div' onClick={() => {
                        dispatch(logout());
                        navigate('/signin');
                    }}><span></span><PiSignOutFill style={{fontSize: '1.3rem'}}/><p>Sign Out</p></NavItem>
                </BottomNav>
            </HomeNav>
            <Outlet />
        </HomeLayoutContainer>
    )
}

export default HomeLayout;