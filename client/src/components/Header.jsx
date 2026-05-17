import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Header() {
  const { cartItems } = useCart();

  const itemCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-[#ad2c00] border-b-2 border-[#ad2c00] pb-1 font-semibold"
      : "text-[#5c4038] hover:text-[#ad2c00] font-semibold";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 md:px-12 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-extrabold text-[#ad2c00]"
        >
          FoodExpress
        </Link>

        <div className="hidden md:flex items-center gap-10 text-sm">
          <NavLink to="/" className={navLinkClass}>
            Menu
          </NavLink>

          <NavLink to="/cart" className={navLinkClass}>
            Cart
          </NavLink>
        </div>

        <Link
          to="/cart"
          className="relative text-[#ad2c00] text-2xl"
        >
          🛒
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-[#ad2c00] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {itemCount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}

export default Header;