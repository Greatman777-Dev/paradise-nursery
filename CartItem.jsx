import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeItem,
  updateQuantity,
  selectCartItems,
  selectCartTotalCost,
  selectCartTotalItems,
} from '../features/cart/CartSlice';
import './CartItem.css';

/**
 * CartItem – Shopping Cart Page Component
 *
 * Displays all items currently in the cart with:
 * - Product thumbnail, name, unit price
 * - Quantity increment / decrement controls
 * - Remove item button
 * - Subtotal per item
 * - Order summary: total items & total cost
 * - "Continue Shopping" and "Checkout" action buttons
 */
const CartItem = ({ onContinueShopping, onCheckout }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalCost = useSelector(selectCartTotalCost);
  const totalItems = useSelector(selectCartTotalItems);

  /* ── Handlers ── */

  /**
   * Increment the quantity of an item by 1
   */
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  /**
   * Decrement the quantity of an item by 1.
   * If quantity reaches 0, the item is removed automatically via CartSlice.
   */
  const handleDecrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
  };

  /**
   * Remove the item from the cart entirely
   */
  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  /**
   * Handle checkout — alert with total and clear-up message
   */
  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    } else {
      alert(
        `🎉 Thank you for shopping with Paradise Nursery!\n\nYour order total is $${totalCost.toFixed(2)}.\n\nWe'll send a confirmation to your email shortly.`
      );
    }
  };

  /* ── Empty Cart State ── */
  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <header className="cart-header">
          <div className="cart-header-brand">🌿 Paradise Nursery</div>
          <h2 className="cart-header-title">Shopping Cart</h2>
          <div style={{ width: '140px' }} />
        </header>

        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any plants yet. Start exploring our green collection!</p>
          <button className="continue-btn" onClick={onContinueShopping}>
            Browse Plants
          </button>
        </div>
      </div>
    );
  }

  /* ── Cart with Items ── */
  return (
    <div className="cart-page">
      {/* Cart Header */}
      <header className="cart-header">
        <div className="cart-header-brand" onClick={onContinueShopping} style={{ cursor: 'pointer' }}>
          🌿 <span>Paradise Nursery</span>
        </div>
        <h2 className="cart-header-title">Shopping Cart</h2>
        <div style={{ width: '140px' }} />
      </header>

      <div className="cart-content">
        {/* Cart Items List */}
        <div className="cart-items-list">
          <h3 className="cart-section-title">
            Your Items ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </h3>

          {cartItems.map((item) => (
            <div key={item.id} className="cart-item-card">
              {/* Item Thumbnail */}
              <div className="cart-item-image-wrapper">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&auto=format&fit=crop&q=80';
                  }}
                />
              </div>

              {/* Item Details */}
              <div className="cart-item-details">
                <h4 className="cart-item-name">{item.name}</h4>
                <p className="cart-item-unit-price">
                  Unit price: <strong>${item.cost.toFixed(2)}</strong>
                </p>

                {/* Quantity Controls */}
                <div className="quantity-controls">
                  <button
                    className="qty-btn"
                    onClick={() => handleDecrement(item)}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    −
                  </button>
                  <span className="qty-display">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => handleIncrement(item)}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Item Right Side */}
              <div className="cart-item-right">
                <p className="cart-item-subtotal">
                  ${(item.cost * item.quantity).toFixed(2)}
                </p>
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  🗑 Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="cart-summary">
          <div className="summary-card">
            <h3 className="summary-title">Order Summary</h3>

            <div className="summary-row">
              <span>Items ({totalItems})</span>
              <span>${totalCost.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free-tag">FREE</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row total-row">
              <span>Total</span>
              <span>${totalCost.toFixed(2)}</span>
            </div>

            {/* Action Buttons */}
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>

            <button
              className="continue-shopping-btn"
              onClick={onContinueShopping}
            >
              ← Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
