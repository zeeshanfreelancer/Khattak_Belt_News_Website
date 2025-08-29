import { createContext, useContext, useState, useEffect } from 'react';
import API from '../../services/api';
import { toast } from 'react-toastify';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState('');
  const [loading, setLoading] = useState(true);

// Check authentication status on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        const { data } = await API.get('/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(data.user);
        setProfilePic(data.user.profilePic || '');
      } catch (err) {
        console.error('Auth check error:', err);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // User login function
  const login = async (email, password) => {
  try {
    const { data } = await API.post('/auth/login', { email, password }, { withCredentials: true });
    
    localStorage.setItem('token', data.token);
    setUser(data.user);
    
    return { 
      success: true, 
      user: data.user 
    };
  } catch (err) {
    console.error('Login error:', err);
    
    let message = 'Login failed';
    if (err.response) {
      switch (err.response.status) {
        case 401:
          message = 'Invalid credentials';
          break;
        case 404:
          message = 'User not found';
          break;
        case 400:
          message = err.response.data.message || 'Validation error';
          break;
      }
    }
    
    return { 
      success: false, 
      message,
      errors: err.response?.data?.errors || {}
    };
  }
};

  // User registration function
  const register = async (userData) => {
  try {
    const { data } = await API.post('/auth/register', userData, { 
      withCredentials: true 
    });
    
    localStorage.setItem('token', data.token);
    setUser(data.user);
    
    return { 
      success: true, 
      user: data.user 
      // Removed toast.success() from here
    };
  } catch (err) {
    console.error('Registration error:', err);
    
    let message = 'Registration failed';
    if (err.response) {
      switch (err.response.status) {
        case 400:
          message = err.response.data.message || 'Validation error';
          break;
        case 409:
          message = 'User already exists';
          break;
      }
    }
    
    return { 
      success: false, 
      message,
      errors: err.response?.data?.errors || [] 
    };
  }
};

  // Modify ONLY the logout function to remove useNavigate
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setProfilePic('');
    toast.success('Logged out successfully!');
    // Remove the navigate call here
  };

// Update user profile function
  const updateProfile = async (profileData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Authentication required');
      return { success: false, message: 'Not authenticated' };
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };

    const { data } = await API.put('/users/profile', profileData, config);
    
    setUser(data.user);
    toast.success('Profile updated successfully!'); // Only show toast here
    return { success: true, user: data.user };
  } catch (err) {
    console.error('Update profile error:', err);
    const errorMessage = err.response?.data?.message || 'Failed to update profile';
    return { 
      success: false, 
      message: errorMessage,
      errors: err.response?.data?.errors || {}
    };
  }
};

  // Update profile picture function
  const updateProfilePic = async (imageData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Authentication required');
        return { success: false, message: 'Not authenticated' };
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await API.put('/user/profile-pic', { image: imageData }, config);
      setProfilePic(data.profilePic);
      toast.success('Profile picture updated!');
      return { success: true, profilePic: data.profilePic };
    } catch (err) {
      console.error('Profile picture update error:', err);
      const errorMessage = err.response?.data?.message || 'Failed to update profile picture';
      toast.error(errorMessage);
      return { 
        success: false, 
        message: errorMessage 
      };
    }
  };

  // Refresh user data function
  const refreshUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const { data } = await API.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(data.user);
      setProfilePic(data.user.profilePic || '');
    } catch (err) {
      console.error('Refresh user error:', err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        profilePic,
        loading,
        login,
        register,
        logout,  // This stays the same
        updateProfile,
        updateProfilePic
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);