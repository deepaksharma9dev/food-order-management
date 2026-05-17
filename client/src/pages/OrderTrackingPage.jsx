import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import StatusStepper from "../components/StatusStepper";
import api from "../services/api";
import socket from "../socket/socket";

function OrderTrackingPage() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [socketConnected, setSocketConnected] =
    useState(false);

  const fetchOrder = async () => {
    try {
      const response = await api.get(`/orders/${id}`);
      setOrder(response.data.data);
    } catch (error) {
      console.error("Order fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();

    socket.emit("joinOrder", id);

    socket.on("connect", () => {
      setSocketConnected(true);
    });

    socket.on("disconnect", () => {
      setSocketConnected(false);
    });

    socket.on("orderStatusUpdated", (updatedOrder) => {
      setOrder(updatedOrder);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("orderStatusUpdated");
    };
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <section className="max-w-7xl mx-auto px-4 md:px-12 py-16">
          <p>Loading order...</p>
        </section>
      </MainLayout>
    );
  }

  if (!order) {
    return (
      <MainLayout>
        <section className="max-w-7xl mx-auto px-4 md:px-12 py-16">
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
            <h1 className="text-3xl font-extrabold mb-4">
              Order not found
            </h1>

            <Link
              to="/"
              className="bg-[#ad2c00] text-white px-8 py-4 rounded-xl font-bold inline-block"
            >
              Back to Menu
            </Link>
          </div>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="max-w-7xl mx-auto px-4 md:px-12 py-16">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-orange-50 rounded-full mx-auto flex items-center justify-center text-4xl mb-6">
            ✅
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            Thank you for your order!
          </h1>

          <p className="text-gray-600 text-lg">
            Your order{" "}
            <span className="font-bold text-[#ad2c00]">
              #{order.id.slice(0, 8).toUpperCase()}
            </span>{" "}
            is being processed.
          </p>

          <p className="mt-3 text-sm text-gray-500">
            Realtime:{" "}
            <span
              className={
                socketConnected
                  ? "text-green-600 font-bold"
                  : "text-gray-500 font-bold"
              }
            >
              {socketConnected ? "Connected" : "Connecting..."}
            </span>
          </p>
        </div>

        <StatusStepper currentStatus={order.status} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
          <div className="md:col-span-5 bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold mb-6">
              Delivery Details
            </h2>

            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-bold">Name:</span>{" "}
                {order.customerName}
              </p>

              <p>
                <span className="font-bold">Phone:</span>{" "}
                {order.phoneNumber}
              </p>

              <p>
                <span className="font-bold">Address:</span>{" "}
                {order.address}
              </p>

              <p>
                <span className="font-bold">Status:</span>{" "}
                <span className="text-[#ad2c00] font-bold">
                  {order.status}
                </span>
              </p>
            </div>
          </div>

          <div className="md:col-span-7 bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                Order Summary
              </h2>

              <span className="bg-orange-50 text-[#ad2c00] px-4 py-1 rounded-full font-bold text-sm">
                {order.items.length} Items
              </span>
            </div>

            <div className="divide-y">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="py-4 flex items-center gap-4"
                >
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-bold">
                      {item.menuItem.name}
                    </h3>

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

            <div className="flex justify-between items-center border-t pt-5 mt-5 text-xl font-extrabold">
              <span>Total</span>

              <span className="text-[#ad2c00]">
                ₹{order.totalAmount}
              </span>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link
            to="/"
            className="inline-block border-2 border-[#ad2c00] text-[#ad2c00] px-8 py-4 rounded-xl font-bold"
          >
            Back to Menu
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}

export default OrderTrackingPage;