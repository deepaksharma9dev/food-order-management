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

import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// ==================== Page Imports ====================

const MenuPage = lazy(() => import("../pages/MenuPage"));
const CartPage = lazy(() => import("../pages/CartPage"));
const CheckoutPage = lazy(() =>
  import("../pages/CheckoutPage")
);
const OrderTrackingPage = lazy(() =>
  import("../pages/OrderTrackingPage")
);

function RouteLoader() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center px-4">
      <div
        className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-sm"
        aria-label="Loading page"
      >
        <div className="animate-pulse space-y-4">
          <div className="h-5 bg-gray-200 rounded w-2/3" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-12 bg-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

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
      <Suspense fallback={<RouteLoader />}>
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
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
