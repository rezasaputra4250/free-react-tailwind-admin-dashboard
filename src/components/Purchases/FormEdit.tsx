import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function FormEdit() {
    const { id } = useParams(); // Dapatkan parameter id dari URL
    const [formData, setFormData] = useState({
        supplierId: '',
        purchaseDate: '',
        totalAmount: ''
    });

    useEffect(() => {
        // Ambil data pembelian berdasarkan ID ketika komponen dipasang
        axios.get(`http://localhost:5000/purchases/${id}`)
            .then(response => {
                // Setel data pembelian ke dalam state formData
                setFormData(response.data);
            })
            .catch(error => console.error('Error fetching purchase:', error));
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
            await axios.patch(`http://localhost:5000/purchases/${id}`, formData);
            alert('Purchase updated successfully!');
            // Redirect ke halaman pembelian setelah berhasil memperbarui
            window.location.href = '/purchases';
        } catch (error) {
            console.error('Error updating purchase:', error);
            alert('Failed to update purchase.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="supplierId" className="block text-gray-700 font-bold mb-2">Supplier ID:</label>
                <input type="text" id="supplierId" name="supplierId" value={formData.supplierId} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-4">
                <label htmlFor="purchaseDate" className="block text-gray-700 font-bold mb-2">Purchase Date:</label>
                <input type="date" id="purchaseDate" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-6">
                <label htmlFor="totalAmount" className="block text-gray-700 font-bold mb-2">Total Amount:</label>
                <input type="number" id="totalAmount" name="totalAmount" value={formData.totalAmount} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update Purchase</button>
        </form>
    );
}

export default FormEdit;
