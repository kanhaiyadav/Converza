import React, { useState } from 'react'
import { HomeNav, NavItem, MenuButton } from './Home.styles';
import { Outlet } from 'react-router-dom';
const HomeLayout = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <>
            <HomeNav $menuOpen={menuOpen}>
                <MenuButton
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <i className="fa-solid fa-bars"></i>
                </MenuButton>
                <NavItem
                    className={({ isActive }) => (isActive ? 'HomeNavItemActive' : '')}
                    to='chats'><span></span><i className="fa-solid fa-comments"></i><p>Chat</p></NavItem>
                <NavItem to='calls'><span></span><i className="fa-solid fa-phone"></i><p>Calls</p></NavItem>
                <NavItem to='status'><span></span><i className="fa-solid fa-group-arrows-rotate"></i><p>Status</p></NavItem>
                <NavItem to='starred_message'><span></span><i className="fa-regular fa-star"></i><p>Starred Messages</p></NavItem>
                <NavItem to='archive'><span></span><i className="fa-solid fa-box-archive"></i><p>Archive</p></NavItem>
                <NavItem to='settings'><span></span><i className="fa-solid fa-gear"></i><p>Settings</p></NavItem>
                <NavItem to='profile'><span></span><i className="fa-solid fa-user"></i><p>Profile</p></NavItem>
                
            </HomeNav>
            <Outlet />
        </>
    )
}

export default HomeLayout;