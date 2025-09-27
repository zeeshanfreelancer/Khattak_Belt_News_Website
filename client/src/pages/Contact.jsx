import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import "../styles/contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Contact Us | Khattak News Network";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitted(false);
    }, 1500);
  };

  return (
    <section id="contact" className="contact-page">
      <div className="contact-header scroll-scale">
        <h1>Contact Us</h1>
        <p>Get in touch with our team for inquiries, feedback, or collaborations. We're here to help and would love to hear from you.</p>
      </div>

      <div className="contact-container">
        <div className="contact-form scroll-scale">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required 
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required 
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                value={formData.subject}
                onChange={handleChange}
                required 
                placeholder="What's this about?"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Write your message here..."
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitted}
            >
              {isSubmitted ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        <div className="contact-info">
          <h2 className='scroll-scale'>Our Information</h2>
          <div className="info-item">
            <h3 className='scroll-scale'><FaMapMarkerAlt /> Address</h3>
            <p className='scroll-scale'>Khattak News Network<br />
            Media Tower, Jarma Road<br />
            Karak, Khyber Pakhtunkhwa<br />
            Pakistan</p>
          </div>
          <div className="info-item">
            <h3 className='scroll-scale'><FaEnvelope /> Email</h3>
            <p className='scroll-scale'>info@khattaknews.com</p>
          </div>
          <div className="info-item scroll-scale">
            <h3><FaPhone /> Phone</h3>
            <p>+92 345 5835763</p>
          </div>
          <div className="info-item scroll-scale">
            <h3><FaClock /> Office Hours</h3>
            <p>Monday - Friday: 9AM to 5PM<br />
            Saturday: 10AM to 2PM</p>
          </div>
          <div className="social-media">
            <h3 className='scroll-scale'>Follow Us</h3>
            <div className="social-icons scroll-scale">
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="YouTube"><FaYoutube /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="map-container scroll-scale">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d192220.847307175!2d71.44481604408622!3d32.95299772096639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392765fbb4f5e461%3A0xdff8911e9bb8dff8!2sChapri%20Dam!5e0!3m2!1sen!2s!4v1746632869901!5m2!1sen!2s"  
          allowFullScreen="" 
          loading="lazy"
          title="Khattak News Network Location"
        ></iframe>
      </div>
    </section>
  );
}