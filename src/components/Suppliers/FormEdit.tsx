import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function FormEdit({ supplierId }) {
    const [supplierName, setSupplierName] = useState('');
    const [supplierEmail, setSupplierEmail] = useState('');
    const [supplierPhone, setSupplierPhone] = useState('');

    useEffect(() => {
        // Mengambil data pemasok yang akan diedit dari server
        const fetchSupplier = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/suppliers/${supplierId}`);
                const { supplierName, supplierEmail, supplierPhone } = response.data;
                setSupplierName(supplierName);
                setSupplierEmail(supplierEmail);
                setSupplierPhone(supplierPhone);
            } catch (error) {
                console.error('Error fetching supplier:', error);
            }
        };

        fetchSupplier();
    }, [supplierId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Kirim data terbaru ke server dengan axios untuk diedit
            await axios.put(`http://localhost:5000/suppliers/${supplierId}`, { supplierName, supplierEmail, supplierPhone });
            // Menampilkan notifikasi
            toast.success('Supplier updated successfully', { position: toast.POSITION.TOP_CENTER });
            // Redirect ke halaman supplier setelah berhasil mengedit pemasok
            window.location.href = '/suppliers';
        } catch (error) {
            console.error('Error updating supplier:', error);
            toast.error('Failed to update supplier', { position: toast.POSITION.TOP_CENTER });
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
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update Supplier</button>
        </form>
    );
}

export default FormEdit;
