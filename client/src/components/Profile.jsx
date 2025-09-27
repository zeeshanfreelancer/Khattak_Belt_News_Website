import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEdit, FaSave, FaSignOutAlt, FaTrash, FaEye, FaEyeSlash, FaLock, FaGlobe } from 'react-icons/fa';
// import API from '../../services/api';
import '../styles/profile.css';

export default function Profile() {
  const { user, profilePic, updateProfilePic, logout, updateProfile } = useUser();
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    aboutMe: '',
    skills: '',
    experience: '',
    education: '',
    interests: ''
  });
  const [visibility, setVisibility] = useState({
    aboutMe: 'private',
    personalia: 'private',
    contact: 'private',
    skills: 'private',
    experience: 'private',
    education: 'private',
    certificates: 'private',
    interests: 'private'
  });
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        aboutMe: user.aboutMe || '',
        skills: Array.isArray(user.skills) ? user.skills.join(', ') : (user.skills || ''),
        experience: user.experience || '',
        education: user.education || '',
        interests: Array.isArray(user.interests) ? user.interests.join(', ') : (user.interests || '')
      });
      setVisibility(user.visibility || {
        aboutMe: 'private',
        personalia: 'private',
        contact: 'private',
        skills: 'private',
        experience: 'private',
        education: 'private',
        certificates: 'private',
        interests: 'private'
      });
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const toggleVisibility = (field) => {
    setVisibility(prev => ({
      ...prev,
      [field]: prev[field] === 'public' ? 'private' : 'public'
    }));
  };

  const handleSaveProfile = async () => {
  try {
    setEditMode(false);
    
    const processField = (field) => {
      if (!field) return [];
      if (Array.isArray(field)) return field;
      if (typeof field === 'string') return field.split(',').map(item => item.trim()).filter(item => item);
      return [];
    };

    const dataToUpdate = {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      aboutMe: profileData.aboutMe,
      skills: processField(profileData.skills),
      experience: profileData.experience,
      education: profileData.education,
      interests: processField(profileData.interests),
      visibility
    };

    const result = await updateProfile(dataToUpdate);
    if (!result.success) {
      if (result.errors) {
        Object.entries(result.errors).forEach(([field, message]) => {
          toast.error(`${field}: ${message}`);
        });
      } else {
        toast.error(result.message || 'Failed to update profile.');
      }
    }
    // Removed the success toast here - let the context handle it
  } catch (error) {
    console.error('Profile update error:', error);
    toast.error('An unexpected error occurred while updating your profile');
  }
};

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64Image = reader.result;
        const result = await updateProfilePic(base64Image);
        if (result.success) {
          toast.success('Profile picture updated!');
        } else {
          toast.error(result.message || 'Failed to upload profile picture.');
        }
        setUploading(false);
      };
      reader.onerror = () => {
        toast.error('Error reading file.');
        setUploading(false);
      };
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!user) {
    return <div className="profile-container">Please log in to view your profile.</div>;
  }

return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-pic-section">
          <label htmlFor="profilePicInput" className="profile-pic-label">
            <img 
              src={profilePic || user.profilePic || '/images/default-avatar.png'} 
              alt="Profile" 
              className="profile-pic" 
            />
            <input 
              id="profilePicInput" 
              type="file" 
              accept="image/*" 
              onChange={handleProfilePicChange} 
              style={{ display: 'none' }} 
              disabled={uploading}
            />
            {uploading && <div className="upload-spinner"></div>}
            <div className="edit-overlay">
              <FaEdit />
            </div>
          </label>
          <h2 className="username">{user.username}</h2>
          <p className="user-email">{user.email}</p>
        </div>
        <div className="profile-actions">
          {editMode ? (
            <button onClick={handleSaveProfile} className="profile-action-btn save-btn">
              <FaSave /> Save
            </button>
          ) : (
            <button onClick={() => setEditMode(true)} className="profile-action-btn edit-btn">
              <FaEdit /> Edit Profile
            </button>
          )}
          <button onClick={handleLogout} className="profile-action-btn logout-btn">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      <div className="profile-details">
        {/* About Me Card */}
        <div className="profile-card card-animate">
          <div className="card-header">
            <h3>About Me</h3>
            <button
              className={`visibility-btn ${visibility.aboutMe}`}
              onClick={() => toggleVisibility('aboutMe')}
            >
              {visibility.aboutMe === 'private' ? <FaLock /> : <FaGlobe />}
              {visibility.aboutMe === 'private' ? 'Private' : 'Public'}
            </button>
          </div>
          <div className="card-content">
            {editMode ? (
              <textarea
                name="aboutMe"
                value={profileData.aboutMe}
                onChange={handleInputChange}
                className="profile-textarea"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p>{profileData.aboutMe || 'No description provided.'}</p>
            )}
          </div>
        </div>

        {/* Personal Details Card */}
        <div className="profile-card card-animate">
          <div className="card-header">
            <h3>Personal Details</h3>
            <button
              className={`visibility-btn ${visibility.personalia}`}
              onClick={() => toggleVisibility('personalia')}
            >
              {visibility.personalia === 'private' ? <FaLock /> : <FaGlobe />}
              {visibility.personalia === 'private' ? 'Private' : 'Public'}
            </button>
          </div>
          <div className="card-content">
            <p><strong>First Name:</strong> {editMode ? (
              <input
                type="text"
                name="firstName"
                value={profileData.firstName}
                onChange={handleInputChange}
                className="profile-input"
                placeholder="First Name"
              />
            ) : (profileData.firstName || 'Not set')}</p>
            <p><strong>Last Name:</strong> {editMode ? (
              <input
                type="text"
                name="lastName"
                value={profileData.lastName}
                onChange={handleInputChange}
                className="profile-input"
                placeholder="Last Name"
              />
            ) : (profileData.lastName || 'Not set')}</p>
          </div>
        </div>

        {/* Skills Card */}
        <div className="profile-card card-animate">
          <div className="card-header">
            <h3>Skills</h3>
            <button
              className={`visibility-btn ${visibility.skills}`}
              onClick={() => toggleVisibility('skills')}
            >
              {visibility.skills === 'private' ? <FaLock /> : <FaGlobe />}
              {visibility.skills === 'private' ? 'Private' : 'Public'}
            </button>
          </div>

          <div className="card-content">
            {editMode ? (
              <input
                type="text"
                name="skills"
                value={profileData.skills}
                onChange={handleInputChange}
                className="profile-input"
                placeholder="Comma separated skills (e.g., React, Node.js)"
              />
            ) : (
              <div className="skills-container">
                {profileData.skills.split(',').map((skill, index) => (
                  <span key={index} className="skill-tag">{skill.trim()}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Experience Card */}
        <div className="profile-card card-animate">
          <div className="card-header">
            <h3>Experience</h3>
            <button
              className={`visibility-btn ${visibility.experience}`}
              onClick={() => toggleVisibility('experience')}
            >
              {visibility.experience === 'private' ? <FaLock /> : <FaGlobe />}
              {visibility.experience === 'private' ? 'Private' : 'Public'}
            </button>
          </div>

          <div className="card-content">
            {editMode ? (
              <textarea
                name="experience"
                value={profileData.experience}
                onChange={handleInputChange}
                className="profile-textarea"
                placeholder="Your work experience..."
              />
            ) : (
              <p>{profileData.experience || 'No experience added.'}</p>
            )}
          </div>
        </div>

        {/* Education Card */}
        <div className="profile-card card-animate">
          <div className="card-header">
            <h3>Education</h3>
            <button
              className={`visibility-btn ${visibility.education}`}
              onClick={() => toggleVisibility('education')}
            >
              {visibility.education === 'private' ? <FaLock /> : <FaGlobe />}
              {visibility.education === 'private' ? 'Private' : 'Public'}
            </button>
          </div>

          <div className="card-content">
            {editMode ? (
              <textarea
                name="education"
                value={profileData.education}
                onChange={handleInputChange}
                className="profile-input"
                placeholder="Your education background..."
              />
            ) : (
              <p className="education-text">{profileData.education}</p>
            )}
          </div>
        </div>

        {/* Interests Card */}
        <div className="profile-card card-animate">
          <div className="card-header">
            <h3>Interests</h3>
            <button
              className={`visibility-btn ${visibility.interests}`}
              onClick={() => toggleVisibility('interests')}
            >
              {visibility.interests === 'private' ? <FaLock /> : <FaGlobe />}
              {visibility.interests === 'private' ? 'Private' : 'Public'}
            </button>
          </div>

          <div className="card-content">
            {editMode ? (
              <input
                type="text"
                name="interests"
                value={profileData.interests}
                onChange={handleInputChange}
                className="profile-input"
                placeholder="Your interests..."
              />
            ) : (
              <div className="interests-container">
                {profileData.interests.split(',').map((interest, index) => (
                  <span key={index} className="interest-tag">{interest.trim()}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}