import './App.css';
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
// import HomeLayout from './Pages/Home/Home.Layout';
import SecondaryNav from './components/SecondaryNav/SecondaryNav.component';
// import Welcome from './Pages/ChatPage/Welcome';
import ChatPage from './Pages/ChatPage/ChatPage.component';
// import SignIn from './Pages/SignIn/SignIn.component';
import Loader from './components/Loader/Loader';
import { useSelector } from 'react-redux';
import { selectJwt } from './redux/user/user.selector';
import { Navigate } from 'react-router-dom';
import { SkeletonTheme } from 'react-loading-skeleton';
import { useTheme } from 'styled-components';

const HomeLayout = lazy(() => import('./Pages/Home/Home.Layout'));
const Welcome = lazy(() => import('./Pages/ChatPage/Welcome'));
// const ChatPage = lazy(() => import('./Pages/ChatPage/ChatPage.component'));
const SignIn = lazy(() => import('./Pages/SignIn/SignIn.component'));

function App({ theme, setTheme }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Track if it's mobile
    const currentTheme = useTheme();
    const jwt = useSelector(selectJwt);
    const location = useLocation();

    // Update `isMobile` state on window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Check if the current path is "chats/:id" to render conditionally on mobile
    const isChatPageRoute = location.pathname.startsWith('/chats/');

    return (
        <SkeletonTheme baseColor={currentTheme.colors.quaternary} highlightColor={currentTheme.colors.secondary}>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path='/signin' element={jwt ? <Navigate to='/chats' /> : <SignIn type='signin' />} />
                    <Route path='/signup' element={jwt ? <Navigate to='/chats' /> : <SignIn type='signup' />} />
                    <Route path='/' element={jwt ? <HomeLayout theme={theme} setTheme={setTheme} /> : <Navigate to='/signin' />}>
                        <Route index element={<Welcome />} />
                        <Route path='chats' element={isMobile && isChatPageRoute ? null : <SecondaryNav type="Chats" />}>
                            <Route index element={<Welcome />} />
                            <Route path=':id' element={<ChatPage />} />
                        </Route>
                    </Route>
                </Routes>
            </Suspense>
        </SkeletonTheme>
    );
}

export default App;
