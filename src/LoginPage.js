import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);

  // Form Fields State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Touch States
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  // Error States
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
  // Submit Feedback Status
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const navigate = useNavigate();

  // Instant Validation Hooks
  useEffect(() => {
    if (nameTouched) {
      if (!name.trim()) {
        setNameError('Name is required.');
      } else if (name.trim().length < 2) {
        setNameError('Name must be at least 2 characters.');
      } else if (!/^[A-Za-z\s]+$/.test(name)) {
        setNameError('Name can only contain letters and spaces.');
      } else {
        setNameError('');
      }
    }
  }, [name, nameTouched]);

  useEffect(() => {
    if (emailTouched) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        setEmailError('Email address is required.');
      } else if (!emailRegex.test(email)) {
        setEmailError('Please enter a valid email address (e.g. name@domain.com).');
      } else {
        setEmailError('');
      }
    }
  }, [email, emailTouched]);

  useEffect(() => {
    if (passwordTouched) {
      if (!password) {
        setPasswordError('Password is required.');
      } else if (password.length < 6) {
        setPasswordError('Password must be at least 6 characters.');
      } else {
        setPasswordError('');
      }
    }
  }, [password, passwordTouched]);

  useEffect(() => {
    if (confirmPasswordTouched) {
      if (!confirmPassword) {
        setConfirmPasswordError('Please confirm your password.');
      } else if (confirmPassword !== password) {
        setConfirmPasswordError('Passwords do not match.');
      } else {
        setConfirmPasswordError('');
      }
    }
  }, [confirmPassword, password, confirmPasswordTouched]);

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    
    setNameTouched(false);
    setEmailTouched(false);
    setPasswordTouched(false);
    setConfirmPasswordTouched(false);

    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    setErrorMsg('');
    setSuccessMsg('');
  };

  // Submission validity checks
  const isLoginValid = email !== '' && password !== '' && emailError === '' && passwordError === '';
  
  const isSignUpValid = 
    name !== '' && 
    email !== '' && 
    password !== '' && 
    confirmPassword !== '' &&
    nameError === '' && 
    emailError === '' && 
    passwordError === '' && 
    confirmPasswordError === '';

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);

    if (!isLoginValid) return;

    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find((u) => u.email === email.toLowerCase());

      if (!user || user.password !== password) {
        setErrorMsg('Invalid email or password.');
        return;
      }

      setSuccessMsg(`Welcome back, ${user.name}!`);
      if (onLogin) {
        onLogin(user);
      }
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setErrorMsg('Login failed. Please try again.');
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setNameTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);
    setConfirmPasswordTouched(true);

    if (!isSignUpValid) return;

    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = users.some((u) => u.email === email.toLowerCase());

      if (userExists) {
        setErrorMsg('This email is already registered.');
        return;
      }

      const newUser = {
        name: name.trim(),
        email: email.toLowerCase(),
        password: password
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      setSuccessMsg('Account created successfully! Switching to login...');
      setTimeout(() => {
        setIsSignUp(false);
        setPassword('');
        setConfirmPassword('');
        setName('');
        
        setNameTouched(false);
        setEmailTouched(false);
        setPasswordTouched(false);
        setConfirmPasswordTouched(false);
        
        setErrorMsg('');
        setSuccessMsg('');
      }, 2000);
    } catch (err) {
      setErrorMsg('Signup failed. Please try again.');
    }
  };

  return (
    <section style={{ padding: '5rem 0', minHeight: '80vh', backgroundColor: '#fcfcfc' }}>
      <div 
        className="grid-12" 
        style={{ 
          maxWidth: '450px', 
          margin: '0 auto', 
          background: '#ffffff', 
          padding: '3rem', 
          borderRadius: '20px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)' 
        }}
      >
        <div style={{ gridColumn: '1 / 13' }}>
          {/* Header Tab Selector */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
            <button 
              onClick={() => isSignUp && handleToggle()} 
              style={{
                background: 'none',
                border: 'none',
                fontSize: '18px',
                fontWeight: !isSignUp ? 'bold' : 'normal',
                color: !isSignUp ? 'var(--primary-green)' : '#888888',
                cursor: 'pointer',
                borderBottom: !isSignUp ? '2px solid var(--primary-green)' : 'none',
                paddingBottom: '5px'
              }}
            >
              Login
            </button>
            <button 
              onClick={() => !isSignUp && handleToggle()} 
              style={{
                background: 'none',
                border: 'none',
                fontSize: '18px',
                fontWeight: isSignUp ? 'bold' : 'normal',
                color: isSignUp ? 'var(--primary-green)' : '#888888',
                cursor: 'pointer',
                borderBottom: isSignUp ? '2px solid var(--primary-green)' : 'none',
                paddingBottom: '5px'
              }}
            >
              Sign Up
            </button>
          </div>

          {/* Feedback Banners */}
          {errorMsg && (
            <div style={{ padding: '1rem', background: '#ffebee', color: '#c62828', borderRadius: '10px', marginBottom: '1.5rem', fontSize: '14px', fontWeight: '500' }}>
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div style={{ padding: '1rem', background: '#e8f5e9', color: '#2e7d32', borderRadius: '10px', marginBottom: '1.5rem', fontSize: '14px', fontWeight: '500' }}>
              {successMsg}
            </div>
          )}

          {!isSignUp ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} style={{ display: 'grid', gap: '20px' }}>
              <h2 className="modal-title" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login to Your Account</h2>
              
              <div style={{ display: 'grid', gap: '5px' }}>
                <label className="form-label" htmlFor="login-email">Email Address</label>
                <input 
                  type="email" 
                  id="login-email" 
                  className="form-input"
                  style={{ borderColor: emailError ? 'var(--secondary-salmon)' : '' }}
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  onBlur={() => setEmailTouched(true)}
                  required 
                />
                {emailError && (
                  <span style={{ color: 'var(--secondary-salmon)', fontSize: '13px', fontWeight: '500' }}>
                    {emailError}
                  </span>
                )}
              </div>
              
              <div style={{ display: 'grid', gap: '5px' }}>
                <label className="form-label" htmlFor="login-password">Password</label>
                <input 
                  type="password" 
                  id="login-password" 
                  className="form-input"
                  style={{ borderColor: passwordError ? 'var(--secondary-salmon)' : '' }}
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  onBlur={() => setPasswordTouched(true)}
                  required 
                />
                {passwordError && (
                  <span style={{ color: 'var(--secondary-salmon)', fontSize: '13px', fontWeight: '500' }}>
                    {passwordError}
                  </span>
                )}
              </div>
              
              <button 
                type="submit" 
                className="btn-primary" 
                style={{ 
                  width: '100%', 
                  marginTop: '1.5rem', 
                  cursor: isLoginValid ? 'pointer' : 'not-allowed',
                  opacity: isLoginValid ? 1 : 0.5
                }}
                disabled={!isLoginValid}
              >
                Login
              </button>

              <p style={{ textAlign: 'center', color: '#666666', fontSize: '14px', marginTop: '1rem' }}>
                Don't have an account?{' '}
                <span 
                  onClick={handleToggle} 
                  style={{ color: 'var(--primary-green)', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Sign up here
                </span>
              </p>
            </form>
          ) : (
            /* Sign Up Form */
            <form onSubmit={handleSignUpSubmit} style={{ display: 'grid', gap: '20px' }}>
              <h2 className="modal-title" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Create an Account</h2>
              
              <div style={{ display: 'grid', gap: '5px' }}>
                <label className="form-label" htmlFor="signup-name">Full Name</label>
                <input 
                  type="text" 
                  id="signup-name" 
                  className="form-input"
                  style={{ borderColor: nameError ? 'var(--secondary-salmon)' : '' }}
                  placeholder="John Doe"
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  onBlur={() => setNameTouched(true)}
                  required 
                />
                {nameError && (
                  <span style={{ color: 'var(--secondary-salmon)', fontSize: '13px', fontWeight: '500' }}>
                    {nameError}
                  </span>
                )}
              </div>

              <div style={{ display: 'grid', gap: '5px' }}>
                <label className="form-label" htmlFor="signup-email">Email Address</label>
                <input 
                  type="email" 
                  id="signup-email" 
                  className="form-input"
                  style={{ borderColor: emailError ? 'var(--secondary-salmon)' : '' }}
                  placeholder="example@mail.com"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  onBlur={() => setEmailTouched(true)}
                  required 
                />
                {emailError && (
                  <span style={{ color: 'var(--secondary-salmon)', fontSize: '13px', fontWeight: '500' }}>
                    {emailError}
                  </span>
                )}
              </div>
              
              <div style={{ display: 'grid', gap: '5px' }}>
                <label className="form-label" htmlFor="signup-password">
                  Password <span style={{ fontSize: '12px', color: '#888888', fontWeight: 'normal' }}>(Min 6 chars)</span>
                </label>
                <input 
                  type="password" 
                  id="signup-password" 
                  className="form-input"
                  style={{ borderColor: passwordError ? 'var(--secondary-salmon)' : '' }}
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  onBlur={() => setPasswordTouched(true)}
                  required 
                />
                {passwordError && (
                  <span style={{ color: 'var(--secondary-salmon)', fontSize: '13px', fontWeight: '500' }}>
                    {passwordError}
                  </span>
                )}
              </div>

              <div style={{ display: 'grid', gap: '5px' }}>
                <label className="form-label" htmlFor="signup-confirm-password">Confirm Password</label>
                <input 
                  type="password" 
                  id="signup-confirm-password" 
                  className="form-input"
                  style={{ borderColor: confirmPasswordError ? 'var(--secondary-salmon)' : '' }}
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  onBlur={() => setConfirmPasswordTouched(true)}
                  required 
                />
                {confirmPasswordError && (
                  <span style={{ color: 'var(--secondary-salmon)', fontSize: '13px', fontWeight: '500' }}>
                    {confirmPasswordError}
                  </span>
                )}
              </div>
              
              <button 
                type="submit" 
                className="btn-primary" 
                style={{ 
                  width: '100%', 
                  marginTop: '1.5rem', 
                  cursor: isSignUpValid ? 'pointer' : 'not-allowed',
                  opacity: isSignUpValid ? 1 : 0.5
                }}
                disabled={!isSignUpValid}
              >
                Sign Up
              </button>

              <p style={{ textAlign: 'center', color: '#666666', fontSize: '14px', marginTop: '1rem' }}>
                Already have an account?{' '}
                <span 
                  onClick={handleToggle} 
                  style={{ color: 'var(--primary-green)', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Login here
                </span>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
