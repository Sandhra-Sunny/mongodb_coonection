const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

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

db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(cors());

// Define an API endpoint to fetch products
app.get('/api/products', async (req, res) => {
  try {
    // Fetch all documents from the 'products' collection
    const products = await Product.find();
    res.json(products); // Send the products as JSON response
    
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
