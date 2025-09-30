// src/components/news/InternationalNews.js
import React, { useState, useEffect } from "react";
import "../../styles/news.css";

export default function InternationalNews({ filter }) {
  const [apiNews, setApiNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApiNews = async () => {
      try {
        setLoading(true);
        setError(null);

        // 🔹 Call your backend instead of NewsAPI directly
        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const categoryParam = filter === "all" ? "" : `&category=${filter}`;

        const apiRes = await fetch(
          `${baseUrl}/news/external?country=us${categoryParam}`
        );
        if (!apiRes.ok) throw new Error("Failed to fetch external news");

        const apiData = await apiRes.json();
        setApiNews(apiData.articles || []);
      } catch (err) {
        console.error("Error fetching API news:", err);
        setError(err.message || "Failed to fetch API news");
      } finally {
        setLoading(false);
      }
    };

    fetchApiNews();
  }, [filter]);

  if (loading) return <div className="loading">Loading international news...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="news-gallery">
      {apiNews.map((article, idx) => (
        <div key={idx} className="news-card">
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-link">
            {article.urlToImage && (
              <div className="news-image-container">
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="news-image"
                  loading="lazy"
                />
              </div>
            )}
            <div className="news-content">
              <h3>{article.title}</h3>
              <p className="news-excerpt">{article.description || "No description available."}</p>
              <div className="news-meta">
                <span>
                  {article.publishedAt
                    ? new Date(article.publishedAt).toLocaleDateString()
                    : "Unknown Date"}
                </span>{" "}
                | <span>{article.source?.name || "External Source"}</span>
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}