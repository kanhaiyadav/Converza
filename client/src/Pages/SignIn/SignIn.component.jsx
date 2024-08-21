import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedInVar } from '../../GraphQL/cache';
import { useReactiveVar } from '@apollo/client';
import { Container, SubContainer, Header, AnimatedHeading } from './SignIn.styles';
import Form from '../../components/SignInUpForm/SignInUpForm.component';

const SignIn = ({type}) => {
    
    const navigate = useNavigate();
    const isLoggedIn = useReactiveVar(isLoggedInVar);

    React.useEffect(() => {
        if (isLoggedIn) {
            navigate('/chats');
        }
    }, [isLoggedIn, navigate]);
    
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
                <Form type={type} />
            </SubContainer>
            {
                type === 'signin'?<Link to='/signup'>Don't have an account? <span>SignUp</span></Link>:<Link to='/signin'>Already have an account? <span>SignIn</span></Link>
            }
            
        </Container>
    )
}

export default SignIn;