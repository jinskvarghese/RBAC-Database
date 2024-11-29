const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Import User model
const router = express.Router();
const verifyPermission = require('../middleware/verifyPermission');
const authorize = require('../middleware/authorize');

// User Registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, roleId } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      roleId, // Assign a role during registration
    });

    res.status(201).json({ message: 'User registered successfully.', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

// User Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, roleId: user.roleId }, 'your_jwt_secret', {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful.', token });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

// Example Admin-only route
router.get('/admin', authorize(['ADMIN_ACCESS']), (req, res) => {
  res.status(200).json({ message: 'Welcome, Admin!' });
});

// Protected Routes
router.get('/admin/dashboard', verifyPermission('view_dashboard'), (req, res) => {
  res.send('Welcome to the Admin Dashboard!');
});

router.put('/admin/users', verifyPermission('edit_users'), (req, res) => {
  res.send('Edit Users: Access granted');
});

router.get('/profile', verifyPermission('view_profile'), (req, res) => {
  res.send('View Profile: Access granted');
});

module.exports = router;