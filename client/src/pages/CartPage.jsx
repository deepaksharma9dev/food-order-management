import MainLayout from "../layouts/MainLayout";

import { useCart } from "../context/CartContext";

import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";

import { Link } from "react-router-dom";

function CartPage() {
  const { cartItems } = useCart();

  return (
    <MainLayout>
      <section className="max-w-7xl mx-auto px-4 md:px-12 py-16">
        <h1 className="text-4xl font-extrabold mb-10">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold mb-4">
              Your cart is empty
            </h2>

            <p className="text-gray-600 mb-6">
              Add some delicious food to continue.
            </p>

            <Link
              to="/"
              className="bg-[#ad2c00] text-white px-8 py-4 rounded-xl font-bold inline-block"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                />
              ))}
            </div>

            <div className="lg:col-span-4">
              <OrderSummary />
            </div>
          </div>
        )}
      </section>
    </MainLayout>
  );
}

export default CartPage;