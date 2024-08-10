import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './components/GlobalStyles';
import { Provider } from "react-redux";
import store from "./redux/store";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache(),
});

// client
//     .query({
//         query: gql`
//       query getUsers {
//         getUsers{
//             id
//             name
//         }
//       }
//     `,
//     })
//     .then((result) => console.log(result))
//     .catch((error) => console.log(error));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Provider store={store}>
                    <GlobalStyle />
                    <App />
                </Provider>
            </BrowserRouter>
        </ApolloProvider>
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
