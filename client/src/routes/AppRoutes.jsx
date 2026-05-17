import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MenuPage from "../pages/MenuPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import OrderTrackingPage from "../pages/OrderTrackingPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuPage />} />

        <Route
          path="/cart"
          element={<CartPage />}
        />

        <Route
          path="/checkout"
          element={<CheckoutPage />}
        />

        <Route
          path="/orders/:id"
          element={<OrderTrackingPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;