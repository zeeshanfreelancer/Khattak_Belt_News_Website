import React, { useState } from 'react'
import "../styles/arts.css"
import khattakEmbroidery from "../assets/khattak-embroidery.jpg"
import woodCarving from "../assets/woodcarving.jpg"
import calligraphy from "../assets/calligraphy.jpg"
import zarsheda from "../assets/zarsheda1.jpg"

export default function Arts() {
  const [activeArt, setActiveArt] = useState(null);
  const [isSpotlightHovered, setIsSpotlightHovered] = useState(false);

  const toggleArtDetails = (id) => {
    setActiveArt(activeArt === id ? null : id);
  };

  const artsFeatures = [
    {
      id: 1,
      title: "Traditional Khattak Embroidery",
      excerpt: "The intricate needlework that adorns Khattak clothing and textiles.",
      content: "Khattak embroidery is characterized by geometric patterns and vibrant colors, traditionally done by hand on shawls, waistcoats, and headgear. Each pattern carries symbolic meaning, often representing tribal identity or natural elements. The art form is passed down through generations of women and is experiencing a revival among young artisans.",
      image: khattakEmbroidery,
      artist: "Fatima Khattak"
    },
    {
      id: 2,
      title: "Woodcarving Traditions of Karak",
      excerpt: "The skilled craftsmanship behind Khattak woodwork and furniture.",
      content: "The Khattak region is renowned for its intricate woodcarving, particularly on doors, furniture, and decorative items. Using local walnut and deodar wood, craftsmen create elaborate designs featuring floral motifs and Islamic geometric patterns. The craft dates back centuries and remains an important source of livelihood for many families.",
      image: woodCarving,
      artist: "Abdul Karim"
    },
    {
      id: 3,
      title: "Contemporary Pashto Calligraphy",
      excerpt: "Modern artists reinterpret traditional Islamic calligraphy in Pashto script.",
      content: "A new generation of artists from the Khattak region are blending traditional Islamic calligraphy techniques with Pashto poetry and modern design elements. Their work appears in galleries across Pakistan and has gained international recognition. Many incorporate verses from Khushal Khan Khattak's poetry in their compositions.",
      image: calligraphy,
      artist: "Yasir Khattak"
    }
  ];

  return (
    <section id="arts" className="arts-page">
      <div className="arts-header scroll-scale">
        <h1>Arts & Crafts of Khattak Belt</h1>
        <p>Showcasing traditional and contemporary artistic expressions</p>
      </div>

      <div className="arts-gallery scroll-bottom">
        {artsFeatures.map((item, index) => (
          <div 
            className={`art-item ${activeArt === item.id ? 'active' : ''}`}
            key={item.id}
            style={{ '--order': index }}
            onClick={() => toggleArtDetails(item.id)}
          >
            <div className="art-image">
              <img src={item.image} alt={item.title} />
              <div className="art-overlay">
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <span className="view-details">Click to {activeArt === item.id ? 'hide' : 'view'} details</span>
              </div>
            </div>
            <div className="art-details">
              <p>{item.content}</p>
              <button className="artist-button">
                View {item.artist}'s Profile →
              </button>
            </div>
          </div>
        ))}
      </div>

      <div 
        className="artist-spotlight"
        onMouseEnter={() => setIsSpotlightHovered(true)}
        onMouseLeave={() => setIsSpotlightHovered(false)}
      >
        <h2 className='scroll-scale'>Artist Spotlight: Zarsheda Khattak</h2>
        <div className="spotlight-content">
          <div className="artist-image scroll-scale">
            <img 
              src={zarsheda} 
              alt="Zarsheda Khattak" 
              className={isSpotlightHovered ? 'hovered' : ''}
            />
          </div>
          <div className="artist-bio scroll-scale">
            <p>
              Zarsheda Khattak is a contemporary artist from Karak whose mixed-media works explore themes of identity, tradition, and modernity. 
              A graduate of the National College of Arts, she incorporates traditional Khattak embroidery patterns into large-scale installations.
              Her recent exhibition "Threads of Memory" toured major galleries in Lahore, Karachi, and Peshawar.
            </p>
            <button className="spotlight-button">
              View Portfolio <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}