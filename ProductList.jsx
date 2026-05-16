import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItems, selectCartTotalItems } from '../features/cart/CartSlice';
import './ProductList.css';

/**
 * Plant data organized into categories.
 * Each plant has: id, name, image (URL), cost (number), category, description
 */
const plantsData = [
  // ── Tropical Plants ──
  {
    id: 1,
    name: 'Monstera Deliciosa',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&auto=format&fit=crop&q=80',
    cost: 29.99,
    category: 'Tropical Plants',
    description: 'The iconic Swiss cheese plant with dramatic split leaves. Perfect for bright, indirect light.',
  },
  {
    id: 2,
    name: 'Bird of Paradise',
    image: 'https://images.unsplash.com/photo-1598880940942-d73866f5c4c3?w=400&auto=format&fit=crop&q=80',
    cost: 49.99,
    category: 'Tropical Plants',
    description: 'A stunning tropical statement plant that thrives in bright light and warms up any space.',
  },
  {
    id: 3,
    name: 'Fiddle Leaf Fig',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop&q=80',
    cost: 39.99,
    category: 'Tropical Plants',
    description: 'Large, violin-shaped leaves make this a bold interior statement. Loves bright indirect light.',
  },

  // ── Succulents ──
  {
    id: 4,
    name: 'Echeveria Elegans',
    image: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=400&auto=format&fit=crop&q=80',
    cost: 9.99,
    category: 'Succulents',
    description: 'A classic rosette succulent with powdery blue-green leaves. Drought tolerant and low-maintenance.',
  },
  {
    id: 5,
    name: 'Aloe Vera',
    image: 'https://images.unsplash.com/photo-1598704592822-3f82a7873fce?w=400&auto=format&fit=crop&q=80',
    cost: 12.99,
    category: 'Succulents',
    description: 'The ultimate healing succulent. Great for sunny windowsills and skin care emergencies alike.',
  },
  {
    id: 6,
    name: 'Jade Plant',
    image: 'https://images.unsplash.com/photo-1585090190524-dc5c44f9b2e1?w=400&auto=format&fit=crop&q=80',
    cost: 14.99,
    category: 'Succulents',
    description: 'A classic succulent with thick, glossy leaves. Said to bring good luck and prosperity.',
  },

  // ── Air-Purifying Plants ──
  {
    id: 7,
    name: "Snake Plant (Sansevieria)",
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&auto=format&fit=crop&q=80',
    cost: 19.99,
    category: 'Air-Purifying Plants',
    description: 'Nearly indestructible and a top air purifier. Thrives in low light and needs very little water.',
  },
  {
    id: 8,
    name: 'Peace Lily',
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&auto=format&fit=crop&q=80',
    cost: 17.99,
    category: 'Air-Purifying Plants',
    description: 'Elegant white blooms and excellent air-cleaning ability. Signals when it needs water by drooping.',
  },
  {
    id: 9,
    name: 'Spider Plant',
    image: 'https://images.unsplash.com/photo-1597305877032-0668b3c6413a?w=400&auto=format&fit=crop&q=80',
    cost: 11.99,
    category: 'Air-Purifying Plants',
    description: 'Fast-growing with arching green-and-white leaves. Produces babies that can be repotted easily.',
  },

  // ── Flowering Plants ──
  {
    id: 10,
    name: 'Orchid (Phalaenopsis)',
    image: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=400&auto=format&fit=crop&q=80',
    cost: 24.99,
    category: 'Flowering Plants',
    description: 'Elegant blooms that last for months. Prefers indirect light and weekly watering.',
  },
  {
    id: 11,
    name: 'African Violet',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop&q=80',
    cost: 8.99,
    category: 'Flowering Plants',
    description: 'Compact flowering plant with velvety leaves. Blooms beautifully in bright, indirect light.',
  },
  {
    id: 12,
    name: 'Anthurium',
    image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&auto=format&fit=crop&q=80',
    cost: 22.99,
    category: 'Flowering Plants',
    description: 'Striking waxy blooms in red, pink, or white. Long-lasting and easy to care for.',
  },
];

// Get unique categories
const categories = [...new Set(plantsData.map((p) => p.category))];

const ProductList = ({ onCartClick, onHomeClick }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalCartItems = useSelector(selectCartTotalItems);
  const [addedItems, setAddedItems] = useState({});

  /**
   * Check if a plant is already in the cart
   */
  const isInCart = (plantId) => cartItems.some((item) => item.id === plantId);

  /**
   * Handle Add to Cart button click
   */
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    // Show visual feedback
    setAddedItems((prev) => ({ ...prev, [plant.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [plant.id]: false }));
    }, 1500);
  };

  return (
    <div className="product-page">
      {/* Header / Navbar */}
      <header className="product-header">
        <div className="header-brand" onClick={onHomeClick} style={{ cursor: 'pointer' }}>
          🌿 <span>Paradise Nursery</span>
        </div>
        <h2 className="header-title">Our Plants</h2>
        <button className="header-cart-btn" onClick={onCartClick}>
          🛒 Cart
          {totalCartItems > 0 && (
            <span className="cart-count-badge">{totalCartItems}</span>
          )}
        </button>
      </header>

      {/* Product Content */}
      <main className="product-main">
        {categories.map((category) => (
          <section key={category} className="product-category-section">
            {/* Category Heading */}
            <h2 className="category-title">{category}</h2>
            <div className="category-divider" />

            {/* Plant Cards Grid */}
            <div className="plant-grid">
              {plantsData
                .filter((plant) => plant.category === category)
                .map((plant) => {
                  const inCart = isInCart(plant.id);
                  const justAdded = addedItems[plant.id];

                  return (
                    <div key={plant.id} className="plant-card">
                      {/* Plant Image */}
                      <div className="plant-image-wrapper">
                        <img
                          src={plant.image}
                          alt={plant.name}
                          className="plant-image"
                          onError={(e) => {
                            e.target.src =
                              'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&auto=format&fit=crop&q=80';
                          }}
                        />
                        {inCart && (
                          <div className="in-cart-badge">✓ In Cart</div>
                        )}
                      </div>

                      {/* Plant Info */}
                      <div className="plant-info">
                        <h3 className="plant-name">{plant.name}</h3>
                        <p className="plant-description">{plant.description}</p>
                        <div className="plant-footer">
                          <span className="plant-price">${plant.cost.toFixed(2)}</span>
                          <button
                            className={`add-to-cart-btn ${inCart ? 'in-cart' : ''} ${justAdded ? 'just-added' : ''}`}
                            onClick={() => handleAddToCart(plant)}
                            disabled={inCart}
                          >
                            {justAdded ? '✓ Added!' : inCart ? 'In Cart' : 'Add to Cart'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default ProductList;
