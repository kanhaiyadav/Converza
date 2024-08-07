import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/user/user.slice';

const SignIn = () => {
    const [Mobile, setMobile] = React.useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleMobileChange = (e) => {
        setMobile(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const createPromise = dispatch(login({
            phoneNo: Mobile
        })).unwrap();
        createPromise.then(() => {
            navigate('/');
        }).catch(() => {
            navigate('/signup');
        })
    }
  return (
      <form
          onSubmit={handleSubmit}
          style={{
              margin: 'auto'
        }}
      >
          <h1>Sign In</h1>
          <input type="text" placeholder='Mobile no...' onChange={handleMobileChange} value={Mobile}/>
          <button type="submit">Sign In</button>
    </form>
  )
}

export default SignIn;