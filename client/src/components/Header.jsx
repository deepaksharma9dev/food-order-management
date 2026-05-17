/**
 * Header Component
 * 
 * Navigation header displayed at the top of every page.
 * Features:
 * - Logo and branding (FoodExpress)
 * - Navigation links (Menu, Cart)
 * - Shopping cart icon with item count badge
 * - Sticky positioning that stays visible while scrolling
 * - Responsive design (full nav on desktop, minimal on mobile)
 */

import { Link, NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

import { useCart } from "../context/CartContext";

/**
 * Header Component
 * 
 * @returns {JSX.Element} Header navigation element
 */
function Header() {
  // Get cart items from context
  const { cartItems } = useCart();

  // Calculate total number of items in cart
  // This is the sum of quantities of all items
  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  /**
   * NavLink class helper function
   * Applies different styles based on whether the link is active (current page)
   * Active links are shown in the brand color (#ad2c00) with bold font
   * Inactive links are gray and change color on hover
   */
  const navClass = ({ isActive }) =>
    isActive
      ? "text-[#ad2c00] font-semibold" // Active state styling
      : "text-gray-500 hover:text-[#ad2c00] transition"; // Inactive state styling

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Logo / Brand Link */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-[#ad2c00]"
        >
          FoodExpress
        </Link>

        {/* Navigation Links (Desktop Only) */}
        <nav className="hidden md:flex items-center gap-10">
          {/* Menu link */}
          <NavLink to="/" className={navClass}>
            Menu
          </NavLink>

          {/* Cart link */}
          <NavLink to="/cart" className={navClass}>
            Cart
          </NavLink>
        </nav>

        {/* Shopping Cart Icon with Badge */}
        <Link
          to="/cart"
          className="relative text-[#ad2c00]"
        >
          {/* Cart icon from lucide-react */}
          <ShoppingCart size={28} />

          {/* Badge showing number of items (only shown if cart has items) */}
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#ad2c00] text-white text-xs flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;