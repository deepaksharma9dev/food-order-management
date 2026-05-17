/**
 * Root Application Component
 * 
 * Serves as the entry point for the React application.
 * Renders the application routes and provides the global cart context.
 */

import AppRoutes from "./routes/AppRoutes.jsx";

/**
 * App Component
 * 
 * The root component that wraps all other components.
 * In the main.jsx file, this component is wrapped with CartProvider
 * to enable global cart state management throughout the application.
 * 
 * @returns {JSX.Element} The application routes
 */
function App() {
  return <AppRoutes />;
}

export default App;