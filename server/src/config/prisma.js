/**
 * Prisma Database Client Configuration
 * 
 * This module initializes and exports a single instance of the Prisma Client.
 * Prisma is an ORM (Object-Relational Mapping) tool that provides type-safe database access.
 * 
 * The Prisma Client is used throughout the application to interact with the SQLite database.
 * Using a single instance prevents connection pool exhaustion and improves performance.
 */

const { PrismaClient } = require("@prisma/client");

// Initialize Prisma Client
// This connects to the database specified in the .env file (DATABASE_URL)
const prisma = new PrismaClient();

module.exports = prisma;