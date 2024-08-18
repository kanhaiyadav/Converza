import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './Styles/GlobalStyles';
import { Provider } from "react-redux";
import store from "./redux/store";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { UserProvider } from './Context';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './Styles/theme';
import { persistCache } from 'apollo3-cache-persist';
import localForage from 'localforage';
import { resolvers, typeDefs } from './GraphQL/resolvers';

const AppWrapper = () => {
    const [client, setClient] = useState(null);

    useEffect(() => {
        const setupApolloClient = async () => {
            const cache = new InMemoryCache();
            await persistCache({
                cache,
                storage: localForage,
            });

            const clientInstance = new ApolloClient({
                uri: 'http://localhost:3000/graphql',
                cache,
                typeDefs,
                resolvers,
            });
            setClient(clientInstance);
        };

        setupApolloClient();
    }, []);

    // client.writeData({
    //     data: {
    //         isLoggedIn: false
    //     },
    // })

    if (!client) {
        return <div>Loading...</div>; // Or any loading indicator
    }

    return (
        <ApolloProvider client={client}>
            <UserProvider>
                <BrowserRouter>
                    <Provider store={store}>
                        <ThemeProvider theme={lightTheme}>
                            <GlobalStyle />
                            <App />
                        </ThemeProvider>
                    </Provider>
                </BrowserRouter>
            </UserProvider>
        </ApolloProvider>
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
