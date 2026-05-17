/**
 * Cart Context
 * 
 * Global state management for the shopping cart using React Context API.
 * Handles:
 * - Managing cart items
 * - Adding/removing items from cart
 * - Quantity adjustments
 * - Price calculations (subtotal, delivery fee, total)
 * - Persisting cart to localStorage for data persistence
 * 
 * This context is accessed throughout the app via the useCart() hook.
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// Create the Cart Context
const CartContext = createContext();

// ==================== Cart Provider Component ====================

/**
 * CartProvider Component
 * 
 * Wraps the application and provides cart state to all child components.
 * Automatically saves cart to localStorage whenever it changes.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Provider component with cart context value
 */
export const CartProvider = ({ children }) => {
  // ========== State Management ==========
  
  /**
   * Initialize cart items from localStorage if available
   * This ensures cart persists across page reloads
   */
  const [cartItems, setCartItems] = useState(() => {
    // Try to retrieve saved cart from browser storage
    const savedCart = localStorage.getItem("cartItems");
    
    // Return parsed cart or empty array if nothing saved
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // ========== Side Effects ==========
  
  /**
   * Save cart to localStorage whenever cartItems changes
   * This provides data persistence across browser sessions
   */
  useEffect(() => {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  // ========== Cart Manipulation Functions ==========

  /**
   * Add Item to Cart
   * 
   * If item already exists in cart, increases its quantity by 1
   * Otherwise, adds the item with quantity of 1
   * 
   * @param {Object} item - Menu item to add
   * @param {string} item.id - Item ID
   * @param {string} item.name - Item name
   * @param {number} item.price - Item price
   * @param {string} item.image - Item image URL
   */
  const addToCart = (item) => {
    // Check if item already exists in cart
    const existingItem = cartItems.find(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItem) {
      // Item exists: increment its quantity
      setCartItems((prev) =>
        prev.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        )
      );
    } else {
      // Item doesn't exist: add it with quantity of 1
      setCartItems((prev) => [
        ...prev,
        {
          ...item,
          quantity: 1,
        },
      ]);
    }
  };

  /**
   * Increase Item Quantity
   * 
   * Increases the quantity of a specific item by 1
   * 
   * @param {string} id - Item ID to increase quantity for
   */
  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  /**
   * Decrease Item Quantity
   * 
   * Decreases the quantity of a specific item by 1
   * Removes the item entirely if quantity reaches 0
   * 
   * @param {string} id - Item ID to decrease quantity for
   */
  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0) // Remove items with 0 quantity
    );
  };

  /**
   * Remove Item from Cart
   * 
   * Completely removes an item from the cart
   * 
   * @param {string} id - Item ID to remove
   */
  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  /**
   * Clear Entire Cart
   * 
   * Removes all items from the cart
   */
  const clearCart = () => {
    setCartItems([]);
  };

  // ========== Price Calculations ==========

  /**
   * Calculate Subtotal
   * Sum of (price * quantity) for all cart items
   */
  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  /**
   * Calculate Delivery Fee
   * Fixed fee of 50 currency units if cart has items, 0 otherwise
   */
  const deliveryFee = cartItems.length > 0 ? 50 : 0;

  /**
   * Calculate Total Amount
   * Subtotal + Delivery Fee
   */
  const totalAmount = subtotal + deliveryFee;

  // ========== Context Value ==========

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        deliveryFee,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ==================== Custom Hook ==========

/**
 * useCart Hook
 * 
 * Custom hook to access cart context from any component
 * Should be used within a CartProvider
 * 
 * @returns {Object} Cart context value with all cart functions and data
 * 
 * Usage:
 * const { cartItems, addToCart, totalAmount } = useCart();
 */
export const useCart = () =>
  useContext(CartContext);