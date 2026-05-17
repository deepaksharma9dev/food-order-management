/**
 * Socket.io Client Configuration
 * 
 * Initializes a WebSocket connection to the backend server for real-time communication.
 * This connection is used to receive live updates about order statuses.
 * 
 * The socket instance is imported and used in components that need real-time data,
 * particularly the OrderTrackingPage component.
 */

import { io } from "socket.io-client";

/**
 * Initialize Socket.io Client
 * 
 * Creates a persistent WebSocket connection to the backend server at port 5000.
 * This allows the client to:
 * - Receive real-time order status updates
 * - Subscribe to specific order updates via room joining
 * - Listen for custom events emitted from the server
 * 
 * Key Features:
 * - Auto-reconnection on disconnect
 * - Message queuing while disconnected
 * - Namespace support for organizing events
 * 
 * Example usage in components:
 * socket.emit('joinOrder', orderId) - Subscribe to specific order
 * socket.on('orderStatusUpdated', (data) => {...}) - Listen for updates
 */
const socket = io("http://localhost:5000");

export default socket;