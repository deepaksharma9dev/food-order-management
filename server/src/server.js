/**
 * Server Entry Point with WebSocket Configuration
 * 
 * This file:
 * 1. Creates an HTTP server from the Express app
 * 2. Sets up Socket.io for real-time, bidirectional communication
 * 3. Configures CORS for WebSocket connections
 * 4. Handles WebSocket events (connection, joining rooms, disconnect)
 * 
 * Socket.io is used to push real-time order status updates to connected clients.
 */

const http = require("http");
const { Server } = require("socket.io");

// Import the Express application configuration
const app = require("./app");

// Get server port from environment variable or use default
const PORT = process.env.PORT || 5000;

// ==================== HTTP Server Setup ====================

// Create an HTTP server from the Express app
// This allows us to attach Socket.io to the same server instance
const server = http.createServer(app);

// ==================== Socket.io Configuration ====================

/**
 * Initialize Socket.io server with CORS configuration
 * CORS settings allow connections from any origin (for development)
 * Supports all HTTP methods needed by Socket.io
 */
const io = new Server(server, {
  cors: {
    origin: "*", // Allow connections from any origin
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

// Make io instance available to Express routes via app.set()
// This allows controllers to emit events to connected clients
app.set("io", io);

// ==================== WebSocket Event Handlers ====================

/**
 * Handle new WebSocket connections
 * Each client connection gets a unique socket ID
 */
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  /**
   * Handle joinOrder event
   * Clients join a room named after the order ID
   * This allows order status updates to be sent to specific customers only
   * 
   * Usage: socket.emit('joinOrder', orderId)
   */
  socket.on("joinOrder", (orderId) => {
    // Join the socket to a room with the order ID
    // Messages to this room will only be received by sockets in this room
    socket.join(orderId);
    console.log(`Socket ${socket.id} joined order room: ${orderId}`);
  });

  /**
   * Handle client disconnect
   * Called when a client closes the connection or loses network
   */
  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

// ==================== Server Startup ====================

/**
 * Start the HTTP/WebSocket server
 * Listens on the specified PORT for incoming requests and connections
 */
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`HTTP: http://localhost:${PORT}`);
  console.log(`WebSocket: ws://localhost:${PORT}`);
});