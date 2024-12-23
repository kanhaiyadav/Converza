import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './Styles/GlobalStyles';
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import { UserProvider } from './Context';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './Styles/theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";


const AppWrapper = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');


    const themes = {
        light: lightTheme,
        dark: darkTheme,
    };

    return (
        <UserProvider>
            <BrowserRouter>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <ThemeProvider theme={themes[theme]}>
                                <GlobalStyle />
                                <App theme={theme} setTheme={setTheme} />
                        </ThemeProvider>
                        <ToastContainer theme={theme} />
                    </PersistGate>
                </Provider>
            </BrowserRouter>
        </UserProvider>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppWrapper />
);

reportWebVitals();


serviceWorkerRegistration.register();