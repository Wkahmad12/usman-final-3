import React, { useState, useEffect } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import { login, signup, sendPasswordReset } from '../../firebase';

const Login = ({ isLoggedOut }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  // Reset form when logged out
  useEffect(() => {
    if (isLoggedOut) {
      setName('');
      setEmail('');
      setPassword('');
      setResetEmail('');
      setIsSignUp(false);  // Ensure it shows Sign In view by default
      setIsForgotPassword(false);  // Reset forgot password view

      // Reset the form explicitly
      const form = document.querySelector('.login-form form');
      if (form) {
        form.reset();
      }
    }
  }, [isLoggedOut]);

  const toggleForm = () => {
    setIsSignUp((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await signup(name, email, password);
        alert('Account created successfully!');
      } else {
        await login(email, password);
        alert('Logged in successfully!');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true);  // Switch to forgot password view
  };

  const handleSendResetLink = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordReset(resetEmail);  // Send password reset email via Firebase
      alert('Password reset email sent! Please check your inbox.');
      setIsForgotPassword(false);  // Switch back to login form
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login">
      <img src={logo} className="login-logo" alt="Logo" />
      <div className="login-form">
        <h1>{isForgotPassword ? 'Reset Password' : isSignUp ? 'Sign Up' : 'Sign In'}</h1>
        {isForgotPassword ? (
          <form onSubmit={handleSendResetLink}>
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
            />
            <button type="submit">Send Reset Link</button>
            <p
              onClick={() => setIsForgotPassword(false)}
              style={{ cursor: 'pointer', color: 'blue' }}
            >
              Back to Sign In
            </p>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
            {!isSignUp && (
              <p
                onClick={handleForgotPassword}
                className="forgot-password-link"
              >
                Forgot Password?
              </p>
            )}
            {isSignUp && (
              <div className="form-help">
                <div className="Remember">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember Me</label>
                </div>
                <p>Need Help?</p>
              </div>
            )}
          </form>
        )}
        <div className="form-switch">
          <p>
            {isSignUp ? (
              <>
                Already have an account?{' '}
                <span onClick={toggleForm} style={{ cursor: 'pointer', color: 'blue' }}>
                  Sign In Now
                </span>
              </>
            ) : (
              <>
                New to Movie Hub?{' '}
                <span onClick={toggleForm} style={{ cursor: 'pointer', color: 'blue' }}>
                  Sign Up Now
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
