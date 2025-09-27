import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/newsdetail.css';

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/news/${id}`); // Changed from /api/news/${id}
        
        if (!data.data) {
          throw new Error('News article not found');
        }

        const newsData = data.data;
        
        setNewsItem({
          ...newsData,
          date: new Date(newsData.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        });

        // Improved image handling
        if (newsData.imageUrl) {
          // If using direct URL
          setImageUrl(newsData.imageUrl);
        } else if (newsData.image && newsData.image.data) {
          // If image is stored as base64 data URI
          setImageUrl(`data:${newsData.image.contentType};base64,${newsData.image.data}`);
        } else {
          setImageUrl('/images/default-news.jpg'); // Fallback image
        }

      } catch (err) {
        console.error("Error fetching news item:", err);
        setError("Failed to load news article. It might not exist or an error occurred.");
        if (err.response && err.response.status === 404) {
          navigate('/news'); // Redirect to news list if not found
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNewsItem();
  }, [id, navigate]);

  if (loading) return <div className="loading">Loading news details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!newsItem) return <div className="not-found">News article not found!</div>;

  return (
    <div className="news-detail">
      <div className="news-container">
        <h1>{newsItem.title}</h1>
        
        {imageUrl && (
          <div className="image-container">
            <img 
              src={imageUrl} 
              alt={newsItem.title} 
              className="detail-image"
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = '/images/default-news.jpg'; // Fallback image
              }}
            />
          </div>
        )}

        {newsItem.excerpt && <p className="excerpt">{newsItem.excerpt}</p>}
        
        <div className="meta">
          <span>{newsItem.date}</span> | <span>By {newsItem.author?.username || newsItem.author || 'Admin'}</span>
          {newsItem.category && <span> | Category: {newsItem.category}</span>}
          {newsItem.isFeatured && <span> | Featured</span>}
        </div>

        <div className="content">
          {newsItem.content.split('\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* You can add more sections here like comments, related news, etc. */}
      </div>
    </div>
  );
}