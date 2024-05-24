import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function FormAdd() {
    const [supplierId, setSupplierId] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [totalAmount, setTotalAmount] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Kirim data ke server menggunakan axios
            await axios.post('http://localhost:5000/purchases', { supplierId, purchaseDate, totalAmount });
            // Tampilkan notifikasi
            toast.success('Purchase added successfully', { position: toast.POSITION.TOP_CENTER });
            // Redirect ke halaman pembelian setelah berhasil menambahkan produk
            window.location.href = '/purchases';
        } catch (error) {
            console.error('Error adding purchase:', error);
            toast.error('Failed to add purchase', { position: toast.POSITION.TOP_CENTER });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="supplierId" className="block text-gray-700 font-bold mb-2">Supplier ID:</label>
                <input type="text" id="supplierId" name="supplierId" value={supplierId} onChange={(e) => setSupplierId(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-4">
                <label htmlFor="purchaseDate" className="block text-gray-700 font-bold mb-2">Purchase Date:</label>
                <input type="date" id="purchaseDate" name="purchaseDate" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-6">
                <label htmlFor="totalAmount" className="block text-gray-700 font-bold mb-2">Total Amount:</label>
                <input type="number" id="totalAmount" name="totalAmount" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Purchase</button>
        </form>
    );
}

export default FormAdd;
