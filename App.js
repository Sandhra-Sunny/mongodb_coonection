import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });

  return (
    <div className="App">
      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product._id}>
           <strong>Product Id:</strong>{product._id}  <strong>Name:</strong> {product.product_name}, <strong>Price:</strong> ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

