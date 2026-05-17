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

import { useCart } from "../context/CartContext";

/**
 * FoodCard Component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.item - Menu item object with id, name, description, price, image
 * @returns {JSX.Element} Food card display element
 */
function FoodCard({ item }) {
  // Get addToCart function from cart context
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        {/* Food item image with hover zoom effect */}
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition duration-500"
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
