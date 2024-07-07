const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Customer = require('./models/customer');
const { customerValidationRules, validate } = require('./validators/customerValidator');
const connectDB = require('./db');
const apiLimiter = require('./rateLimiter');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());
app.use(apiLimiter);

// Connect to MongoDB
connectDB();

// CRUD operations

// Create a customer
app.post('/customers', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('company').notEmpty().withMessage('Company is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(200).json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all customers
app.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read a specific customer
app.get('/customers/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a customer
app.put('/customers/:id', [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('phone').optional().notEmpty().withMessage('Phone cannot be empty'),
  body('address').optional().notEmpty().withMessage('Address cannot be empty'),
  body('company').optional().notEmpty().withMessage('Company cannot be empty'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const updateData = {};
    Object.keys(req.body).forEach(key => {
      updateData[key] = req.body[key];
    });

    const customer = await Customer.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true });
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});


// Delete a customer
app.delete('/customers/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const hardcodedEmail = 'admin@gmail.com';
const hardcodedPassword = 'admin';
const JWT_SECRET = 'sample_secret';

// Login
app.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  // Check if email and password match hardcoded values
  if (email !== hardcodedEmail || password !== hardcodedPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const payload = {
    email: email
    // You can add more data to payload if needed
  };

  jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to generate token' });
    } else {
      res.json({ token });
    }
  });

});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
