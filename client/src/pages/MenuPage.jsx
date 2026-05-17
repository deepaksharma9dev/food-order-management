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
      <section className="bg-white py-20 md:py-28 px-4 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#191c1d] mb-6">
              Order your favorite food
            </h1>

            <p className="text-lg text-[#5c4038] mb-8 max-w-xl">
              Fresh meals delivered fast to your doorstep. Experience delicious meals from top kitchens.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#menu"
                className="bg-[#ad2c00] text-white px-8 py-4 rounded-xl font-bold"
              >
                Browse Menu
              </a>

              <Link
                to="/cart"
                className="border-2 border-[#ad2c00] text-[#ad2c00] px-8 py-4 rounded-xl font-bold"
              >
                View Cart
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
              alt="Food table"
              className="rounded-[2rem] shadow-2xl h-[430px] w-full object-cover"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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