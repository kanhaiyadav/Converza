import React, { useState, useEffect } from 'react';
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

const AppWrapper = () => {
    const [theme, setTheme] = useState('dark');

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
