import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { IoIosEyeOff, IoIosEye } from "react-icons/io";

import './index.css';

const SignUp = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [errorMsg, setErrorMsg] = useState('');
   const [isShown1, setShown1] = useState(false);
   const [isShown2, setShown2] = useState(false);
   const history = useHistory();

   const hideIcon1 = () => {
      setShown1(prev => !prev);
   };

   const hideIcon2 = () => {
      setShown2(prev => !prev);
   };

   const onChangeEmail = event => {
      setEmail(event.target.value);
      setErrorMsg('');
   };

   const onChangePassword = event => {
      setPassword(event.target.value);
      setErrorMsg('');
   };

   const onChangeConfirmPassword = event => {
      setConfirmPassword(event.target.value);
      setErrorMsg('');
   };

   const clickLogin = () => {
      console.log('Login clicked');
      history.push('/login');
   };

   const clickSignUpBtn = async event => {
      event.preventDefault();

      if (email === '' || password === '' || confirmPassword === '') {
         setErrorMsg('*All fields are required');
         return;
      } else if (password !== confirmPassword) {
         setErrorMsg('*Password and Confirm Password must be the same');
         return;
      }

      setErrorMsg('');

      localStorage.setItem('user', JSON.stringify(email));

      const url = 'http://localhost:3000/sign-up';
      const options = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ email, password, confirmPassword }),
      };

      try {
         const response = await fetch(url, options);
         const data = await response.json();

         if (response.ok) {
            console.log(data.token);
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

   return (
      <div className='login-container'>
         <form className='login-card' onSubmit={clickSignUpBtn}>
            <img src='https://res.cloudinary.com/dcqvdcsl9/image/upload/t_background/v1718439060/Paucek_and_Lage_3_1_a930qx.png' alt='logo' className='logo' />
            <label className='details'>Email</label>
            <input type='email' placeholder='Enter Your Email' value={email} className='login-input' onChange={onChangeEmail} />
            <label className='details'>Create Password</label>
            {isShown1 ? (
               <div className='password-container'>
                  <input type='text' placeholder='Create Your Password' value={password} onChange={onChangePassword} className='password-input' />
                  <IoIosEye className='password-icon' onClick={hideIcon1} />
               </div>
            ) : (
                  <div className='password-container'>
                     <input type='password' placeholder='Create Your Password' value={password} onChange={onChangePassword} className='password-input' />
                     <IoIosEyeOff className='password-icon' onClick={hideIcon1} />
                  </div>
               )}
            <label className='details'>Confirm Password</label>
            {isShown2 ? (
               <div className='password-container'>
                  <input type='text' placeholder='Confirm Your Password' value={confirmPassword} onChange={onChangeConfirmPassword} className='password-input' />
                  <IoIosEye className='password-icon' onClick={hideIcon2} />
               </div>
            ) : (
                  <div className='password-container'>
                     <input type='password' placeholder='Confirm Your Password' value={confirmPassword} onChange={onChangeConfirmPassword} className='password-input' />
                     <IoIosEyeOff className='password-icon' onClick={hideIcon2} />
                  </div>
               )}
            {errorMsg && <p className='error'>{errorMsg}</p>}
            <button type='submit' className='login-btn'>SignUp</button>
            <p className='sign-up-option'>Already a member?
               <span className='sign-up-element' onClick={clickLogin}> Login</span></p>
         </form>
      </div>
   );
};

export default SignUp;
