import React from 'react'
import { Link } from 'react-router-dom';
import { Container, SubContainer, Header, AnimatedHeading } from './SignIn.styles';
import Form from '../../components/SignInUpForm/SignInUpForm.component';

const SignIn = ({type}) => {
    
    return (
        <Container>
            <Header>
                <AnimatedHeading>
                    {
                        type === 'signin' ? 'Welcome Back!' : 'Welcome to Converza'
                    }
                </AnimatedHeading>
                <p>
                    {
                        type === 'signin' ? 'Your inbox is still waiting, just like we are' : 'Sign Up and get a new password to forget. 😜'
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