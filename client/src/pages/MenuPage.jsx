import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";
import MainLayout from "../layouts/MainLayout";
import FoodCard from "../components/FoodCard";

function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMenu = async () => {
    try {
      const response = await api.get("/menu");
      setMenu(response.data.data || []);
    } catch (error) {
      console.error("Menu fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <MainLayout>
      <section className="bg-white">
  <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 grid lg:grid-cols-2 gap-16 items-center">
    <div>
      <span className="inline-block bg-orange-100 text-[#ad2c00] px-4 py-2 rounded-full font-semibold mb-6">
        Fast Delivery • Fresh Food
      </span>

      <h1 className="text-5xl md:text-7xl font-black leading-tight text-[#191c1d]">
        Order your favorite food
      </h1>

      <p className="mt-6 text-xl text-gray-500 leading-8 max-w-xl">
        Fresh meals delivered fast to your doorstep.
        Experience premium dishes from top kitchens.
      </p>

      <div className="flex flex-wrap gap-4 mt-10">
        <a
          href="#menu"
          className="bg-[#ad2c00] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#922500] transition"
        >
          Browse Menu
        </a>

        <Link
          to="/cart"
          className="border-2 border-[#ad2c00] text-[#ad2c00] px-8 py-4 rounded-2xl font-bold hover:bg-orange-50 transition"
        >
          View Cart
        </Link>
      </div>
    </div>

    <div>
      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
        alt="Food"
        className="w-full h-[500px] object-cover rounded-[40px] shadow-2xl"
      />
    </div>
  </div>
</section>

      <section
        id="menu"
        className="max-w-7xl mx-auto px-4 md:px-12 py-16"
      >
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

        {loading ? (
          <p>Loading menu...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {menu.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    </MainLayout>
  );
}

export default MenuPage;