import React from 'react'
import { useDispatch } from 'react-redux';
import { create } from '../../redux/contacts/contacts.slice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        console.log("***Submitted***");
        e.preventDefault();
        const createPromise = dispatch(create({
            name: name,
            phoneNo: mobile
        })).unwrap();
        createPromise.then(() => {
            console.log("***Created***");
            navigate('signin');
        }).catch(() => {
            console.log("***Failed***");
            navigate('signup');
        })
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
          <input  type="text" placeholder="Name" onChange={handleNameChange}/>
          <input  type="text" placeholder='Mobile no...' onChange={handleMobileChange}/>
          <button type="submit">Sign Up</button>
      </form>
  )
}

export default SignUpPage;