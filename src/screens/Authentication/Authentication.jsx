import React, { useContext, useState } from 'react';
import sty from './Authentication.module.scss';

import Logo from '../../assets/Logo.svg';
import { loginUser, registerUser } from '../../store/actions';
import { context } from '../../store/store';
import {
  comparePasswords,
  validateEmail,
  validatePassword,
} from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

const Authentication = () => {
  const { state, dispatch } = useContext(context);
  const [authSwitch, setAuthSwitch] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();
  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = e => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Reset any previous error messages
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Validate email
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      setPasswordError('Password should be at least 8 characters long');
      return;
    }

    // Compare passwords
    if (authSwitch && !comparePasswords(password, confirmPassword)) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }
    if (authSwitch) registerUser({ email, password, navigate })(dispatch);
    else loginUser({ email, password, navigate })(dispatch);
  };

  return (
    <div className={sty.app}>
      <div className={sty.auth}>
        <div className={sty.logo}>
          <img src={Logo} alt="" />
        </div>
        <div className={sty.switch}>
          <div
            className={authSwitch && sty.active}
            onClick={() => setAuthSwitch(!authSwitch)}
          >
            Login
          </div>
          <div
            className={!authSwitch && sty.active}
            onClick={() => setAuthSwitch(!authSwitch)}
          >
            Register
          </div>
        </div>
        <div className={sty.subtitle}>
          {authSwitch ? (
            <div>Create your new Account.</div>
          ) : (
            <div>Enter your details to Login</div>
          )}
        </div>
        <div className={sty.form}>
          <div className={sty.inputBox}>
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className={sty.inputBox}>
            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          {authSwitch && (
            <div className={sty.inputBox}>
              <label htmlFor="">Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
          )}
          <button onClick={e => handleSubmit(e)}>
            {authSwitch ? 'Register' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
