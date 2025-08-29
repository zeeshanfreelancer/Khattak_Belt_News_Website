import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import API from '../../../services/api'; // Ensure this path is correct
import { useUser } from '../UserContext'; // Ensure this path is correct
import '../../styles/news.css'; // Ensure this path is correct

export default function News() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const location = useLocation();

  const categories = ['all', 'politics', 'business', 'health', 'technology', 'entertainment', 'science', 'history'];

  useEffect(() => {
    if (location.hash) {
      const categoryFromHash = location.hash.substring(1);
      if (categories.includes(categoryFromHash)) {
        setFilter(categoryFromHash);
      }
    }
  }, [location.hash, categories]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        // --- CHANGE HERE: Removed '/api' prefix ---
        const { data } = await API.get('/news', {
          params: { category: filter === 'all' ? undefined : filter }
        });

        const articles = data.data || data;
        console.log('Fetched news articles:', articles);

        // Filter out invalid articles
        const validArticles = Array.isArray(articles)
          ? articles.filter(article => article && article._id && article.title && article.createdAt)
          : [];

        setNewsArticles(validArticles);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err.response?.data?.message || 'Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [filter]);

  const sortedNews = [...newsArticles].sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const filteredNews = (
    filter === 'all'
      ? sortedNews
      : sortedNews.filter(article => article.category === filter)
  );

  const isAdmin = user && (
    user.role === 'admin' ||
    [
      'zeeshan@gmail.com',
      'khattakjee762@gmail.com',
      'khattak@gmail.com',
      'muhammadfaizan469224@gmail.com'
    ].includes(user.email)
  );

  if (loading) return <div className="loading">Loading news...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <section className="news-page">
      <div className="main-text">
        <span>News Updates</span>
        <h2>Latest News</h2>
      </div>

      <div className="filter-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className={`button ${filter === category ? 'active' : ''}`}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredNews.length === 0 ? (
        <div className="no-news">No news articles found.</div>
      ) : (
        <div className="news-gallery">
          {filteredNews.map((article) => (
            <div key={article._id} className={`news-card ${article.isFeatured ? 'featured' : ''}`}>
              {isAdmin && (
                <div className="post-actions">
                  {/* The Link 'to' prop is relative to the current route or absolute like '/news/edit/...' */}
                  <Link
                    to={`/news/edit/${article._id}`}
                    className="edit-button"
                    aria-label={`Edit ${article.title}`}
                  >
                    Edit
                  </Link>
                </div>
              )}

              {article.isFeatured && (
                <div className="featured-badge">Featured</div>
              )}

              {/* The Link 'to' prop is relative to the current route or absolute like '/news/...' */}
              <Link to={`/news/${article._id}`} className="news-link">
                {article.imageUrl && (
                  <div className="news-image-container">
                    <img
                      src={article.imageUrl}
                      alt={article.title || 'News Image'}
                      className="news-image"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="news-content">
                  <h3>{article.title || 'Untitled'}</h3>
                  <p className="news-excerpt">{article.excerpt || 'No excerpt available.'}</p>
                  <div className="news-meta">
                    <span>{article.createdAt ? new Date(article.createdAt).toLocaleDateString() : 'Unknown Date'}</span> |
                    <span>{article.author?.username || 'Admin'}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}