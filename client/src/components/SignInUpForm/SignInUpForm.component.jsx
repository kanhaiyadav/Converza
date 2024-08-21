import { useEffect, useState } from "react";
import { useLazyQuery, gql } from '@apollo/client';
import { isLoggedInVar } from '../../GraphQL/cache';
import { useNavigate } from 'react-router-dom';
import { MyForm } from "./SignInUpForm.styles";
import { useMutation } from '@apollo/client';

const Form = ({ type }) => {

    const navigate = useNavigate();

    const [fields, setFields] = useState({
        displayName: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFields({ ...fields, [e.target.name]: e.target.value });
    }

    const LOGIN = gql`
        query login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
                token
            }
        }
        `;
    const [login, { error, data }] = useLazyQuery(LOGIN, {
        variables: { username: fields.username, password: fields.password },
    });

    const SIGN_UP = gql`
        mutation SignUp($name: String!, $username: String!, $password: String!) {
            SignUp(name: $name, username: $username, password:$password){
                success
                message
            }
        }`;

    const [signUp, { signUpData, signUpLoading, signUpError }] = useMutation(SIGN_UP, {
        variables: {
            name: fields.displayName,
            username: fields.username,
            password: fields.password,
        },
        onCompleted: (data) => {
            navigate('/signin');
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setFields({
            displayName: '',
            username: '',
            password: '',
            confirmPassword: '',
        });
        type === 'signin' ? login() : signUp();
    }

    useEffect(() => {
        if (data) {
            window.localStorage.setItem('token', data.login.token);
            isLoggedInVar(true);
            navigate('/chats');
        }
        else if (error) {
            navigate('/signin');
        }
    }, [data, error, navigate]);

    return (
        <MyForm
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
            <input type="text" name='username' placeholder='Username' autoFocus={type === 'signin' ? true : false} onChange={handleChange} value={fields.username} />
            <input type="password" name='password' placeholder='Password' onChange={handleChange} value={fields.password} />
            {
                type === 'signup' ? <input type="password" name='confirmPassword' placeholder='Confirm Password' onChange={handleChange} value={fields.confirmPassword} /> : ''
            }
            <button type="submit">Sign In</button>
        </MyForm>
    )
};

export default Form;