import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Breathe Natural</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="hero-buttons">
              <Link to="/plants" className="btn-primary">Explore</Link>
              <button className="btn-secondary">
                <span>Live Demo...</span>
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="plant-card">
              <h3>Calathea plant</h3>
              <span className="arrow">»</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trendy Plants Section */}
      <section className="trendy-plants">
        <div className="container">
          <h2>Trendy House Plant</h2>
          <div className="plants-grid">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="plant-item">
                <div className="plant-image">
                  <div className="placeholder-image">🌿</div>
                </div>
                <h3>Calathea plant</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                <div className="price">Rs. 359/-</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Plants */}
      <section className="featured-plants">
        <div className="container">
          <div className="featured-grid">
            <div className="featured-card">
              <div className="card-content">
                <h3>For Small Decs Ai Plat</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua
                </p>
                <div className="price">Rs. 599/-</div>
                <button className="btn-outline">Explore</button>
              </div>
            </div>
            <div className="featured-card">
              <div className="card-content">
                <h3>For Fresh Decs Ai Plat</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna
                </p>
                <div className="price">Rs. 579/-</div>
                <button className="btn-outline">Explore</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="reviews">
        <div className="container">
          <h2>Customer Review</h2>
          <div className="reviews-grid">
            {[
              { name: 'Maxn Raval', initials: 'MR' },
              { name: 'Jenely K', initials: 'JK' },
              { name: 'Lii Thakur', initials: 'LT' }
            ].map((review, index) => (
              <div key={index} className="review-card">
                <div className="reviewer-avatar">
                  {review.initials}
                </div>
                <h4>{review.name}</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam,
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Collection */}
      <section className="best-collection">
        <div className="container">
          <div className="collection-content">
            <div className="collection-text">
              <h2>Our Best 02</h2>
              <h3>We Have Small And Best O2 Plants Collection's</h3>
              <div className="collection-description">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam.
                </p>
              </div>
            </div>
            <div className="collection-image">
              <div className="image-placeholder">
                <div className="floating-plants">
                  <div className="floating-plant">🌱</div>
                  <div className="floating-plant">🌿</div>
                  <div className="floating-plant">🍃</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default Home;