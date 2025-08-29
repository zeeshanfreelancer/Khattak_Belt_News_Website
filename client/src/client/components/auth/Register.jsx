import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import API from '../../../services/api'; // Ensure this path is correct
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/auth.css'; 

const Register = () => {
  const navigate = useNavigate();
  const { register } = useUser(); // Using register from UserContext
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^.\s@]+[^@\s]*@[^.\s@]+\.[^.\s@]+$/.test(formData.email)) { // More robust email regex
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please correct the errors in the form.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await register({ // Use the register function from UserContext
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      if (result.success) {
        toast.success('Registration successful!');
        navigate('/profile'); // Redirect to profile page on successful registration
      } else {
        // Handle specific errors from backend validation
        if (result.errors) {
          const backendErrors = {};
          result.errors.forEach(err => {
            if (err.field) { // Check if 'field' property exists
              backendErrors[err.field] = err.message;
            }
          });
          setErrors(prev => ({ ...prev, ...backendErrors }));
        }
        toast.error(result.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration API error:', error);
      toast.error('Network Error: Could not connect to the server. Please check your internet connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'input-error' : ''}
              disabled={isLoading}
              placeholder="Enter your username"
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
              disabled={isLoading}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
              disabled={isLoading}
              placeholder="Enter your password"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
            <p className="password-hint">Minimum 6 characters</p>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'input-error' : ''}
              disabled={isLoading}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span> Registering...
              </>
            ) : 'Register'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <a href="/login">Sign In</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;