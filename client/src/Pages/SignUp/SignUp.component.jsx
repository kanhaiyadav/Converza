import { gql } from '@apollo/client';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const SIGN_UP = gql`
        mutation SignUp($name: String!, $phoneNo: String!) {
            SignUp(name: $name, phoneNo: $phoneNo) {
                    success
                    message
                }
        }`;
    const [signUp, { data, loading, error }] = useMutation(SIGN_UP, {
        variables: {
            name: name,
            phoneNo: mobile,
        },
        onCompleted: (data) => {
            navigate('/');
        }
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        signUp();
        setName('');
        setMobile('');
    }
    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleMobileChange = (e) => {
        setMobile(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit}
            style={{
                margin: 'auto',
            }}
        >
            <h1>Sign Up</h1>
            <input type="text" placeholder="Name" onChange={handleNameChange} />
            <input type="text" placeholder='Mobile no...' onChange={handleMobileChange} />
            <button type="submit">Sign Up</button>
        </form>
    )
}

export default SignUpPage;