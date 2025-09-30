// src/components/news/FeaturedStories.jsx
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/featuredStories.css";

export default function FeaturedStories({ filter = "all" }) {
    const [featuredNews, setFeaturedNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApiNews = async () => {
            try {
                setLoading(true);
                setError(null);

                const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
                const categoryParam = filter === "all" ? "" : `&category=${filter}`;

                const apiRes = await fetch(
                    `${baseUrl}/news/external?country=us${categoryParam}`
                );
                if (!apiRes.ok) throw new Error("Failed to fetch external news");

                const apiData = await apiRes.json();
                setFeaturedNews(
                    Array.isArray(apiData.articles) ? apiData.articles.slice(0, 10) : []
                );
            } catch (err) {
                console.error("Error fetching API news:", err);
                setError(err.message || "Failed to fetch API news");
            } finally {
                setLoading(false);
            }
        };

        fetchApiNews();
    }, [filter]);

    // Enhanced slider settings for better responsiveness
    const sliderSettings = {
        dots: false,
        arrows: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 8000,
        autoplaySpeed: 0,
        cssEase: "linear",
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    if (loading) return (
        <div className="featured-slider">
            <h2>Featured Stories</h2>
            <div className="loading-state">Loading featured stories...</div>
        </div>
    );
    
    if (error) return (
        <div className="featured-slider">
            <h2>Featured Stories</h2>
            <p className="error">{error}</p>
        </div>
    );
    
    if (!featuredNews.length) return (
        <div className="featured-slider">
            <h2>Featured Stories</h2>
            <p>No featured stories available.</p>
        </div>
    );

    return (
        <div className="featured-slider">
            <h2>Featured Stories</h2>
            <Slider {...sliderSettings}>
                {featuredNews.map((article, idx) => (
                    <div key={idx} className="featured-slide">
                        <img
                            src={article.urlToImage}
                            alt={article.title}
                            className="featured-image"
                            onError={(e) => {
                                e.target.src = '';
                            }}
                        />
                        <div className="featured-content">
                            <h3>{article.title}</h3>
                            <p>{article.description || "No description available."}</p>
                            <a 
                                href={article.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                aria-label={`Read more about ${article.title}`}
                            >
                                Read More
                                <span style={{ marginLeft: '0.5rem' }}>→</span>
                            </a>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}