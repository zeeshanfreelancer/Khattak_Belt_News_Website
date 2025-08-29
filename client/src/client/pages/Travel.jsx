import React, { useState, useEffect } from 'react'
import "../styles/travel.css"
import takhteNasrati from "../assets/takht-e-nasrati.jpg"
import saltMine from "../assets/salt-mines.jpg"
import kabulRiver from "../assets/kabul-river.jpg"

export default function Travel() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const destinations = [
    {
      id: 1,
      name: "Takht-e-Nusrati",
      description: "Historic fort with panoramic views of the Khattak region. The fort dates back to the 17th century and offers breathtaking views of the surrounding mountains.",
      image: takhteNasrati,
      attractions: ["Fort ruins", "Ancient mosque", "Scenic viewpoints", "Historical artifacts"],
      bestTime: "October to March"
    },
    {
      id: 2,
      name: "Bahadur Khel Salt Mines",
      description: "Vast underground salt mines with fascinating geological formations. These mines have been operational for centuries and contain stunning natural salt crystals.",
      image: saltMine,
      attractions: ["Mine tours", "Salt crystal displays", "Therapeutic salt rooms", "Underground lakes"],
      bestTime: "Year-round"
    },
    {
      id: 3,
      name: "Kabul River Banks",
      description: "Picturesque riverside areas perfect for picnics and nature walks. The river supports diverse wildlife and offers tranquil spots for relaxation.",
      image: kabulRiver,
      attractions: ["Fishing spots", "Bird watching", "Traditional boat rides", "Riverside cafes"],
      bestTime: "September to April"
    }
  ];

  const travelTips = [
    "The best time to visit is during spring (March-April) when the weather is mild and the landscape is green.",
    "Respect local customs - dress modestly, especially when visiting religious sites.",
    "Try to learn a few basic Pashto phrases; locals appreciate the effort.",
    "Hire a local guide for historical sites to fully appreciate their significance.",
    "Sample traditional Khattak cuisine at local eateries for an authentic experience.",
    "Carry cash as many places may not accept credit cards.",
    "Stay hydrated and protect yourself from the sun during summer months."
  ];

  const handleCardHover = (id) => {
    setActiveCard(id);
  };

  const handleCardLeave = () => {
    setActiveCard(null);
  };

  return (
    <section id="travel" className="travel-page">
      <div className="travel-header scroll-scale">
        <h1>Explore Khattak Belt</h1>
        <p>Discover the rich history, breathtaking landscapes, and warm hospitality of our culturally significant region</p>
      </div>

      <div className="destinations">
        <h2>Top Destinations</h2>
        <div className="destination-grid">
          {destinations.map(item => (
            <div 
              className={`destination-card ${activeCard === item.id ? 'active' : ''}`}
              key={item.id}
              onMouseEnter={() => handleCardHover(item.id)}
              onMouseLeave={handleCardLeave}
            >
              <div className="destination-image scroll-scale">
                {isLoading ? (
                  <div className="image-loading" style={{ height: '100%', width: '100%' }}></div>
                ) : (
                  <img src={item.image} alt={item.name} loading="lazy" />
                )}
              </div>
              <div className="destination-info">
                <h3 className='scroll-scale'>{item.name}</h3>
                <p className='scroll-scale'>{item.description}</p>
                <div className="attractions">
                  <h4 className='scroll-scale'>Main Attractions:</h4>
                  <ul className='scroll-scale'>
                    {item.attractions.map((attr, index) => (
                      <li key={index}>{attr}</li>
                    ))}
                  </ul>
                </div>
                <div className="best-time scroll-scale">
                  <div className="best-time-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
                    </svg>
                  </div>
                  <div className="best-time-content">
                    <strong>Best Time to Visit</strong>
                    <span>{item.bestTime}</span>
                  </div>
                </div>
                <button className='scroll-scale' aria-label={`View details about ${item.name}`}>
                  Explore Destination
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="travel-guide">
        <div className="guide-content">
          <h2 className='scroll-scale'>Travel Guide</h2>
          <h3 className='scroll-scale'>Getting There</h3>
          <p className='scroll-bottom'>
            The Khattak belt is accessible via the Indus Highway (N-55). The nearest major airport is in Peshawar, 
            about 2 hours from central Karak. Regular bus services connect the region to Peshawar, Islamabad, 
            and other major cities. Private taxis can also be hired for more comfortable travel.
          </p>
          
          <h3 className='scroll-scale'>Where to Stay</h3>
          <p className='scroll-bottom'>
            Accommodation options range from basic guesthouses to modern hotels in Karak city. For a more authentic 
            experience, consider homestays with local families (arranged through tourism offices). The region offers 
            several mid-range hotels with modern amenities in central locations.
          </p>
          
          <h3 className='scroll-scale'>Essential Tips</h3>
          <ul>
            {travelTips.map((tip, index) => (
              <li className='scroll-scale' key={index}>{tip}</li>
            ))}
          </ul>
        </div>
        <div className="guide-image scroll-scale">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d192220.847307175!2d71.44481604408622!3d32.95299772096639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392765fbb4f5e461%3A0xdff8911e9bb8dff8!2sChapri%20Dam!5e0!3m2!1sen!2s!4v1746632869901!5m2!1sen!2s"
            title="Khattak Belt Map"
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  )
}