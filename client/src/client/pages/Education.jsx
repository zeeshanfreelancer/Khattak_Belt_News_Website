import React from 'react'
import "../styles/education.css"

export default function Education() {
  const educationNews = [
    {
      id: 1,
      title: "New Girls' College to Open in Karak",
      excerpt: "The provincial government has approved construction of a new degree college for women.",
      content: "The new Government Degree College for Women in Karak will accommodate 1,200 students and offer programs in arts, sciences, and computer education. The project, expected to be completed within 18 months, addresses the growing demand for higher education opportunities for girls in the region.",
      date: "May 20, 2023"
    },
    {
      id: 2,
      title: "Literacy Rate Shows Significant Improvement",
      excerpt: "Recent survey indicates literacy in Khattak belt has risen to 65%, up from 52% in 2018.",
      content: "Education officials attribute the improvement to community schools, adult literacy programs, and mobile education units that reach remote areas. Female literacy has shown the most growth, now standing at 58% compared to 42% five years ago.",
      date: "May 18, 2023"
    },
    {
      id: 3,
      title: "Local Students Win National Science Competition",
      excerpt: "Team from Karak brings home top honors in Islamabad science fair.",
      content: "Three students from Government High School No. 1 Karak developed an innovative water purification system using locally available materials. Their project won first prize in the national STEM competition, earning them scholarships for university education.",
      date: "May 15, 2023"
    }
  ];

  return (
    <section id="education" className="education-page">
      <div className="education-header scroll-scale">
        <h1>Education News</h1>
        <p>Developments in schools, colleges, and educational initiatives</p>
      </div>

      <div className="education-container scroll-bottom">
        {educationNews.map(item => (
          <div className="education-card" key={item.id}>
            <h2>{item.title}</h2>
            <p className="education-excerpt">{item.excerpt}</p>
            <div className="education-meta">
              <span>{item.date}</span>
              <button>Read Full Story</button>
            </div>
          </div>
        ))}
      </div>

      <div className="education-resources">
        <h2 className='scroll-scale'>Educational Resources</h2>
        <div className="resources-grid scroll-bottom">
          <div className="resource-card">
            <h3>Scholarships</h3>
            <p>Information about available scholarships for students from Khattak region</p>
            <button>View Opportunities</button>
          </div>
          <div className="resource-card">
            <h3>School Listings</h3>
            <p>Directory of schools and colleges in Karak and surrounding areas</p>
            <button>Explore Schools</button>
          </div>
          <div className="resource-card">
            <h3>Career Guidance</h3>
            <p>Resources for students planning their future careers</p>
            <button>Get Advice</button>
          </div>
        </div>
      </div>
    </section>
  )
}