import React, {useState} from 'react'
import './SignUpPage.css'

function SignUpPage() {
    const [signIn, setSignIn] = useState(false);

  return (
    <div className='form-container'>
        <div className='form-box-container'>
            <div className={signIn? "box-1" : "welcome-member"}>
            </div>
            <div className="box-2">
                {
                signIn ? (
                        <>
                        <h2>Create Account</h2>
                        <h4>Your Journey Starts Here: Sign Up for Limitless Possibilities!</h4>
                        </>) 
                        : (
                        <>
                        <h2>Welcome Back</h2>
                        <h4>Continue Your Journey of Limitless Possibilities!</h4>
                        </>)
                }
                    <form>
                        <label>Username</label>
                        <input type='text' placeholder='Username'/>
                        <label>Email Address</label>
                        <input type='email' placeholder='Email'/>
                        <label>Password</label>
                        <input type='password' placeholder='Password'/>
                        <input type="button" value='Submit' />
                    </form>
            </div>
        </div>
    </div>
  )
}

export default SignUpPage