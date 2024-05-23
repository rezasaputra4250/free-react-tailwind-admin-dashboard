import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function FormEdit() {
    const { id } = useParams(); // Mengambil parameter id dari URL
    const [formData, setFormData] = useState({
        customerName: '',
        customerEmail: '',
        customerPhone: ''
    });

    useEffect(() => {
        // Mengambil data pelanggan berdasarkan ID saat komponen dimount
        axios.get(`http://localhost:5000/customers/${id}`)
            .then(response => {
                // Set data pelanggan ke state formData
                setFormData(response.data);
            })
            .catch(error => console.error('Error fetching customer:', error));
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
            // Kirim data yang diubah ke server dengan axios
            await axios.put(`http://localhost:5000/customers/${id}`, formData);
            alert('Pelanggan berhasil diperbarui!');
            // Redirect ke halaman daftar pelanggan setelah berhasil memperbarui
            window.location.href = '/customers';
        } catch (error) {
            console.error('Error updating customer:', error);
            alert('Gagal memperbarui pelanggan.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="customerName" className="block text-gray-700 font-bold mb-2">Name:</label>
                <input type="text" id="customerName" name="customerName" value={formData.customerName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-4">
                <label htmlFor="customerEmail" className="block text-gray-700 font-bold mb-2">Email:</label>
                <input type="email" id="customerEmail" name="customerEmail" value={formData.customerEmail} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-6">
                <label htmlFor="customerPhone" className="block text-gray-700 font-bold mb-2">Phone:</label>
                <input type="tel" id="customerPhone" name="customerPhone" value={formData.customerPhone} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update Customer</button>
        </form>
    );
}

export default FormEdit;
