import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { MyForm } from "./SignInUpForm.styles";
import { useDispatch } from "react-redux";
import { signup, signin } from "../../redux/user/user.slice";
import { toast } from "react-toastify";
import { signInMessageProvider, signUpMessageProvider } from "./messages";


const Form = ({ type }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(type);

    const [fields, setFields] = useState({
        displayName: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const reset = () => {
        setFields({
            displayName: '',
            username: '',
            password: '',
            confirmPassword: '',
        });
    }

    useEffect(() => {
        reset();
    }, [type]);

    const signIn = () => {
        const promise = dispatch(signin(fields)).unwrap();
        toast.promise(promise, {
            pending: 'Signing In...',
            success: {
                render({ data }) {
                    navigate('/chats');
                    reset();
                    return signInMessageProvider();
                }
            },
            error: {
                render({ data }) {
                    navigate('/signin');
                    return data.message;
                }
            }
        });
    }

    const signUp = () => {
        const promise = dispatch(signup(fields)).unwrap();
        toast.promise(promise, {
            pending: 'Signing Up...',
            success: {
                render({ data }) {
                    navigate('/signin');
                    reset();
                    return signUpMessageProvider();
                }
            },
            error: {
                render({ data }) {
                    navigate('/signup');
                    return data.message;
                }
            }
        });
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