import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import './App.css';

import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import AboutUs from './components/AboutUs';

/**
 * App.jsx – Paradise Nursery Root Component
 *
 * Pages / Views:
 *  'landing'  – Landing page with company name and "Get Started" button
 *  'products' – Product listing page (plant shop)
 *  'cart'     – Shopping cart page
 *  'about'    – About Us page
 */

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('landing');

  const goToProducts = () => setCurrentPage('products');
  const goToCart     = () => setCurrentPage('cart');
  const goToHome     = () => setCurrentPage('landing');
  const goToAbout    = () => setCurrentPage('about');

  /* ── Landing Page ── */
  if (currentPage === 'landing') {
    return (
      <div className="landing-page">
        {/* Navbar */}
        <nav className="navbar">
          <div className="navbar-brand">
            🌿 <span>Paradise</span> Nursery
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              className="navbar-cart-btn"
              onClick={goToAbout}
              style={{ fontSize: '0.9rem' }}
            >
              About Us
            </button>
            <button className="navbar-cart-btn" onClick={goToCart}>
              🛒 Cart
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="landing-hero">
          {/* Company Name */}
          <h1>
            Paradise<br />
            <span>Nursery</span>
          </h1>

          <p>
            Bring nature indoors. Discover hand-picked houseplants, succulents,
            and tropicals that transform your space into a green paradise.
          </p>

          {/* Get Started Button */}
          <button className="get-started-btn" onClick={goToProducts}>
            Get Started 🌱
          </button>
        </div>
      </div>
    );
  }

  /* ── About Us Page ── */
  if (currentPage === 'about') {
    return (
      <div>
        <nav className="navbar" style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 200 }}>
          <div
            className="navbar-brand"
            onClick={goToHome}
            style={{ cursor: 'pointer' }}
          >
            🌿 <span>Paradise</span> Nursery
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="navbar-cart-btn" onClick={goToProducts}>
              🌱 Shop
            </button>
            <button className="navbar-cart-btn" onClick={goToCart}>
              🛒 Cart
            </button>
          </div>
        </nav>
        <div style={{ paddingTop: '72px' }}>
          <AboutUs />
        </div>
      </div>
    );
  }

  /* ── Product Listing Page ── */
  if (currentPage === 'products') {
    return (
      <ProductList
        onCartClick={goToCart}
        onHomeClick={goToHome}
      />
    );
  }

  /* ── Shopping Cart Page ── */
  if (currentPage === 'cart') {
    return (
      <CartItem
        onContinueShopping={goToProducts}
        onCheckout={() => {
          alert(
            '🎉 Thank you for shopping at Paradise Nursery!\n\nYour order has been placed. We\'ll email your confirmation shortly.'
          );
          goToHome();
        }}
      />
    );
  }

  return null;
};

/**
 * App – wraps everything with the Redux Provider
 */
const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
