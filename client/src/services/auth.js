// src/utils/auth.js
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; // Returns true if token exists
};

// Example: ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;