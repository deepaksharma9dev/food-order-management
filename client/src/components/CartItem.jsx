import { useCart } from "../context/CartContext";

function CartItem({ item }) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm flex flex-col md:flex-row gap-5">
      <img
        src={item.image}
        alt={item.name}
        className="w-full md:w-36 h-32 object-cover rounded-xl"
      />

      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-xl font-bold">
              {item.name}
            </h3>

            <p className="text-[#ad2c00] font-bold mt-1">
              ₹{item.price}
            </p>
          </div>

          <button
            onClick={() =>
              removeFromCart(item.id)
            }
            className="text-red-500 font-semibold"
          >
            Remove
          </button>
        </div>

        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() =>
              decreaseQuantity(item.id)
            }
            className="w-9 h-9 rounded-full border flex items-center justify-center text-lg"
          >
            -
          </button>

          <span className="font-bold text-lg">
            {item.quantity}
          </span>

          <button
            onClick={() =>
              increaseQuantity(item.id)
            }
            className="w-9 h-9 rounded-full border flex items-center justify-center text-lg"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;