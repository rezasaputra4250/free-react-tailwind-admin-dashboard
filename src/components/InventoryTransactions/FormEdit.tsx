import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function FormEdit() {
    const { id } = useParams(); // Dapatkan parameter id dari URL
    const [formData, setFormData] = useState({
        transactionId: '',
        productId: '',
        transactionDate: '',
        quantity: '',
        transactionType: ''
    });

    useEffect(() => {
        // Ambil data transaksi inventaris berdasarkan ID ketika komponen dipasang
        axios.get(`http://localhost:5000/inventory-transactions/${id}`)
            .then(response => {
                // Setel data transaksi inventaris ke dalam state formData
                setFormData(response.data);
            })
            .catch(error => console.error('Error fetching inventory transaction:', error));
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
            await axios.patch(`http://localhost:5000/inventory-transactions/${id}`, formData);
            alert('Inventory transaction updated successfully!');
            // Redirect ke halaman inventaris setelah berhasil memperbarui
            window.location.href = '/inventory';
        } catch (error) {
            console.error('Error updating inventory transaction:', error);
            alert('Failed to update inventory transaction.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="transactionId" className="block text-gray-700 font-bold mb-2">Transaction ID:</label>
                <input type="text" id="transactionId" name="transactionId" value={formData.transactionId} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-4">
                <label htmlFor="productId" className="block text-gray-700 font-bold mb-2">Product ID:</label>
                <input type="text" id="productId" name="productId" value={formData.productId} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-4">
                <label htmlFor="transactionDate" className="block text-gray-700 font-bold mb-2">Transaction Date:</label>
                <input type="date" id="transactionDate" name="transactionDate" value={formData.transactionDate} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-4">
                <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">Quantity:</label>
                <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-6">
                <label htmlFor="transactionType" className="block text-gray-700 font-bold mb-2">Transaction Type:</label>
                <input type="text" id="transactionType" name="transactionType" value={formData.transactionType} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update Inventory Transaction</button>
        </form>
    );
}

export default FormEdit;
