import React from 'react';
import { Link } from 'react-router-dom';
import aboutImage from "../../assets/logo1.png";
import sportsImage from "../../assets/sports.jpeg";
import educationImage from "../../assets/education.jpeg";
import cultureImage from "../../assets/culture.jpg";
import artsImage from "../../assets/arts.jpg";
import "../../styles/home.css";
import FeaturedStories from './FeaturedStories';
import HeroSlider from './HeroSlider';

export default function Home() {
  return (
    <section id="home" className="home">
      {/* Hero Section */}
      <HeroSlider />

      {/* Featured News Section */}
      <FeaturedStories />

      {/* About Section */}
      <div className="section-container" id="about">
        <div className="section-content scroll-bottom">
          <h2>About Khattak Belt</h2>
          <p>
            The Khattak Belt is a historic and culturally significant region in
            Pakistan, home to the Khattak tribe, known for its martial traditions, poetry, and
            strategic location along key trade routes. It is famed for Khushal Khan Khattak and
            the traditional Khattak Dance.
          </p>
          <Link to="/culture" className="btn-learn-more">Learn More About Our Culture</Link>
        </div>
        <div className="section-image scroll-bottom">
          <div className="image-zoom">
            <img src={aboutImage} alt="Khattak Landscape" />
          </div>
        </div>
      </div>

      {/* Sports Section */}
      <div className="section-container">
        <div className="section-content scroll-bottom">
          <h2>🏆 Sports in the Khattak Belt</h2>
          <p>
            The Khattak Belt, which mainly covers areas like Karak, parts of Kohat,
            and Nowshera in Khyber Pakhtunkhwa (Pakistan), has a vibrant local sports
            culture that reflects the spirit, bravery, and physical strength of its people.
            Traditionally, sports have been a vital part of life here — not just for entertainment
            but also for building community bonds and showcasing skill, endurance, and pride.
          </p>
          <Link to="/sports" className="btn-learn-more">Learn more about Sports</Link>
        </div>
        <div className="section-image scroll-bottom">
          <div className="image-zoom">
            <img src={sportsImage} alt="Sports in Khattak Belt" />
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="section-container">
        <div className="section-content scroll-bottom">
          <h2>🎓 Education in the Khattak Belt</h2>
          <p>
            The Khattak Belt, covering areas like Karak, parts of Kohat, and Nowshera districts
            in Khyber Pakhtunkhwa, has made significant strides in education over the past few decades.
            Traditionally, education faced many challenges in this region due to limited resources,
            tribal structures, and geographical barriers, but today, the landscape is changing
            positively, with a growing emphasis on learning and development.
          </p>
          <Link to="/education" className="btn-learn-more">Learn more about Education</Link>
        </div>
        <div className="section-image scroll-bottom">
          <div className="image-zoom">
            <img src={educationImage} alt="Education in Khattak Belt" />
          </div>
        </div>
      </div>

      {/* Culture Section */}
      <div className="section-container">
        <div className="section-content scroll-bottom">
          <h2>🏞️ Culture in the Khattak Belt</h2>
          <p>
            The Khattak Belt, stretching across Karak, parts of Kohat, and Nowshera districts in Khyber
            Pakhtunkhwa, is home to a rich and proud culture that reflects centuries of history, bravery,
            poetry, and tradition.
            The people here, primarily from the Khattak Pashtun tribe, have a strong sense of identity,
            hospitality, honor, and loyalty that is deeply woven into every part of their cultural life.
          </p>
          <Link to="/culture" className="btn-learn-more">Learn more about Culture</Link>
        </div>
        <div className="section-image scroll-bottom">
          <div className="image-zoom">
            <img src={cultureImage} alt="Culture in Khattak Belt" />
          </div>
        </div>
      </div>

      {/* Arts Section */}
      <div className="section-container">
        <div className="section-content scroll-bottom">
          <h2>🎨 Arts in the Khattak Belt</h2>
          <p>
            The Khattak Belt, covering areas of Karak, parts of Kohat, and Nowshera in Khyber Pakhtunkhwa,
            has a rich artistic tradition deeply rooted in history, poetry, craftsmanship, and cultural pride.
            Here, art is not just decoration — it is a reflection of the soul, honor, and resilience of the
            Khattak people.
          </p>
          <Link to="/arts" className="btn-learn-more">Learn more about Arts</Link>
        </div>
        <div className="section-image scroll-bottom">
          <div className="image-zoom">
            <img src={artsImage} alt="Arts in Khattak Belt" />
          </div>
        </div>
      </div>
    </section>
  );
}