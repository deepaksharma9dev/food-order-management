/**
 * Menu Page / Home Page
 * 
 * Displays the full menu of available food items for customers to browse and order.
 * Features:
 * - Hero section with app overview and CTA buttons
 * - Menu items displayed in responsive grid
 * - Loading state handling
 * - Integration with cart context for adding items
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Import services and components
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";
import FoodCard from "../components/FoodCard";

/**
 * MenuPage Component
 * 
 * Fetches menu items from the backend API on component mount
 * and displays them in a grid format.
 * 
 * @returns {JSX.Element} Menu page display
 */
function MenuPage() {
  // ========== State ==========
  
  // Array of menu items fetched from backend
  const [menu, setMenu] = useState([]);
  
  // Loading state to show loader while fetching data
  const [loading, setLoading] = useState(true);

  // ========== API Functions ==========

  /**
   * Fetch Menu Items from Backend
   * 
   * Makes API call to retrieve all available menu items
   * Handles loading and error states
   */
  const fetchMenu = async () => {
    try {
      // Call backend API to get menu
      const response = await api.get("/menu");
      // Set menu data from response
      setMenu(response.data.data || []);
    } catch (error) {
      // Log error to console for debugging
      console.error("Menu fetch failed:", error);
      // Could add user-facing error handling here
    } finally {
      // Always set loading to false when request completes
      setLoading(false);
    }
  };

  // ========== Effects ==========

  /**
   * Fetch menu on component mount
   * This effect runs once when the component first loads
   */
  useEffect(() => {
    fetchMenu();
  }, []);

  // ========== Render ==========

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text Content */}
          <div>
            {/* Badge */}
            <span className="inline-block bg-orange-100 text-[#ad2c00] px-4 py-2 rounded-full font-semibold mb-6">
              Fast Delivery • Fresh Food
            </span>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-black leading-tight text-[#191c1d]">
              Order your favorite food
            </h1>

            {/* Subheading */}
            <p className="mt-6 text-xl text-gray-500 leading-8 max-w-xl">
              Fresh meals delivered fast to your doorstep.
              Experience premium dishes from top kitchens.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-10">
              {/* Browse Menu Button */}
              <a
                href="#menu"
                className="bg-[#ad2c00] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#922500] transition"
              >
                Browse Menu
              </a>

              {/* View Cart Link */}
              <Link
                to="/cart"
                className="border-2 border-[#ad2c00] text-[#ad2c00] px-8 py-4 rounded-2xl font-bold hover:bg-orange-50 transition"
              >
                View Cart
              </Link>
            </div>
          </div>

          {/* Right Side - Hero Image */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1100&q=80"
              alt="Food"
              fetchPriority="high"
              decoding="async"
              width="1100"
              height="500"
              className="w-full h-[500px] object-cover rounded-[40px] shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section
        id="menu"
        className="max-w-7xl mx-auto px-4 md:px-12 py-16"
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-extrabold mb-2">
              Explore Our Menu
            </h2>

            <p className="text-gray-600">
              Hand-crafted meals prepared with fresh ingredients.
            </p>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <FoodCard key={index} loading />
              ))
            : menu.map((item, index) => (
                <FoodCard
                  key={item.id}
                  item={item}
                  priority={index < 3}
                />
              ))}
        </div>
      </section>
    </MainLayout>
  );
}

export default MenuPage;
