import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../UserContext';
import '../../styles/auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useUser(); // Changed from setUser to login

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Validate inputs
    if (!email || !password) {
      setErrors({
        email: !email ? 'Email is required' : '',
        password: !password ? 'Password is required' : ''
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(email, password); // Use the login function from context
      
      if (result.success) {
        toast.success('Login successful!');
        navigate('/profile');
      } else {
        toast.error(result.message || 'Login failed');
        if (result.errors) {
          setErrors(result.errors);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
              }}
              className={errors.email ? 'input-error' : ''}
              required
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
              }}
              className={errors.password ? 'input-error' : ''}
              required
              placeholder="Enter your password"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <button type="submit" disabled={isLoading} className="auth-button">
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <a href="/register">Register</a></p>
          <p><a href="/forgot-password">Forgot Password?</a></p>
        </div>
      </div>
    </div>
  );
}