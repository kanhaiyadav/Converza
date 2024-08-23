import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { MyForm } from "./SignInUpForm.styles";
import { useDispatch } from "react-redux";
import { signup, signin } from "../../redux/user/user.slice";

const Form = ({ type }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [fields, setFields] = useState({
        displayName: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const signIn = () => {
        const promise = dispatch(signin(fields)).unwrap();
        promise.then((res) => {
            if (res) {
                navigate('/chat');
            }
        }).catch((err) => {
            navigate('/signin');
            console.log(err);
        })
    }

    const signUp = () => {
        const promise = dispatch(signup(fields)).unwrap();
        promise.then((res) => {
            if (res) {
                navigate('/signin');
            }
        }).catch((err) => {
            navigate('/signup');
            console.log(err);
        })
    }

    const handleChange = (e) => {
        setFields({ ...fields, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        type === 'signin' ? signIn() : signUp();
    }

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
                type === 'signup' ? <input type="text" name='displayName' placeholder='Display Name' onChange={handleChange} autoFocus value={fields.displayName} required/> : ''
            }
            <input type="text" name='username' placeholder='Username' autoFocus={type === 'signin' ? true : false} onChange={handleChange} value={fields.username} required/>
            <input type="password" name='password' placeholder='Password' onChange={handleChange} value={fields.password} required/>
            {
                type === 'signup' ? <input type="password" name='confirmPassword' placeholder='Confirm Password' onChange={handleChange} value={fields.confirmPassword} required/> : ''
            }
            <button type="submit">{type === 'signin' ? "Sign In" : "Sign Up"}</button>
        </MyForm>
    )
};

export default Form;