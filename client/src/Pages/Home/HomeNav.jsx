import React, { useState } from 'react'
import { HomeNavStyles, NavItem, MenuButton, BottomNav } from './Home.styles';
import Profile from './Profile';


const HomeNav = ({theme, setTheme}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profile, setProfile] = useState(false);

    return (
        <HomeNavStyles $menuOpen={menuOpen}>
            <MenuButton
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <i className="fa-solid fa-bars"></i>
            </MenuButton>
            <NavItem
                className={({ isActive }) => (isActive ? 'HomeNavItemActive' : '')}
                to='chats'><span></span><i className="fa-solid fa-comments"></i><p>Chat</p>
            </NavItem>
            <BottomNav>
                <NavItem as='div' onClick={() => setProfile(true)}><span></span><i className="fa-solid fa-user"></i><p>Profile</p></NavItem>
                {/* <NavItem as='div' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}><span></span><i className="fa-solid fa-moon"></i><p>Theme</p></NavItem> */}
            </BottomNav>
            {profile && <Profile closeProfile={() => setProfile(false)} theme={theme} setTheme={setTheme} />}
        </HomeNavStyles>
    );
}

export default HomeNav;