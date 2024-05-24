import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function FormAdd() {
    const [supplierName, setSupplierName] = useState('');
    const [supplierEmail, setSupplierEmail] = useState('');
    const [supplierPhone, setSupplierPhone] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Kirim data ke server dengan axios
            await axios.post('http://localhost:5000/suppliers', { supplierName, supplierEmail, supplierPhone });
            // Menampilkan notifikasi
            toast.success('Supplier added successfully', { position: toast.POSITION.TOP_CENTER });
            // Redirect ke halaman supplier setelah berhasil menambahkan pemasok
            window.location.href = '/suppliers';
        } catch (error) {
            console.error('Error adding supplier:', error);
            toast.error('Failed to add supplier', { position: toast.POSITION.TOP_CENTER });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="supplierName" className="block text-gray-700 font-bold mb-2">Name:</label>
                <input type="text" id="supplierName" name="supplierName" value={supplierName} onChange={(e) => setSupplierName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-4">
                <label htmlFor="supplierEmail" className="block text-gray-700 font-bold mb-2">Email:</label>
                <input type="email" id="supplierEmail" name="supplierEmail" value={supplierEmail} onChange={(e) => setSupplierEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-6">
                <label htmlFor="supplierPhone" className="block text-gray-700 font-bold mb-2">Phone:</label>
                <input type="tel" id="supplierPhone" name="supplierPhone" value={supplierPhone} onChange={(e) => setSupplierPhone(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Supplier</button>
        </form>
    );
}

export default FormAdd;
