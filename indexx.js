const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Replace 'your_database_url' with your actual MongoDB connection URL
const databaseURL = 'mongodb://127.0.0.1:27017/Mern';

// Define a Mongoose schema for the 'products' collection
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

// Create a Mongoose model based on the schema
const Product = mongoose.model('Product', productSchema);

// Connect to MongoDB
mongoose.connect(databaseURL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', err => {
  console.error('MongoDB connection error:', err);
});

db.once('open', async () => {
  console.log('Connected to MongoDB');

  try {
    // Fetch all documents from the 'products' collection
    const products = await Product.find();
    console.log('items:', products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});

app.get('/api/products', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});