/**
 * Application Routes Configuration
 * 
 * Defines all the routes/pages in the application.
 * Uses React Router DOM for client-side navigation.
 * 
 * Routes:
 * - / : Menu page (home page)
 * - /cart : Shopping cart page
 * - /checkout : Order checkout page
 * - /orders/:id : Order tracking page
 */

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// ==================== Page Imports ====================

/**
 * Import all page components
 * Each page is a full-screen component that users navigate to
 */
import MenuPage from "../pages/MenuPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import OrderTrackingPage from "../pages/OrderTrackingPage";

/**
 * AppRoutes Component
 * 
 * Sets up the routing structure for the entire application.
 * BrowserRouter enables client-side routing without full page reloads.
 * 
 * @returns {JSX.Element} Router configuration with all routes
 */
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home page - displays menu items */}
        <Route path="/" element={<MenuPage />} />

        {/* Cart page - shows items in the shopping cart */}
        <Route
          path="/cart"
          element={<CartPage />}
        />

        {/* Checkout page - for placing orders */}
        <Route
          path="/checkout"
          element={<CheckoutPage />}
        />

        {/* Order tracking page - view specific order status */}
        <Route
          path="/orders/:id"
          element={<OrderTrackingPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;