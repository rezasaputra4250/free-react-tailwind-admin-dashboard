import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function FormEdit() {
    const { id } = useParams(); // Dapatkan parameter id dari URL
    const [formData, setFormData] = useState({
        purchaseId: '',
        productId: '',
        quantity: '',
        price: ''
    });

    useEffect(() => {
        // Ambil data detail pembelian berdasarkan ID ketika komponen dipasang
        axios.get(`http://localhost:5000/purchase-details/${id}`)
            .then(response => {
                // Setel data detail pembelian ke dalam state formData
                setFormData(response.data);
            })
            .catch(error => console.error('Error fetching purchase detail:', error));
    }, [id]); // Gunakan id sebagai dependency

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
            // Kirim data yang diedit ke server menggunakan axios
            await axios.patch(`http://localhost:5000/purchase-details/${id}`, formData);
            alert('Purchase detail updated successfully!');
            // Redirect ke halaman detail pembelian setelah berhasil memperbarui
            window.location.href = '/purchase-details';
        } catch (error) {
            console.error('Error updating purchase detail:', error);
            alert('Failed to update purchase detail.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="purchaseId" className="block text-gray-700 font-bold mb-2">Purchase ID:</label>
                <input type="text" id="purchaseId" name="purchaseId" value={formData.purchaseId} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-4">
                <label htmlFor="productId" className="block text-gray-700 font-bold mb-2">Product ID:</label>
                <input type="text" id="productId" name="productId" value={formData.productId} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-4">
                <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">Quantity:</label>
                <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-6">
                <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price:</label>
                <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update Purchase Detail</button>
        </form>
    );
}

export default FormEdit;
