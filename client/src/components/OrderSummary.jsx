import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function OrderSummary() {
  const {
    subtotal,
    deliveryFee,
    totalAmount,
    cartItems,
  } = useCart();

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm sticky top-24">
      <h2 className="text-2xl font-bold mb-6">
        Order Summary
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">
            Subtotal
          </span>

          <span className="font-semibold">
            ₹{subtotal}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">
            Delivery Fee
          </span>

          <span className="font-semibold">
            ₹{deliveryFee}
          </span>
        </div>

        <div className="border-t pt-4 flex justify-between text-xl font-bold">
          <span>Total</span>

          <span className="text-[#ad2c00]">
            ₹{totalAmount}
          </span>
        </div>
      </div>

      <Link
        to="/checkout"
        className={`mt-6 block text-center py-4 rounded-xl font-bold ${
          cartItems.length === 0
            ? "bg-gray-300 pointer-events-none"
            : "bg-[#ad2c00] text-white"
        }`}
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}

export default OrderSummary;