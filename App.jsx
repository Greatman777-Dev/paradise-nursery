import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleGetStarted = () => {
    setShowProductList(true);
    setShowCart(false);
  };

  const handleCartClick = () => {
    setShowCart(true);
    setShowProductList(false);
  };

  const handleHomeClick = () => {
    setShowProductList(false);
    setShowCart(false);
  };

  const handleContinueShopping = () => {
    setShowCart(false);
    setShowProductList(true);
  };

  return (
    <Provider store={store}>
      <div className="app">
        {!showProductList && !showCart && (
          <div className="landing-page">
            <nav className="navbar">
              <div className="navbar-brand">🌿 Paradise Nursery</div>
              <button className="navbar-cart-btn" onClick={handleCartClick}>
                🛒 Cart
              </button>
            </nav>

            <div className="landing-hero">
              <h1>Welcome to Paradise Nursery</h1>
              <p>
                Bring nature indoors. Discover hand-picked houseplants,
                succulents, and tropicals that transform your space into
                a green paradise.
              </p>
              <button
                className="get-started-btn"
                onClick={handleGetStarted}
              >
                Get Started
              </button>
            </div>
          </div>
        )}

        {showProductList && !showCart && (
          <ProductList
            onCartClick={handleCartClick}
            onHomeClick={handleHomeClick}
          />
        )}

        {showCart && (
          <CartItem
            onContinueShopping={handleContinueShopping}
            onHomeClick={handleHomeClick}
          />
        )}
      </div>
    </Provider>
  );
}

export default App;
