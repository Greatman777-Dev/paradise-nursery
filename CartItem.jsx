import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeItem,
  updateQuantity,
  selectCartItems,
  selectCartTotalItems,
} from '../features/cart/CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping, onHomeClick }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalCartItems = useSelector(selectCartTotalItems);

  // calculateTotalAmount – sums item.cost * item.quantity for all items
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.cost * item.quantity, 0);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item.id));
    } else {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const handleContinueShopping = () => {
    if (onContinueShopping) onContinueShopping();
  };

  const handleCheckout = () => {
    alert('Coming Soon! Thank you for shopping at Paradise Nursery.');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <header className="cart-header">
          <div className="header-brand">🌿 Paradise Nursery</div>
          <nav className="header-nav">
            <button className="nav-link" onClick={onHomeClick}>Home</button>
            <button className="nav-link" onClick={onContinueShopping}>Plants</button>
            <button className="nav-link active">Cart</button>
          </nav>
        </header>
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any plants yet!</p>
          <button className="continue-btn" onClick={handleContinueShopping}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <header className="cart-header">
        <div className="header-brand">🌿 Paradise Nursery</div>
        <nav className="header-nav">
          <button className="nav-link" onClick={onHomeClick}>Home</button>
          <button className="nav-link" onClick={onContinueShopping}>Plants</button>
          <button className="nav-link active">
            Cart ({totalCartItems})
          </button>
        </nav>
      </header>

      <div className="cart-content">
        <div className="cart-items-list">
          <h3 className="cart-section-title">
            Shopping Cart ({totalCartItems} {totalCartItems === 1 ? 'item' : 'items'})
          </h3>

          {cartItems.map((item) => (
            <div key={item.id} className="cart-item-card">
              <div className="cart-item-image-wrapper">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&auto=format&fit=crop&q=80';
                  }}
                />
              </div>

              <div className="cart-item-details">
                <h4 className="cart-item-name">{item.name}</h4>
                <p className="cart-item-unit-price">Unit price: <strong>${item.cost.toFixed(2)}</strong></p>

                <div className="quantity-controls">
                  <button className="qty-btn" onClick={() => handleDecrement(item)}>−</button>
                  <span className="qty-display">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => handleIncrement(item)}>+</button>
                </div>
              </div>

              <div className="cart-item-right">
                <p className="cart-item-subtotal">
                  ${(item.cost * item.quantity).toFixed(2)}
                </p>
                <button className="remove-btn" onClick={() => handleRemove(item.id)}>
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="cart-summary">
          <div className="summary-card">
            <h3 className="summary-title">Order Summary</h3>

            {cartItems.map((item) => (
              <div key={item.id} className="summary-row">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.cost * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <div className="summary-row">
              <span>Shipping</span>
              <span className="free-tag">FREE</span>
            </div>

            <div className="summary-divider" />

            <div className="summary-row total-row">
              <span>Total Amount</span>
              <span>${calculateTotalAmount().toFixed(2)}</span>
            </div>

            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>

            <button className="continue-shopping-btn" onClick={handleContinueShopping}>
              ← Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
