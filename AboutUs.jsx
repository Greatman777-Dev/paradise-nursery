import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h2 className="about-us-title">About Paradise Nursery</h2>

        <div className="about-us-section">
          <h3>🌿 Our Story</h3>
          <p>
            Welcome to <strong>Paradise Nursery</strong> — your one-stop destination for beautiful,
            healthy houseplants. Founded in 2018, we started as a small family-run greenhouse with a
            passion for bringing nature indoors. Today, we serve thousands of plant lovers across the
            country, delivering happiness one pot at a time.
          </p>
        </div>

        <div className="about-us-section">
          <h3>🌱 Our Mission</h3>
          <p>
            At Paradise Nursery, our mission is simple: to make the world a greener, happier place.
            We believe every home deserves a touch of nature, and every person deserves access to
            high-quality plants at affordable prices. From air-purifying houseplants to rare tropical
            specimens, we curate our collection with care, love, and expertise.
          </p>
        </div>

        <div className="about-us-section">
          <h3>🏡 What We Offer</h3>
          <ul className="about-us-list">
            <li>🌵 A wide variety of indoor and outdoor plants</li>
            <li>🪴 Expert advice and plant care guides</li>
            <li>📦 Safe, eco-friendly packaging and fast shipping</li>
            <li>💚 A passionate community of plant enthusiasts</li>
            <li>🎁 Gift options for every occasion</li>
          </ul>
        </div>

        <div className="about-us-section">
          <h3>🤝 Our Promise</h3>
          <p>
            Every plant we sell is hand-selected for quality and health. If your plant arrives
            damaged or doesn't thrive within the first 30 days, we'll replace it — no questions
            asked. Your satisfaction is our top priority, and we stand behind every green beauty
            we send your way.
          </p>
        </div>

        <div className="about-us-stats">
          <div className="stat-card">
            <span className="stat-number">5,000+</span>
            <span className="stat-label">Happy Customers</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">200+</span>
            <span className="stat-label">Plant Varieties</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">6+</span>
            <span className="stat-label">Years of Experience</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
