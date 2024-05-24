import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function FormAdd() {
    const [purchaseId, setPurchaseId] = useState('');
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Kirim data ke server menggunakan axios
            await axios.post('http://localhost:5000/purchase-details', { purchaseId, productId, quantity, price });
            // Tampilkan notifikasi
            toast.success('Purchase detail added successfully', { position: toast.POSITION.TOP_CENTER });
            // Redirect ke halaman detail pembelian setelah berhasil menambahkan detail pembelian
            window.location.href = '/purchase-details';
        } catch (error) {
            console.error('Error adding purchase detail:', error);
            toast.error('Failed to add purchase detail', { position: toast.POSITION.TOP_CENTER });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="purchaseId" className="block text-gray-700 font-bold mb-2">Purchase ID:</label>
                <input type="text" id="purchaseId" name="purchaseId" value={purchaseId} onChange={(e) => setPurchaseId(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
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
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Purchase Detail</button>
        </form>
    );
}

export default FormAdd;
