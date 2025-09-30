import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import slide1 from "../../assets/maqsood.jpg"; 
import slide2 from "../../assets/education.jpeg";
import slide3 from "../../assets/culture.jpg";
import slide4 from "../../assets/arts.jpg";
import "../../styles/heroSlider.css";

const sliderImages = [
  slide1,
  slide2,
  slide3,
  slide4,
];

const SLIDE_INTERVAL = 5000;

export default function HeroSlider() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => 
        (prevIndex + 1) % sliderImages.length
      );
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const currentImage = sliderImages[currentSlideIndex];

  return (
    <div 
      className={`hero-slider ${isVisible ? 'visible' : ''}`}
      style={{ backgroundImage: `url(${currentImage})` }}
    >
      <div className={`hero-content scroll-scale ${isVisible ? 'reveal' : ''}`}>
        <h1>Welcome to Khattak Belt <br /> Network</h1>
        <p className="hero-text">
          Your trusted source for news, culture, and events from the historic Khattak Belt region
          in Pakistan. Stay updated with the latest happenings in our community.
        </p>
        <Link to="/news" className="btn-explore">
          Explore Latest News
          <span className="btn-arrow">→</span>
        </Link>
      </div>

      <div className="slider-dots">
        {sliderImages.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlideIndex ? 'active' : ''}`}
            onClick={() => setCurrentSlideIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></span>
        ))}
      </div>
    </div>
  );
}