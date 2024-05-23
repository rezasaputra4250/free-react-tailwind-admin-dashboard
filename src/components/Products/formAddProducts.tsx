import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormAddProducts: React.FC = () => {
  const [productName, setProductName] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [productPrice, setProductPrice] = useState<number>(0);
  const [productStock, setProductStock] = useState<number>(0);
  const navigate = useNavigate(); // Gunakan useNavigate

  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const handleProductDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductDescription(e.target.value);
  };

  const handleProductPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductPrice(parseFloat(e.target.value));
  };

  const handleProductStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductStock(parseFloat(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/products', {
        productName: productName,
        productDescription: productDescription,
        productPrice: productPrice,
        productStock: productStock,
      });

      console.log('Product added:', response.data);

      // Reset form fields
      setProductName('');
      setProductDescription('');
      setProductPrice(0);
      setProductStock(0);

      // Redirect to products page
      navigate('/products'); // Gunakan navigate untuk melakukan redirect
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <div className="mb-4">
        <label htmlFor="productName" className="block text-gray-700 text-sm font-bold mb-2">Product Name:</label>
        <input type="text" id="productName" value={productName} onChange={handleProductNameChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="productDescription" className="block text-gray-700 text-sm font-bold mb-2">Product Description:</label>
        <input type="text" id="productDescription" value={productDescription} onChange={handleProductDescriptionChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="productPrice" className="block text-gray-700 text-sm font-bold mb-2">Product Price:</label>
        <input type="number" id="productPrice" value={productPrice} onChange={handleProductPriceChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="productStock" className="block text-gray-700 text-sm font-bold mb-2">Product Stock:</label>
        <input type="number" id="productStock" value={productStock} onChange={handleProductStockChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="flex items-center justify-between">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Product</button>
      </div>
    </form>
  );
};

export default FormAddProducts;