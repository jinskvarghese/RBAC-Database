const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Initialize Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Username
  process.env.DB_PASSWORD, // Password
  {
    host: process.env.DB_HOST, // Host
    dialect: 'postgres', // Database type
  }
);

// Test the connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database successfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDB };
