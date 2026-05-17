import { useCart } from "../context/CartContext";

function FoodCard({ item }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:-translate-y-1 transition-transform">
      <div className="h-56 relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />

        <span className="absolute top-4 right-4 bg-white px-4 py-1 rounded-full font-bold text-[#ad2c00] text-sm">
          ₹{item.price}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">
          {item.name}
        </h3>

        <p className="text-gray-600 mb-5 min-h-[48px]">
          {item.description}
        </p>

        <button
          onClick={() => addToCart(item)}
          className="w-full bg-[#ad2c00] text-white py-3 rounded-xl font-semibold hover:opacity-90 active:scale-[0.98]"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default FoodCard;