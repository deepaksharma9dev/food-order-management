import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import { useCart } from "../context/CartContext";
import api from "../services/api";

function CheckoutPage() {
  const navigate = useNavigate();

  const {
    cartItems,
    subtotal,
    deliveryFee,
    totalAmount,
    clearCart,
  } = useCart();

  const [form, setForm] = useState({
    customerName: "",
    phoneNumber: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.customerName || !form.phoneNumber || !form.address) {
      setError("Please fill all delivery details.");
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      setPlacingOrder(true);

      const payload = {
        customerName: form.customerName,
        phoneNumber: form.phoneNumber,
        address: form.address,
        items: cartItems.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
        })),
      };

      const response = await api.post("/orders", payload);

      const orderId = response.data.data.id;

      clearCart();

      navigate(`/orders/${orderId}`);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to place order."
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <MainLayout>
        <section className="max-w-7xl mx-auto px-4 md:px-12 py-16">
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
            <h1 className="text-3xl font-extrabold mb-4">
              Your cart is empty
            </h1>

            <p className="text-gray-600 mb-6">
              Add food items before checkout.
            </p>

            <Link
              to="/"
              className="bg-[#ad2c00] text-white px-8 py-4 rounded-xl font-bold inline-block"
            >
              Browse Menu
            </Link>
          </div>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="max-w-7xl mx-auto px-4 md:px-12 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2">
            Checkout
          </h1>

          <p className="text-gray-600">
            Confirm your delivery details and complete your order.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <form
            onSubmit={handlePlaceOrder}
            className="lg:col-span-7 bg-white rounded-2xl p-6 md:p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold mb-6">
              Delivery Details
            </h2>

            {error && (
              <div className="mb-5 bg-red-50 text-red-600 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Full Name
                </label>

                <input
                  name="customerName"
                  value={form.customerName}
                  onChange={handleChange}
                  placeholder="Deepak Sharma"
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-[#ad2c00]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Phone Number
                </label>

                <input
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  placeholder="9999999999"
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-[#ad2c00]"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Delivery Address
              </label>

              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Street, apartment, city"
                rows="4"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ad2c00]"
              />
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-600 mb-3">
                Payment Method
              </p>

              <div className="border-2 border-[#ad2c00] bg-orange-50 rounded-xl p-4 flex items-center justify-between">
                <span className="font-bold">
                  Cash on Delivery
                </span>

                <span className="text-[#ad2c00] font-bold">
                  Selected
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={placingOrder}
              className="mt-8 w-full bg-[#ad2c00] text-white py-4 rounded-xl font-bold disabled:opacity-60"
            >
              {placingOrder ? "Placing Order..." : "Place Order"}
            </button>
          </form>

          <aside className="lg:col-span-5 bg-white rounded-2xl p-6 md:p-8 shadow-sm sticky top-24">
            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="divide-y">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="py-4 flex items-center gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-xl"
                  />

                  <div className="flex-1">
                    <h4 className="font-bold">
                      {item.name}
                    </h4>

                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-bold">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Subtotal
                </span>

                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">
                  Delivery Fee
                </span>

                <span>₹{deliveryFee}</span>
              </div>

              <div className="flex justify-between text-xl font-extrabold border-t pt-4">
                <span>Total</span>

                <span className="text-[#ad2c00]">
                  ₹{totalAmount}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </MainLayout>
  );
}

export default CheckoutPage;