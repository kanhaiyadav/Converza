import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useLazyQuery, gql } from '@apollo/client';
import { isLoggedInVar } from '../../GraphQL/cache';
import { useReactiveVar } from '@apollo/client';

const SignIn = () => {
    const [Mobile, setMobile] = React.useState('');
    const navigate = useNavigate();
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const handleMobileChange = (e) => {
        setMobile(e.target.value);
    }

    const LOGIN = gql`
        query login($phoneNo: String!) {
            login(phoneNo: $phoneNo) {
                token
            }
        }
        `;

    const [login, { loading, error, data }] = useLazyQuery(LOGIN, {
        variables: { phoneNo: Mobile },
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        login();
    }

    React.useEffect(() => {
        if (!isLoggedIn) {
            if (data) {
                window.localStorage.setItem('token', data.login.token);
                isLoggedInVar(true);
                navigate('/chats');
            }
            else if (error) {
                navigate('/signup');
            }
        }
        else {
            navigate('/chats');
        }
    }, [data, error, navigate, isLoggedIn]);
    if (loading) {
        return <h1>Loading...</h1>
    }
    return (
        <>
            <form
                onSubmit={handleSubmit}
                style={{
                    margin: 'auto'
                }}
            >
                <h1>Sign In</h1>
                <input type="text" placeholder='Mobile no...' onChange={handleMobileChange} value={Mobile} />
                <button type="submit">Sign In</button>
            </form>
            <Link to='/signup'>Don't have an account? Sign Up</Link>
        </>
    )
}

export default SignIn;