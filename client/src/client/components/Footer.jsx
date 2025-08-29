import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'
import "../styles/footer.css"

export default function Footer() {
  const quickLinks = [
    { name: "Home",      path: "/" },
    { name: "News",      path: "/news" },
    { name: "Sports",    path: "/sports" },
    { name: "Education", path: "/education" },
    { name: "Culture",   path: "/culture" },
    { name: "Arts",      path: "/arts" },
    { name: "Travel",    path: "/travel" },
    { name: "Contact",   path: "/contact" }
  ];

  const categories = [
    { name: "Politics",      path: "/news#politics" },
    { name: "Business",      path: "/news#business" },
    { name: "Health",        path: "/news#health" },
    { name: "Technology",    path: "/news#technology" },
    { name: "Entertainment", path: "/news#entertainment" },
    { name: "Science",       path: "/news#science" },
    { name: "History",       path: "/news#history" },
  ];

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-container">
        <div className="footer-about" style={{ "--order": 1 }}>
            
            <h3 className='scroll-scale'>About Khattak Belt</h3>
            <p className='scroll-scale'>
              Khattak Belt Network is the premier source for news, culture, and events 
              from the historic Khattak Belt region of Pakistan. 
              We are committed to accurate, fair, and comprehensive journalism.
            </p>
            <div className="footer-social scroll-scale">
              <a href="https://www.facebook.com/KhattakJee762" target='blank' aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="https://www.instagram.com/khattak_belt?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target='blank' aria-label="Instagram"><FaInstagram /></a>
              <a href="https://www.youtube.com/@MianwaliKhattakBelt" target='blank' aria-label="YouTube"><FaYoutube /></a>
            </div>
          </div>
      
          <div className="footer-links" style={{ "--order": 2 }}>
            <h3 className='scroll-scale'>Quick Links</h3>
            <ul className='scroll-scale'>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links" style={{ "--order": 3 }}>
            <h3 className='scroll-scale'>News Categories</h3>
            <ul className='scroll-scale'>
              {categories.map((category, index) => (
                <li key={index}>
                  <Link to={category.path}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact" style={{ "--order": 4 }}>
            <h3 className='scroll-scale'>Contact Us</h3>
            <ul className='scroll-scale'>
              <li>
                <FaMapMarkerAlt />
                <span>Village Chapri, Tehsil Isa Khel, District Mianwali, Punjab, Pakistan</span>
              </li>
              <li>
                <FaPhone />
                <span>+92 345 5835763</span>
              </li>
              <li>
                <FaEnvelope />
                  <a href="mailto:Khattakjee762@gmail.com">Khattakjee762@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container scroll-scale">
          <div className="copyright">
            &copy; {new Date().getFullYear()} Khattak belt Network. All Rights Reserved.
          </div>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/#about">About Us</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}