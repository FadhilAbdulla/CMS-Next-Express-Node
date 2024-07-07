'use client'
import React, { useState } from 'react';
import styles from './SignIn.module.css';
import { useRouter } from 'next/navigation'
import { UserLogin } from '@/Component/ApiFunction';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter()
  const [userEmail,setUserEmail] = useState("")
  const [userPassword,setUserPassword] = useState('')

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const LogedInClicked = async(e)=> {
    e.preventDefault()
    const response = await UserLogin(userEmail,userPassword)
    if (response["status"] == 200) {
      router.push(`/cms`, { scroll: false })
    }
  }

  return (
    <div className={styles.signInContainer}>
      <h2 className={styles.title}>Sign In</h2>
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input type="email" id="email" className={styles.input} placeholder="Enter your email" required value={userEmail} onChange={(e)=>setUserEmail(e.target.value)}/>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <div className={styles.passwordContainer}>
            <input 
              type={passwordVisible ? "text" : "password"} 
              id="password" 
              className={styles.input} 
              value={userPassword}
              placeholder="Enter your password" 
              required 
              onChange={(e)=>setUserPassword(e.target.value)}
            />
            <button 
              type="button" 
              className={styles.passwordToggle} 
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <button type="submit" className={styles.signInButton} onClick={LogedInClicked}>Sign In</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default SignIn;