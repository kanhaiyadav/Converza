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