import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function FormAdd() {
    const [transactionId, setTransactionId] = useState('');
    const [productId, setProductId] = useState('');
    const [transactionDate, setTransactionDate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [transactionType, setTransactionType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Kirim data ke server menggunakan axios
            await axios.post('http://localhost:5000/inventory-transactions', { transactionId, productId, transactionDate, quantity, transactionType });
            // Tampilkan notifikasi
            toast.success('Inventory transaction added successfully', { position: toast.POSITION.TOP_CENTER });
            // Redirect ke halaman inventaris setelah berhasil menambahkan transaksi inventaris
            window.location.href = '/inventory';
        } catch (error) {
            console.error('Error adding inventory transaction:', error);
            toast.error('Failed to add inventory transaction', { position: toast.POSITION.TOP_CENTER });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="transactionId" className="block text-gray-700 font-bold mb-2">Transaction ID:</label>
                <input type="text" id="transactionId" name="transactionId" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-4">
                <label htmlFor="productId" className="block text-gray-700 font-bold mb-2">Product ID:</label>
                <input type="text" id="productId" name="productId" value={productId} onChange={(e) => setProductId(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-4">
                <label htmlFor="transactionDate" className="block text-gray-700 font-bold mb-2">Transaction Date:</label>
                <input type="date" id="transactionDate" name="transactionDate" value={transactionDate} onChange={(e) => setTransactionDate(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-4">
                <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">Quantity:</label>
                <input type="number" id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-6">
                <label htmlFor="transactionType" className="block text-gray-700 font-bold mb-2">Transaction Type:</label>
                <input type="text" id="transactionType" name="transactionType" value={transactionType} onChange={(e) => setTransactionType(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Inventory Transaction</button>
        </form>
    );
}

export default FormAdd;
