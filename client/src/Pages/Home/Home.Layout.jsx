import React, { useState} from 'react'
import { HomeNav, NavItem, MenuButton, HomeLayoutContainer, ThemeButton } from './Home.styles';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/RoundedButton/RoundedButton.styles';
import { PiSignOutFill } from "react-icons/pi";
import { logout } from '../../redux/user/user.slice';
import { useDispatch } from 'react-redux';

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
                <NavItem to='starred_message'><span></span><i className="fa-regular fa-star"></i><p>Starred Messages</p></NavItem>
                <NavItem to='archive'><span></span><i className="fa-solid fa-box-archive"></i><p>Archive</p></NavItem>
                <NavItem to='settings'><span></span><i className="fa-solid fa-gear"></i><p>Settings</p></NavItem>
                <NavItem to='profile'><span></span><i className="fa-solid fa-user"></i><p>Profile</p></NavItem>
                <ThemeButton onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}><i className="fa-solid fa-moon"></i></ThemeButton>
                <Button onClick={() => {
                    dispatch(logout());
                    navigate('/signin');
                }} style={{
                    fontSize: '1.3rem',
                }}><PiSignOutFill /></Button>
            </HomeNav>
            <Outlet />
        </HomeLayoutContainer>
    )
}

export default HomeLayout;