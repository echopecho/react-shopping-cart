import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import data from "./data";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

import ProductContext from "./contexts/ProductContext";
import CartContext from "./contexts/CartContext";

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    localStorage.getItem("cart") &&
      setCart(JSON.parse(localStorage.getItem("cart")));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addItem = item => {
    setCart([...new Set([...cart, item])]);
  };

  const removeItem = itemID => {
    const filteredCart = cart.filter(el => el.id !== itemID);
    setCart(filteredCart);
  };

  return (
    <ProductContext.Provider value={{ products, addItem }}>
      <CartContext.Provider value={{ cart, removeItem }}>
        <div className="App">
          <Navigation cart={cart} />
          {/* Routes */}
          <Route exact path="/" component={Products} />
          <Route path="/cart" component={ShoppingCart} />
        </div>
      </CartContext.Provider>
    </ProductContext.Provider>
  );
}

export default App;
