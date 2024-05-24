import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function FormAdd() {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productStock, setProductStock] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send data to the server using axios
            await axios.post('http://localhost:5000/products', { productName, productDescription, productPrice, productStock });
            // Display notification
            toast.success('Product added successfully', { position: toast.POSITION.TOP_CENTER });
            // Redirect to the products page after successfully adding a product
            window.location.href = '/products';
        } catch (error) {
            console.error('Error adding product:', error);
            toast.error('Failed to add product', { position: toast.POSITION.TOP_CENTER });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="productName" className="block text-gray-700 font-bold mb-2">Name:</label>
                <input type="text" id="productName" name="productName" value={productName} onChange={(e) => setProductName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-4">
                <label htmlFor="productDescription" className="block text-gray-700 font-bold mb-2">Description:</label>
                <textarea id="productDescription" name="productDescription" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-4">
                <label htmlFor="productPrice" className="block text-gray-700 font-bold mb-2">Price:</label>
                <input type="number" id="productPrice" name="productPrice" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-6">
                <label htmlFor="productStock" className="block text-gray-700 font-bold mb-2">Stock:</label>
                <input type="number" id="productStock" name="productStock" value={productStock} onChange={(e) => setProductStock(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Product</button>
        </form>
    );
}

export default FormAdd;
