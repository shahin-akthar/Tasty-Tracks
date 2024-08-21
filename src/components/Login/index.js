import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import Cookies from 'js-cookie'
import './index.css';

const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [errorMsg, setErrorMsg] = useState('');
   const [isShown, setShown] = useState(false);
   const history = useHistory();

   const onClickPasswordIcon = () => {
      setShown(prev => !prev);
   };

   const onChangeEmail = event => {
      setEmail(event.target.value);
      setErrorMsg('');
   };

   const onChangePassword = event => {
      setPassword(event.target.value);
      setErrorMsg('');
   };

   const onChangePasswordText = event => {
      setPassword(event.target.value);
      setErrorMsg('');
   };

   const clickLoginBtn = async (event) => {
      event.preventDefault();
  
      if (email === '' || password === '') {
          setErrorMsg('*Email and Password are required');
          return;
      }
  
      setErrorMsg('');

      localStorage.setItem('user', JSON.stringify(email));
  
      const url = 'https://aktharrepo.onrender.com/login';
      const options = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
      };
  
      try {
          const response = await fetch(url, options);
          const data = await response.json();
          console.log(data)
          if (response.ok) {
              console.log('Success');
              Cookies.set('jwt_token', data.token, { expires: 3, path: '/' });
              history.replace('/');
          } else {
              setErrorMsg(data.error);
          }
      } catch (error) {
          setErrorMsg('Network error. Please try again.');
          console.error('Error:', error);
      }
  };
  

   const clickSignUp = () => {
      console.log('Sign up is clicked');
      history.push('/signup');
   };

   return (
      <div className='login-container'>
         <form className='login-card' onSubmit={clickLoginBtn}>
            <img src='https://res.cloudinary.com/dcqvdcsl9/image/upload/t_background/v1718439060/Paucek_and_Lage_3_1_a930qx.png' alt='logo' className='logo'/>
            <label className='details'>Email</label>
            <input type='email' placeholder='Enter Your Email' value={email} className='login-input' onChange={onChangeEmail}/>
            <label className='details'>Password</label>
            {isShown ? (
               <div className='password-container'>
                  <input type='text' placeholder='Enter Your Password' value={password} onChange={onChangePassword} className='password-input'/>
                  <IoIosEye className='password-icon' onClick={onClickPasswordIcon}/>
               </div>
            ) : (
               <div className='password-container'>
                  <input type='password' placeholder='Enter Your Password' value={password} onChange={onChangePasswordText} className='password-input'/>
                  <IoIosEyeOff className='password-icon' onClick={onClickPasswordIcon}/>
               </div>
            )}
            <p className='error'>{errorMsg}</p>
            <button type='submit' className='login-btn'>Login</button>
            <p className='sign-up-option'>Not a member?   
               <span className='sign-up-element' onClick={clickSignUp}> Sign Up</span></p>
         </form>
      </div>
   );
};

export default Login; 