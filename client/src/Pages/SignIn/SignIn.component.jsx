import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useLazyQuery, gql } from '@apollo/client';
import { isLoggedInVar } from '../../GraphQL/cache';
import { useReactiveVar } from '@apollo/client';
import { Container, SubContainer, Header } from './SignIn.styles';
import { TextAnimation } from '../../Styles/mixins';
import { styled } from 'styled-components';

const SignIn = ({type}) => {
    const [fields, setFields] = React.useState({
        displayName: '',
        username: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();
    const isLoggedIn = useReactiveVar(isLoggedInVar);

    const handleChange = (e) => {
        setFields({ ...fields, [e.target.name]: e.target.value });
    }

    const signin = () => {
        console.log('signing in');
    };

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
        type === 'signin' ? login() : signin();
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

    const AnimatedHeading = styled.h1`
        animation: ${TextAnimation} 1s linear;
    `;
    
    return (
        <Container>
            <Header>
                <AnimatedHeading>
                    {
                        type === 'signin' ? 'Welcome Back!' : 'Hey, Join Us!'
                    }
                </AnimatedHeading>
                <p>
                    {
                        type === 'signin' ? 'Your Conversations Await' : 'and Let the Conversations Flow!'
                    }
                </p>
            </Header>
            <SubContainer>
                <form
                    onSubmit={handleSubmit}
                >
                    <div><img src="/chat.png" alt="" /></div>
                    <h1>
                        {
                            type === 'signup' ? 'Sign Up' : 'Sign In'
                        }
                    </h1>
                    {
                        type === 'signup' ? <input type="text" name='displayName' placeholder='Display Name' onChange={handleChange} autoFocus value={fields.displayName} /> : ''
                    }
                    <input type="text" name='username' placeholder='Username' autoFocus={type === 'signin'?true:false} onChange={handleChange} value={fields.username} />
                    <input type="password" name='password' placeholder='Password' onChange={handleChange} value={fields.password} />
                    {
                        type === 'signup' ? <input type="password" name='confirmPassword' placeholder='Confirm Password' onChange={handleChange} value={fields.confirmPassword} /> : ''
                    }
                    <button type="submit">Sign In</button>
                </form>
            </SubContainer>
            {
                type === 'signin'?<Link to='/signup'>Don't have an account? <span>SignUp</span></Link>:<Link to='/signin'>Already have an account? <span>SignIn</span></Link>
            }
            
        </Container>
    )
}

export default SignIn;