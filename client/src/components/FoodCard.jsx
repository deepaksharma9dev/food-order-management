import { useCart } from "../context/CartContext";

function FoodCard({ item }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300">
      <div className="relative h-64 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition duration-500"
        />

        <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-md">
          <span className="font-bold text-[#ad2c00]">
            ₹{item.price}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">
          {item.name}
        </h3>

        <p className="text-gray-500 mb-6 min-h-[48px]">
          {item.description}
        </p>

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