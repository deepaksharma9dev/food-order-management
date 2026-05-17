import { Link, NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

import { useCart } from "../context/CartContext";

function Header() {
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const navClass = ({ isActive }) =>
    isActive
      ? "text-[#ad2c00] font-semibold"
      : "text-gray-500 hover:text-[#ad2c00] transition";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <Link
          to="/"
          className="text-3xl font-extrabold text-[#ad2c00]"
        >
          FoodExpress
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          <NavLink to="/" className={navClass}>
            Menu
          </NavLink>

          <NavLink to="/cart" className={navClass}>
            Cart
          </NavLink>
        </nav>

        <Link
          to="/cart"
          className="relative text-[#ad2c00]"
        >
          <ShoppingCart size={28} />

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