import React, { useContext, useState } from 'react';
import sty from './Authentication.module.scss';

import Logo from '../../assets/Logo.svg';
import { clearErrors, loginUser, registerUser } from '../../store/actions';
import { context } from '../../store/store';
import {
  comparePasswords,
  getAuthErrorMessage,
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
  const [showPassWord, setShowPassWord] = useState('password');
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
      setPasswordError('Password should be at least 6 characters long');
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

  const clearErrorHandler = () => {
    if (passwordError) setPasswordError('');
    if (confirmPasswordError) setConfirmPasswordError('');
    if (emailError) setEmailError('');
    if (state.error) clearErrors()(dispatch);
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
            <p>Join us today and take control of your financial journey!</p>
          ) : (
            <p>
              Welcome back! Please enter your credentials to access your
              account.
            </p>
          )}
        </div>
        <div className={sty.form}>
          <div className={sty.inputBox}>
            <label htmlFor="" className={sty.mandatory}>
              Email
            </label>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={handleEmailChange}
              onFocus={() => clearErrorHandler()}
            />
            <small>{emailError}</small>
          </div>
          <div className={sty.inputBox}>
            <label htmlFor="" className={sty.mandatory}>
              Password
            </label>
            <input
              type={showPassWord}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              onFocus={() => clearErrorHandler()}
            />
            <div className={sty.showPass}>
              <p
                onClick={() =>
                  setShowPassWord(prev =>
                    prev === 'password' ? 'text' : 'password'
                  )
                }
              >
                {showPassWord === 'password' ? 'show' : 'hide'}
              </p>
            </div>
            <small>{passwordError}</small>
          </div>
          {authSwitch && (
            <div className={sty.inputBox}>
              <label htmlFor="" className={sty.mandatory}>
                Password
              </label>
              <input
                type={showPassWord}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                onFocus={() => clearErrorHandler()}
              />
              <div className={sty.showPass}>
                <p
                  onClick={() =>
                    setShowPassWord(prev =>
                      prev === 'password' ? 'text' : 'password'
                    )
                  }
                >
                  {showPassWord === 'password' ? 'show' : 'hide'}
                </p>
              </div>
              <small>{confirmPasswordError}</small>
            </div>
          )}
          <small className={sty.authError}>
            {getAuthErrorMessage(state.error)}
          </small>
          <button onClick={e => handleSubmit(e)}>
            {authSwitch ? 'Register' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
