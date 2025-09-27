import React from 'react'
import "../styles/sports.css"

export default function Sports() {
  const sportsNews = [
    {
      id: 1,
      title: "Khattak Kabaddi Team Wins Provincial Championship",
      excerpt: "The regional kabaddi team defeated rivals in a thrilling final match.",
      content: "In a display of traditional sports excellence, the Khattak Kabaddi Team secured the provincial championship title after defeating their rivals in a match that went into overtime. The team's captain, Rahim Khan, was named player of the tournament.",
      date: "May 17, 2023",
      category: "Kabaddi"
    },
    {
      id: 2,
      title: "Young Cricketer from Karak Selected for National Camp",
      excerpt: "17-year-old fast bowler Ali Khattak gets call-up to national junior team camp.",
      content: "Ali Khattak, a promising fast bowler from Karak, has been selected for the Pakistan Under-19 training camp. His selection comes after impressive performances in regional tournaments where he took 28 wickets in 5 matches.",
      date: "May 15, 2023",
      category: "Cricket"
    },
    {
      id: 3,
      title: "Annual Khattak Wrestling Tournament Begins Next Week",
      excerpt: "Traditional pehlwani wrestling competition to feature top athletes from across KP.",
      content: "The 45th Annual Khattak Wrestling Tournament will feature over 50 competitors in various weight categories. The event, held at the historic Shahpur arena, attracts thousands of spectators each year and preserves the region's martial traditions.",
      date: "May 12, 2023",
      category: "Wrestling"
    }
  ];

  return (
    <section id="sports" className="sports-page">
      <div className="sports-header scroll-scale">
        <h1>Sports News</h1>
        <p>Covering traditional and modern sports in the Khattak region</p>
      </div>

      <div className="sports-container scroll-bottom">
        {sportsNews.map(item => (
          <div className="sports-card" key={item.id}>
            <div className="sports-category">{item.category}</div>
            <h2>{item.title}</h2>
            <p className="sports-excerpt">{item.excerpt}</p>
            <div className="sports-meta">
              <span>{item.date}</span>
              <button>Read More</button>
            </div>
          </div>
        ))}
      </div>

      <div className="upcoming-events">
        <h2 className='scroll-scale'>Upcoming Sports Events</h2>
        <ul>
          <li className='scroll-scale'>
            <span className="event-date">May 25, 2023</span>
            <span className="event-title">Inter-District Football Tournament (Karak)</span>
          </li>
          <li className='scroll-scale'>
            <span className="event-date">June 3, 2023</span>
            <span className="event-title">Traditional Archery Competition (Takht-e-Nusrati)</span>
          </li>
          <li className='scroll-scale'>
            <span className="event-date">June 10-12, 2023</span>
            <span className="event-title">Annual Khattak Equestrian Festival</span>
          </li>
        </ul>
      </div>
    </section>
  )
}