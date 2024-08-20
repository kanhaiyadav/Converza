import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useLazyQuery, gql } from '@apollo/client';
import { isLoggedInVar } from '../../GraphQL/cache';
import { useReactiveVar } from '@apollo/client';
import { Container, SubContainer, Header } from './SignIn.styles';

const SignIn = () => {
    const [fields, setFields] = React.useState({
        username: '',
        password: '',
    });
    const navigate = useNavigate();
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const handleChange = (e) => {
        setFields({ ...fields, [e.target.name]: e.target.value });
    }

    const LOGIN = gql`
        query login($phoneNo: String!) {
            login(phoneNo: $phoneNo) {
                token
            }
        }
        `;

    const [login, { loading, error, data }] = useLazyQuery(LOGIN, {
        variables: { phoneNo: fields.username },
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
        <Container>
            <Header>
                <h1>Welcome Back!</h1>
                <p>Your Conversations Await</p>
            </Header>
            <SubContainer>
                <form
                    onSubmit={handleSubmit}
                >
                    <div><img src="/chat.png" alt="" /></div>
                    <h1>Sign In</h1>
                    <input type="text" name='username' placeholder='Username' autoFocus onChange={handleChange} value={fields.username} />
                    <input type="password" name='password' placeholder='Password' onChange={handleChange} value={fields.password} />
                    <button type="submit">Sign In</button>
                </form>
            </SubContainer>
            <Link to='/signup'>Don't have an account? <span>SignUp</span></Link>
        </Container>
    )
}

export default SignIn;