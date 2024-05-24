import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function FormAdd() {
    const [orderId, setOrderId] = useState('');
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Kirim data ke server menggunakan axios
            await axios.post('http://localhost:5000/ordersdetails', { orderId, productId, quantity, price });
            // Tampilkan notifikasi
            toast.success('Order detail added successfully', { position: toast.POSITION.TOP_CENTER });
            // Redirect ke halaman orders setelah berhasil menambahkan detail pesanan
            window.location.href = '/orders';
        } catch (error) {
            console.error('Error adding order detail:', error);
            toast.error('Failed to add order detail', { position: toast.POSITION.TOP_CENTER });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="orderId" className="block text-gray-700 font-bold mb-2">Order ID:</label>
                <input type="text" id="orderId" name="orderId" value={orderId} onChange={(e) => setOrderId(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-4">
                <label htmlFor="productId" className="block text-gray-700 font-bold mb-2">Product ID:</label>
                <input type="text" id="productId" name="productId" value={productId} onChange={(e) => setProductId(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-4">
                <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">Quantity:</label>
                <input type="number" id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-6">
                <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price:</label>
                <input type="number" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Order Detail</button>
        </form>
    );
}

export default FormAdd;
