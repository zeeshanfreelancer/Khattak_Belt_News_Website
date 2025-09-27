import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/newsform.css';

export default function NewsForm({ onSuccess }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(!!id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: 'Admin', // This will be overridden by backend if user is logged in
    category: 'politics',
    image: null,
    isFeatured: false
  });
  const [imagePreview, setImagePreview] = useState('');
  const [originalImage, setOriginalImage] = useState(null); // To keep track of existing image in edit mode

  const categories = ['politics', 'business', 'health', 'technology', 'entertainment', 'science', 'history'];

  useEffect(() => {
    if (isEditMode && id) {
      const fetchNewsItem = async () => {
        try {
          const { data } = await API.get(`/news/${id}`); // Changed from /api/news/${id}
          setFormData({
            title: data.data.title,
            excerpt: data.data.excerpt,
            content: data.data.content,
            author: data.data.author || 'Admin',
            category: data.data.category,
            image: null, // Don't pre-fill file input
            isFeatured: data.data.isFeatured
          });
          if (data.data.imageUrl) {
            setOriginalImage(data.data.imageUrl); // Store existing image URL
            setImagePreview(data.data.imageUrl); // Show preview of existing image
          } else if (data.data.image && data.data.image.data) {
             // Handle base64 images if they exist
             const base64Image = `data:${data.data.image.contentType};base64,${data.data.image.data}`;
             setOriginalImage(base64Image);
             setImagePreview(base64Image);
          }
        } catch (error) {
          console.error('Error fetching news for edit:', error);
          toast.error('Failed to load news for editing.');
          navigate('/news'); // Redirect if news item not found or error
        }
      };
      fetchNewsItem();
    }
  }, [id, isEditMode, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, image: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(originalImage || ''); // Revert to original or clear
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    for (const key in formData) {
      if (key === 'image' && !formData[key] && isEditMode && originalImage) {
        // If in edit mode and no new image is selected, don't send 'image' field
        // The backend will keep the existing image
        continue; 
      }
      data.append(key, formData[key]);
    }

    try {
      if (isEditMode) {
        await API.put(`/news/${id}`, data, { // Changed from /api/news/${id}
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('News article updated successfully!');
      } else {
        await API.post('/news', data, { // Changed from /api/news
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('News article published successfully!');
        setFormData({ // Clear form after successful submission
          title: '',
          excerpt: '',
          content: '',
          author: 'Admin',
          category: 'politics',
          image: null,
          isFeatured: false
        });
        setImagePreview('');
      }
      navigate('/news'); // Redirect to news list after successful operation
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error submitting news:', error.response?.data || error);
      toast.error(error.response?.data?.message || 'Failed to submit news.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this news article?')) {
      setIsSubmitting(true);
      try {
        await API.delete(`/news/${id}`); // Changed from /api/news/${id}
        toast.success('News article deleted successfully!');
        navigate('/news');
      } catch (error) {
        console.error('Error deleting news:', error.response?.data || error);
        toast.error(error.response?.data?.message || 'Failed to delete news.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="news-form-container">
      <h1>{isEditMode ? 'Edit News Article' : 'Publish New News'}</h1>
      <form onSubmit={handleSubmit} className="news-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter news title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="excerpt">Excerpt</label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="A short summary (max 200 characters)"
            maxLength="200"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your news article content here..."
            required
            rows="15"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="isFeatured"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
          />
          <label htmlFor="isFeatured">Mark as Featured News</label>
        </div>

        <div className="form-group">
          <label htmlFor="image">News Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required={!isEditMode}
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
              <button 
                type="button" 
                onClick={() => {
                  setImagePreview('');
                  setFormData(prev => ({ ...prev, image: null }));
                }}
                className="remove-image"
              >
                Remove Image
              </button>
            </div>
          )}
          {isEditMode && !imagePreview && originalImage && (
            <div className="image-preview">
              <p>Current Image (will be kept if no new image is selected)</p>
              <img src={originalImage} alt="Current" />
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" disabled={isSubmitting} className="submit-button">
            {isSubmitting ? (isEditMode ? 'Updating...' : 'Publishing...') : 
             (isEditMode ? 'Update News' : 'Publish News')}
          </button>
          
          {isEditMode && (
            <button 
              type="button" 
              onClick={handleDelete}
              className="delete-button"
              disabled={isSubmitting}
            >
              Delete News
            </button>
          )}
        </div>
      </form>
    </div>
  );
}