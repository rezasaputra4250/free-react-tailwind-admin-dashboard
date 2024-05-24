import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductFormEdit() {
    const { id } = useParams(); // Get the id parameter from the URL
    const [formData, setFormData] = useState({
        productName: '',
        productDescription: '',
        productPrice: '',
        productStock: ''
    });

    useEffect(() => {
        // Fetch product data based on ID when the component mounts
        axios.get(`http://localhost:5000/products/${id}`)
            .then(response => {
                // Set product data to the formData state
                setFormData(response.data);
            })
            .catch(error => console.error('Error fetching product:', error));
    }, [id]); // Use id as a dependency

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send the edited data to the server using axios
            await axios.patch(`http://localhost:5000/products/${id}`, formData);
            alert('Product updated successfully!');
            // Redirect to the products page after successfully updating
            window.location.href = '/products';
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="productName" className="block text-gray-700 font-bold mb-2">Name:</label>
                <input type="text" id="productName" name="productName" value={formData.productName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-4">
                <label htmlFor="productDescription" className="block text-gray-700 font-bold mb-2">Description:</label>
                <textarea id="productDescription" name="productDescription" value={formData.productDescription} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-4">
                <label htmlFor="productPrice" className="block text-gray-700 font-bold mb-2">Price:</label>
                <input type="number" id="productPrice" name="productPrice" value={formData.productPrice} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-6">
                <label htmlFor="productStock" className="block text-gray-700 font-bold mb-2">Stock:</label>
                <input type="number" id="productStock" name="productStock" value={formData.productStock} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update Product</button>
        </form>
    );
}

export default ProductFormEdit;
