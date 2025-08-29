import React, { useState } from 'react'
import "../styles/culture.css"
import khattakDance from "../assets/dance.jpeg"
import khushalKhan from "../assets/khushal-khan.jpg"
import khattakFood from "../assets/khattak-food.jpg"

export default function Culture() {
  const [expandedCards, setExpandedCards] = useState([]);

  const toggleCard = (id) => {
    if (expandedCards.includes(id)) {
      setExpandedCards(expandedCards.filter(cardId => cardId !== id));
    } else {
      setExpandedCards([...expandedCards, id]);
    }
  };

  const culturalFeatures = [
    {
      id: 1,
      title: "The Art of Khattak Dance",
      excerpt: "Exploring the martial dance tradition that symbolizes Khattak identity.",
      content: "The Khattak dance is a unique martial art form performed with swords and handkerchiefs to the beat of drums. Traditionally performed by warriors before going to battle, it has evolved into a cultural performance showcasing agility, precision, and tribal pride. The dance is typically performed at weddings, celebrations, and cultural festivals.",
      image: khattakDance
    },
    {
      id: 2,
      title: "Khushal Khan Khattak: Warrior Poet",
      excerpt: "The life and legacy of the 17th century Pashtun leader and poet.",
      content: "Khushal Khan Khattak (1613-1689) was a tribal chief, warrior, and the national poet of the Pashtuns. His poetry, written in Pashto, emphasizes Pashtun nationalism, unity, and resistance against foreign rule. His most famous work, 'The Sworn Book', is considered a masterpiece of Pashto literature. Today, his mausoleum in Akora Khattak is a site of cultural pilgrimage.",
      image: khushalKhan
    },
    {
      id: 3,
      title: "Traditional Khattak Cuisine",
      excerpt: "The flavors and dishes that define Khattak culinary traditions.",
      content: "Khattak cuisine features hearty, flavorful dishes suited to the region's climate and pastoral lifestyle. Signature dishes include 'Khattak Pulao' (rice with meat and local spices), 'Shinwari Karahi' (spicy mutton dish), and 'Chapli Kabab'. Meals are often communal, reflecting the tribe's strong social bonds. Traditional breads like 'Pattay' are baked in clay ovens.",
      image: khattakFood
    }
  ];

  return (
    <section id="culture" className="culture-page">
      <div className="culture-header scroll-scale">
        <h1>Khattak Culture & Heritage</h1>
        <p>Preserving and celebrating our rich traditions</p>
      </div>

      <div className="culture-features">
        {culturalFeatures.map((item, index) => (
          <div 
            className={`culture-card ${expandedCards.includes(item.id) ? 'active' : ''}`}
            key={item.id}
            style={{ '--order': index }}
          >
            <div className="culture-image scroll-scale">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="culture-content scroll-scale">
              <h2>{item.title}</h2>
              <p className="culture-excerpt">{item.excerpt}</p>
              <div className="culture-full">
                <p>{item.content}</p>
              </div>
              <button onClick={() => toggleCard(item.id)}>
                {expandedCards.includes(item.id) ? 'Show Less' : 'Read More'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cultural-events">
        <h2 className='scroll-scale'>Upcoming Cultural Events</h2>
        <div className="events-calendar scroll-scale">
          {[
            {
              id: 1,
              day: '28',
              month: 'May',
              title: 'Annual Khattak Cultural Festival',
              description: 'Three days of music, dance, and traditional crafts at Karak Stadium'
            },
            {
              id: 2,
              day: '15',
              month: 'Jun',
              title: 'Pashto Poetry Symposium',
              description: 'Celebrating contemporary Pashto poets at Khattak University'
            }
          ].map((event, index) => (
            <div 
              className="event" 
              key={event.id}
              style={{ '--order': index }}
            >
              <div className="event-date">
                <span className="day">{event.day}</span>
                <span className="month">{event.month}</span>
              </div>
              <div className="event-details">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}