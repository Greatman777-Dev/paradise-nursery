import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItems, selectCartTotalItems } from '../features/cart/CartSlice';
import './ProductList.css';

const plantsData = [
  { id: 1, name: 'Monstera Deliciosa', image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&auto=format&fit=crop&q=80', cost: 29.99, category: 'Tropical Plants', description: 'The iconic Swiss cheese plant with dramatic split leaves. Perfect for bright, indirect light.' },
  { id: 2, name: 'Bird of Paradise', image: 'https://images.unsplash.com/photo-1598880940942-d73866f5c4c3?w=400&auto=format&fit=crop&q=80', cost: 49.99, category: 'Tropical Plants', description: 'A stunning tropical statement plant that thrives in bright light.' },
  { id: 3, name: 'Fiddle Leaf Fig', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop&q=80', cost: 39.99, category: 'Tropical Plants', description: 'Large violin-shaped leaves make this a bold interior statement.' },
  { id: 4, name: 'Echeveria Elegans', image: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=400&auto=format&fit=crop&q=80', cost: 9.99, category: 'Succulents', description: 'A classic rosette succulent with powdery blue-green leaves.' },
  { id: 5, name: 'Aloe Vera', image: 'https://images.unsplash.com/photo-1598704592822-3f82a7873fce?w=400&auto=format&fit=crop&q=80', cost: 12.99, category: 'Succulents', description: 'The ultimate healing succulent. Great for sunny windowsills.' },
  { id: 6, name: 'Jade Plant', image: 'https://images.unsplash.com/photo-1585090190524-dc5c44f9b2e1?w=400&auto=format&fit=crop&q=80', cost: 14.99, category: 'Succulents', description: 'A classic succulent said to bring good luck and prosperity.' },
  { id: 7, name: 'Snake Plant', image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&auto=format&fit=crop&q=80', cost: 19.99, category: 'Air-Purifying Plants', description: 'Nearly indestructible and a top air purifier. Thrives in low light.' },
  { id: 8, name: 'Peace Lily', image: 'https://images.unsplash.com/photo-1616690248350-3f72a6f64d58?w=400&auto=format&fit=crop&q=80', cost: 17.99, category: 'Air-Purifying Plants', description: 'Elegant white blooms and excellent air-cleaning ability.' },
  { id: 9, name: 'Spider Plant', image: 'https://images.unsplash.com/photo-1597305877032-0668b3c6413a?w=400&auto=format&fit=crop&q=80', cost: 11.99, category: 'Air-Purifying Plants', description: 'Fast-growing with arching green-and-white leaves.' },
  { id: 10, name: 'Orchid', image: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=400&auto=format&fit=crop&q=80', cost: 24.99, category: 'Flowering Plants', description: 'Elegant blooms that last for months. Prefers indirect light.' },
  { id: 11, name: 'African Violet', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop&q=80', cost: 8.99, category: 'Flowering Plants', description: 'Compact flowering plant with velvety leaves.' },
  { id: 12, name: 'Anthurium', image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&auto=format&fit=crop&q=80', cost: 22.99, category: 'Flowering Plants', description: 'Striking waxy blooms in red, pink, or white.' },
];

const categories = [...new Set(plantsData.map((p) => p.category))];

const ProductList = ({ onCartClick, onHomeClick }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalCartItems = useSelector(selectCartTotalItems);
  const [addedToCart, setAddedToCart] = useState({});

  const isInCart = (plantId) => cartItems.some((item) => item.id === plantId);

  const handleAddToCart = (plant) => {
    if (!isInCart(plant.id)) {
      dispatch(addItem(plant));
      setAddedToCart((prev) => ({ ...prev, [plant.id]: true }));
    }
  };

  return (
    <div className="product-page">
      <header className="product-header">
        <div className="header-brand">🌿 Paradise Nursery</div>
        <nav className="header-nav">
          <button className="nav-link" onClick={onHomeClick}>Home</button>
          <button className="nav-link active">Plants</button>
          <button className="nav-link cart-nav-btn" onClick={onCartClick}>
            🛒 Cart
            {totalCartItems > 0 && (
              <span className="cart-count-badge">{totalCartItems}</span>
            )}
          </button>
        </nav>
      </header>

      <main className="product-main">
        {categories.map((category) => (
          <section key={category} className="product-category-section">
            <h2 className="category-title">{category}</h2>
            <div className="category-divider" />
            <div className="plant-grid">
              {plantsData
                .filter((plant) => plant.category === category)
                .map((plant) => {
                  const inCart = isInCart(plant.id) || addedToCart[plant.id];
                  return (
                    <div key={plant.id} className="plant-card">
                      <div className="plant-image-wrapper">
                        <img src={plant.image} alt={plant.name} className="plant-image"
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&auto=format&fit=crop&q=80'; }} />
                      </div>
                      <div className="plant-info">
                        <h3 className="plant-name">{plant.name}</h3>
                        <p className="plant-description">{plant.description}</p>
                        <div className="plant-footer">
                          <span className="plant-price">${plant.cost.toFixed(2)}</span>
                          <button
                            className={`add-to-cart-btn ${inCart ? 'added' : ''}`}
                            onClick={() => handleAddToCart(plant)}
                            disabled={inCart}
                          >
                            {inCart ? 'Added to Cart' : 'Add to Cart'}
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
