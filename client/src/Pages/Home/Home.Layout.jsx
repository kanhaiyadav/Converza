import React  from 'react'
import { HomeLayoutContainer } from './Home.styles';
import { Outlet } from 'react-router-dom';
import HomeNav from './HomeNav';

const HomeLayout = ({ theme, setTheme, wallpaper, setWallpaper }) => {
    return (
        <HomeLayoutContainer>
            <HomeNav theme={theme} setTheme={setTheme} wallpaper={wallpaper} setWallpaper={setWallpaper} />
            <Outlet />
        </HomeLayoutContainer>
    )
}

export default HomeLayout;