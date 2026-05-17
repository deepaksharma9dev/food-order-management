/**
 * API Service Configuration
 * 
 * Creates and exports an Axios instance configured to communicate
 * with the backend API at http://localhost:5000/api
 * 
 * This instance is used throughout the application for all HTTP requests
 * to the backend, ensuring consistent base URL and configuration.
 */

import axios from "axios";

/**
 * Create Axios instance with base configuration
 * 
 * All API calls made with this instance will automatically:
 * - Prepend the baseURL to all request paths
 * - Share common headers and settings
 * - Handle request/response interceptors if added
 * 
 * Example usage:
 * api.get('/menu') → GET http://localhost:5000/api/menu
 * api.post('/orders', data) → POST http://localhost:5000/api/orders
 */
const api = axios.create({
  // Base URL for all API requests
  baseURL: "http://localhost:5000/api",
});

export default api;