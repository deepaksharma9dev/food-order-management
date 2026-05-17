/**
 * Food Card Component
 * 
 * Displays a single menu item as a card.
 * Features:
 * - Item image with hover zoom effect
 * - Item name and description
 * - Price badge
 * - Add to cart button
 * - Hover effects and smooth transitions
 */

import { useState } from "react";

import { useCart } from "../context/CartContext";

const getOptimizedImageUrl = (url) => {
  if (!url) {
    return "";
  }

  try {
    const imageUrl = new URL(url);

    if (imageUrl.hostname.includes("images.unsplash.com")) {
      imageUrl.searchParams.set("auto", "format");
      imageUrl.searchParams.set("fit", "crop");
      imageUrl.searchParams.set("w", "720");
      imageUrl.searchParams.set("q", "75");
    }

    return imageUrl.toString();
  } catch {
    return url;
  }
};

/**
 * FoodCard Component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.item - Menu item object with id, name, description, price, image
 * @returns {JSX.Element} Food card display element
 */
function FoodCard({ item, loading = false, priority = false }) {
  // Get addToCart function from cart context
  const { addToCart } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);

  if (loading) {
    return (
      <div
        className="bg-white rounded-3xl overflow-hidden shadow-sm animate-pulse"
        aria-label="Loading menu item"
      >
        <div className="h-64 bg-gray-200" />

        <div className="p-6">
          <div className="h-7 bg-gray-200 rounded-lg w-2/3 mb-4" />
          <div className="space-y-3 mb-6">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-4/5" />
          </div>
          <div className="h-14 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  const optimizedImage = getOptimizedImageUrl(item.image);

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-lg transition-[transform,box-shadow] duration-200 ease-out transform-gpu">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
        )}

        {/* Food item image with hover zoom effect */}
        <img
          src={optimizedImage}
          alt={item.name}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          width="720"
          height="384"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-[opacity,transform] duration-200 ease-out transform-gpu group-hover:scale-[1.025] ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-md">
          <span className="font-bold text-[#ad2c00]">
            ₹{item.price}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Item Name */}
        <h3 className="text-2xl font-bold mb-2">
          {item.name}
        </h3>

        {/* Item Description */}
        <p className="text-gray-500 mb-6 min-h-[48px]">
          {item.description}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(item)}
          className="w-full bg-[#ad2c00] hover:bg-[#922500] text-white py-4 rounded-2xl font-bold transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default FoodCard;
