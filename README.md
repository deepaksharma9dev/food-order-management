# Food Order Management System

A full-stack web application for managing food orders with real-time order tracking and status updates. Built with React, Express.js, Node.js, and SQLite.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Frontend Components](#frontend-components)
- [Database Schema](#database-schema)
- [Key Features](#key-features)
- [Development Guidelines](#development-guidelines)
- [Troubleshooting](#troubleshooting)

## 🎯 Project Overview

The Food Order Management System is a comprehensive solution for restaurants and food delivery services. It allows customers to:
- Browse a menu of available food items
- Add items to their cart
- Place orders with delivery details
- Track order status in real-time
- View order history

Administrators can:
- Manage menu items
- View and update order statuses
- Monitor order flow

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js (v5.2.1)
- **Database**: Neon PostgresQL
- **ORM**: Prisma (v6.19.3)
- **Real-time Communication**: Socket.io (v4.8.3)
- **Testing**: Jest, Supertest
- **Development**: Nodemon

### Frontend
- **Library**: React (v19.2.6)
- **Build Tool**: Vite (v8.0.12+)
- **Routing**: React Router DOM (v7.15.1)
- **HTTP Client**: Axios (v1.16.1)
- **Real-time Client**: Socket.io Client (v4.8.3)
- **Styling**: Tailwind CSS (v4.3.0)
- **Icons**: Lucide React
- **Linting**: ESLint

## 📁 Project Structure

```
food-order-management/
├── README.md                              # This file
├── client/                                # React Frontend Application
│   ├── package.json                       # Frontend dependencies
│   ├── vite.config.js                     # Vite build configuration
│   ├── eslint.config.js                   # ESLint configuration
│   ├── index.html                         # HTML entry point
│   ├── public/                            # Static assets
│   ├── src/
│   │   ├── main.jsx                       # React entry point
│   │   ├── App.jsx                        # Root application component
│   │   ├── App.css                        # Global styles
│   │   ├── index.css                      # Tailwind CSS imports
│   │   ├── assets/                        # Images, fonts, media
│   │   ├── components/                    # Reusable React components
│   │   │   ├── Header.jsx                 # Navigation header with cart icon
│   │   │   ├── Footer.jsx                 # Footer component
│   │   │   ├── FoodCard.jsx               # Individual food item display
│   │   │   ├── CartItem.jsx               # Cart item display component
│   │   │   ├── OrderSummary.jsx           # Order summary display
│   │   │   └── StatusStepper.jsx          # Order status visualization
│   │   ├── context/
│   │   │   └── CartContext.jsx            # Global cart state management
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx             # Main layout wrapper
│   │   ├── pages/                         # Page components (routes)
│   │   │   ├── MenuPage.jsx               # Menu browsing page
│   │   │   ├── CartPage.jsx               # Shopping cart page
│   │   │   ├── CheckoutPage.jsx           # Order checkout page
│   │   │   └── OrderTrackingPage.jsx      # Order tracking page
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx              # Route definitions
│   │   ├── services/
│   │   │   └── api.js                     # API client configuration
│   │   └── socket/
│   │       └── socket.js                  # Socket.io client setup
│   └── node_modules/                      # Frontend dependencies
│
└── server/                                # Express Backend Application
    ├── package.json                       # Backend dependencies
    ├── src/
    │   ├── server.js                      # Server entry point and Socket.io setup
    │   ├── app.js                         # Express app configuration
    │   ├── config/
    │   │   └── prisma.js                  # Prisma client initialization
    │   ├── controllers/                   # Business logic handlers
    │   │   ├── menu.controller.js         # Menu-related operations
    │   │   └── order.controller.js        # Order-related operations
    │   ├── routes/                        # API route definitions
    │   │   ├── menu.routes.js             # Menu endpoints
    │   │   └── order.routes.js            # Order endpoints
    │   ├── services/
    │   │   └── orderStatus.service.js     # Order status management logic
    │   ├── data/
    │   │   └── menuData.js                # Initial menu items seed data
    │   ├── middlewares/                   # Express middleware (if any)
    │   ├── sockets/                       # Socket.io event handlers (if any)
    │   └── tests/
    │       └── order.test.js              # Order controller tests
    ├── prisma/
    │   ├── schema.prisma                  # Database schema definition
    │   ├── migrations/                    # Database migration history
    │   │   └── 20260517202001_init/      # Initial schema migration
    │   └── migration_lock.toml            # Migration lock file
    └── node_modules/                      # Backend dependencies
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v16.x or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)
- **SQLite** (bundled with Prisma)

To verify installations:
```bash
node --version    # Should show v16.x or higher
npm --version     # Should show 8.x or higher
git --version     # Should show your git version
```

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
cd your-projects-directory
git clone <repository-url>
cd food-order-management
```

### Step 2: Install Backend Dependencies

```bash
cd server
npm install
```

### Step 3: Setup Database

Create a `.env` file in the `server` directory:

```bash
# server/.env
DATABASE_URL="file:./dev.db"
NODE_ENV="development"
PORT=5000
```

Initialize the database:

```bash
npx prisma migrate dev --name init
```

This command will:
- Create the SQLite database
- Run migrations
- Generate Prisma client

### Step 4: Install Frontend Dependencies

```bash
cd ../client
npm install
```

Make sure to install any missing dependencies like lucide-react:

```bash
npm install lucide-react
```

### Step 5: Verify Installation

Both directories should have `node_modules` folders:
```bash
ls -la server/node_modules    # Backend modules
ls -la client/node_modules    # Frontend modules
```

## ▶️ Running the Application

### Terminal 1: Start the Backend Server

```bash
cd server
npm run dev
```

Expected output:
```
Server running on http://localhost:5000
```

The API will be available at `http://localhost:5000`

### Terminal 2: Start the Frontend Development Server

```bash
cd client
npm run dev
```

Expected output:
```
VITE v8.0.13 ready in XXX ms
➜ Local: http://localhost:5173/
```

Open your browser and navigate to `http://localhost:5173/`

### Production Build

**Frontend Build:**
```bash
cd client
npm run build
```

This creates an optimized build in the `dist/` folder.

**Running Tests:**
```bash
cd server
npm test
```

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Menu Endpoints

#### Get All Menu Items
```
GET /api/menu
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-string",
      "name": "Burger",
      "description": "Delicious burger",
      "price": 9.99,
      "image": "image-url",
      "createdAt": "2026-05-17T..."
    }
  ]
}
```

#### Seed Menu (Initialize menu items)
```
POST /api/menu/seed
```

**Response:**
```json
{
  "success": true,
  "message": "Menu seeded successfully",
  "data": [ ... menu items ... ]
}
```

### Order Endpoints

#### Create Order
```
POST /api/orders
```

**Request Body:**
```json
{
  "customerName": "John Doe",
  "address": "123 Main St, City, State 12345",
  "phoneNumber": "+1 (555) 123-4567",
  "items": [
    {
      "menuItemId": "menu-item-uuid",
      "quantity": 2
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "id": "order-uuid",
    "customerName": "John Doe",
    "address": "123 Main St",
    "phoneNumber": "+1 (555) 123-4567",
    "totalAmount": 19.98,
    "status": "Order Received",
    "createdAt": "2026-05-18T...",
    "items": [ ... ]
  }
}
```

#### Get All Orders
```
GET /api/orders
```

**Response:**
```json
{
  "success": true,
  "data": [ ... array of orders ... ]
}
```

#### Get Order by ID
```
GET /api/orders/:orderId
```

**Response:**
```json
{
  "success": true,
  "data": { ... order details ... }
}
```

### WebSocket Events (Real-time Updates)

#### Order Status Update
```javascript
// Client listening for order updates
socket.on('order-status-updated', (data) => {
  // data contains { orderId, status, updatedAt }
});
```

## 🗄️ Database Schema

### MenuItem
- **id** (String): Unique identifier (UUID)
- **name** (String): Food item name
- **description** (String): Item description
- **price** (Float): Item price
- **image** (String): Image URL
- **createdAt** (DateTime): Creation timestamp
- **Relations**: One-to-Many with OrderItem

### Order
- **id** (String): Unique identifier (UUID)
- **customerName** (String): Customer's name
- **address** (String): Delivery address
- **phoneNumber** (String): Customer's phone number
- **totalAmount** (Float): Total order amount
- **status** (String): Current order status
- **createdAt** (DateTime): Order creation timestamp
- **Relations**: One-to-Many with OrderItem

### OrderItem
- **id** (String): Unique identifier (UUID)
- **orderId** (String): Foreign key to Order
- **menuItemId** (String): Foreign key to MenuItem
- **quantity** (Int): Number of items ordered
- **price** (Float): Price at time of order
- **Relations**: Many-to-One with Order and MenuItem

## ✨ Key Features

### Frontend Features
- ✅ **Responsive Design**: Mobile-first design with Tailwind CSS
- ✅ **Cart Management**: Add/remove items, quantity adjustment
- ✅ **Real-time Cart**: Cart persists in localStorage
- ✅ **Order Tracking**: Live order status updates via WebSocket
- ✅ **Order History**: View past and current orders
- ✅ **Status Stepper**: Visual order status progression
- ✅ **Form Validation**: Input validation for checkout

### Backend Features
- ✅ **RESTful API**: Standard REST endpoints
- ✅ **Real-time Updates**: Socket.io for live order status
- ✅ **Data Validation**: Input validation on all endpoints
- ✅ **Database ORM**: Prisma for type-safe database queries
- ✅ **CORS Support**: Cross-origin request handling
- ✅ **Error Handling**: Comprehensive error responses
- ✅ **Testing**: Jest tests for order operations

## 📚 Development Guidelines

### Code Style & Standards

#### Naming Conventions
- **Files**: camelCase for utilities, PascalCase for components (React)
- **Variables & Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Classes**: PascalCase

#### Backend Best Practices
1. **Controllers**: Handle HTTP requests/responses only
2. **Services**: Contain business logic
3. **Models**: Define data structures (Prisma schemas)
4. **Error Handling**: Return meaningful error messages with proper status codes
5. **Validation**: Validate all inputs before processing

#### Frontend Best Practices
1. **Components**: Single responsibility principle
2. **Context**: For global state management only
3. **Hooks**: Use React hooks for state and side effects
4. **Props**: Destructure props in function parameters
5. **Comments**: Document complex logic and non-obvious code

### Adding New Features

#### Adding a New Menu Item Endpoint
1. Update schema in `prisma/schema.prisma`
2. Run `npx prisma migrate dev`
3. Add controller logic in `server/src/controllers/menu.controller.js`
4. Add routes in `server/src/routes/menu.routes.js`
5. Test endpoints with Postman or similar tool

#### Adding a New Frontend Page
1. Create component in `client/src/pages/`
2. Add route in `client/src/routes/AppRoutes.jsx`
3. Create API calls in `client/src/services/api.js`
4. Add navigation link in `client/src/components/Header.jsx`

### Debugging

#### Backend Debugging
```bash
# Enable detailed logging
DEBUG=* npm run dev

# Run tests with coverage
npm test -- --coverage
```

#### Frontend Debugging
- Use React DevTools browser extension
- Use Vite DevTools for build analysis
- Check browser console for errors
- Use Network tab to inspect API calls

## 🆘 Troubleshooting

### Common Issues & Solutions

#### 1. "Cannot find module 'lucide-react'"
```bash
# Solution: Install the missing package
cd client
npm install lucide-react
```

#### 2. "EADDRINUSE: address already in use :::5000"
```bash
# Solution: Find and kill process using port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :5000
kill -9 <PID>
```

#### 3. Database connection errors
```bash
# Solution: Reset the database
cd server
rm dev.db
npx prisma migrate dev --name init
```

#### 4. Port 5173 already in use (Frontend)
```bash
# Solution: Run on a different port
cd client
npm run dev -- --port 3000
```

#### 5. CORS errors
- Verify `cors()` is enabled in `server/src/app.js`
- Check that frontend API calls use correct backend URL
- Verify backend is running on expected port

#### 6. Build errors in development
```bash
# Clear cache and reinstall
cd client
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Getting Help
1. Check error message carefully - it usually indicates the problem
2. Look at browser console (F12) for frontend errors
3. Check terminal output for backend errors
4. Review the relevant controller/component code
5. Check database state with Prisma Studio: `npx prisma studio`

---

## 📝 Notes for New Developers

### First Time Setup Checklist
- [ ] Clone repository
- [ ] Install Node.js if not already installed
- [ ] Follow installation steps above
- [ ] Run backend server successfully
- [ ] Run frontend server successfully
- [ ] Access application in browser
- [ ] Test creating an order
- [ ] Read through main controller files

### Important Files to Understand First
1. `server/src/app.js` - App configuration
2. `server/prisma/schema.prisma` - Database structure
3. `client/src/context/CartContext.jsx` - State management
4. `client/src/routes/AppRoutes.jsx` - Frontend routing
5. `server/src/controllers/order.controller.js` - Main business logic

### Useful Commands Reference
```bash
# Backend
npm run dev              # Start with hot reload
npm test                 # Run tests
npx prisma studio       # Open database GUI

# Frontend
npm run dev              # Start Vite dev server
npm run build            # Production build
npm run preview          # Preview build
npm run lint             # Run ESLint
```

---

**Last Updated**: May 18, 2026  
**Maintainer**: Development Team  
**License**: ISC
