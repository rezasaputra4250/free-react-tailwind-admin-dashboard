import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function FormAdd() {
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Kirim data ke server dengan axios
            await axios.post('http://localhost:5000/customers', { customerName, customerEmail, customerPhone });
            // Menampilkan notifikasi
            toast.success('Customer added successfully', { position: toast.POSITION.TOP_CENTER });
            // Redirect ke halaman customer setelah berhasil menambahkan pelanggan
            window.location.href = '/customers';
        } catch (error) {
            console.error('Error adding customer:', error);
            toast.error('Failed to add customer', { position: toast.POSITION.TOP_CENTER });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="customerName" className="block text-gray-700 font-bold mb-2">Name:</label>
                <input type="text" id="customerName" name="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-4">
                <label htmlFor="customerEmail" className="block text-gray-700 font-bold mb-2">Email:</label>
                <input type="email" id="customerEmail" name="customerEmail" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-6">
                <label htmlFor="customerPhone" className="block text-gray-700 font-bold mb-2">Phone:</label>
                <input type="tel" id="customerPhone" name="customerPhone" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Customer</button>
        </form>
    );
}

export default FormAdd;
