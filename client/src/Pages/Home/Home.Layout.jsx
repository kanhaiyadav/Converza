import React  from 'react'
import { HomeLayoutContainer } from './Home.styles';
import { Outlet } from 'react-router-dom';
import HomeNav from './HomeNav';

const HomeLayout = ({ theme, setTheme }) => {
    return (
        <HomeLayoutContainer>
            <HomeNav theme={theme} setTheme={setTheme} />
            <Outlet />
        </HomeLayoutContainer>
    )
}

export default HomeLayout;