import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (movie) => {
    setCart((e) => {
      const updatedCart = [...e, movie];
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      setMessage("add movie in cart success!");

      setTimeout(() => {
        setMessage("");
      }, 1000);
      return updatedCart;
    });
  };

  const removeFromCart = (movieId) => {
    setCart((e) => {
      const updatedCart = e.filter((item) => item.id !== movieId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, message, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
