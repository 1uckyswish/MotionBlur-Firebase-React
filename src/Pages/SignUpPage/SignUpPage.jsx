import React, { useState } from 'react';
import './SignUpPage.css';
import { auth } from '../../Config/FirebaseConfig';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const [signIn, setSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        updateProfile(auth.currentUser, { displayName: name });
        navigate('/TimeLine');
        // Clear input values
        setEmail('');
        setName('');
        setPassword('');
      })
      .catch((error) => alert(error));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
        navigate('/TimeLine');
        // Clear input values
        setEmail('');
        setPassword('');
      })
      .catch((error) => alert(error));
  };

  return (
    <div className='form-container'>
      <div className='form-box-container'>
        <div className={signIn ? 'box-1' : 'welcome-member'}></div>
        <div className='box-2'>
          {signIn ? (
            <>
              <h2>Create Account</h2>
              <h4>Your Journey Starts Here: Sign Up for Limitless Possibilities!</h4>
              <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                  type='text'
                  placeholder='Username'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label>Email Address</label>
                <input
                  type='email'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label>Password</label>
                <input
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type='submit'>Sign Up</button>
              </form>
              <p>
                Already have an Account?{' '}
                <span onClick={() => setSignIn(!signIn)}>&nbsp;Log In!</span>
              </p>
            </>
          ) : (
            <>
              <h2>Welcome Back</h2>
              <h4>Continue Your Journey of Limitless Possibilities!</h4>
              <form onSubmit={handleLogin}>
                <label>Email Address</label>
                <input
                  type='email'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label>Password</label>
                <input
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type='submit'>Log In</button>
              </form>
              <p>
                Don't have an Account?{' '}
                <span onClick={() => setSignIn(!signIn)}>&nbsp;Sign Up!</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
