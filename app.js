const express = require('express');
const app = express();
const db = require('./models'); // Import Sequelize models
const authRoutes = require('./routes/auth'); // Import auth routes
const  authorize  = require('./middleware/authorize'); // Import authorization middleware
const cors = require('cors');

// Allow requests from your frontend
app.use(cors({ origin: 'http://localhost:3000' }));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Set up authentication routes
app.use('/auth', authRoutes);

// Define the /admin route with authorization middleware
app.get('/admin', authorize(['ADMIN_ACCESS']), (req, res) => {
  res.status(200).json({ message: 'Welcome, Admin!' });
});

// Test database connection and sync models
db.sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    return db.sequelize.sync(); // Sync database structure
  })
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server is running on http://localhost:${PORT}');
});