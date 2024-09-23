import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { MyForm } from "./SignInUpForm.styles";
import { useDispatch } from "react-redux";
import { signup, signin } from "../../redux/user/user.slice";
import { toast } from "react-toastify";
import { signInMessageProvider, signUpMessageProvider } from "./messages";
import { motion } from "framer-motion";




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

    const parentVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Adjust the stagger delay
            },
        },
    };

    const childVariants = {
        hidden: { y: 100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 12,
            }
        },
    };

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
            <motion.main
                variants={parentVariants}  // Apply variants to the parent
                initial="hidden"           // Start with the hidden state
                animate="visible"
            >
                {
                    type === 'signup' ? <motion.input variants={childVariants} type="text" name='displayName' placeholder='Display Name' onChange={handleChange} autoFocus value={fields.displayName} required /> : ''
                }
                <motion.input variants={childVariants} type="text" name='username' placeholder='Username' autoFocus={type === 'signin' ? true : false} onChange={handleChange} value={fields.username} required />
                <motion.input variants={childVariants} type="password" name='password' placeholder='Password' onChange={handleChange} value={fields.password} required />
                {
                    type === 'signup' ? <motion.input variants={childVariants} type="password" name='confirmPassword' placeholder='Confirm Password' onChange={handleChange} value={fields.confirmPassword} required /> : ''
                }
                <motion.button variants={childVariants} type="submit">{type === 'signin' ? "Sign In" : "Sign Up"}</motion.button>
            </motion.main>
        </MyForm>
    )
};

export default Form;