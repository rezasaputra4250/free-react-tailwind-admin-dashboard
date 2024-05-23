import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

function Delete() {
    const { id } = useParams(); // Mengambil parameter id dari URL
    const history = useHistory(); // Mengakses objek history untuk melakukan navigasi

    const handleDelete = () => {
        // Menghapus data pelanggan berdasarkan ID
        axios.delete(`http://localhost:5000/customers/${id}`)
            .then(() => {
                // Jika berhasil, redirect ke halaman list pelanggan
                history.push('/customers');
            })
            .catch(error => console.error('Error deleting customer:', error));
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Delete Customer</h2>
            <p>Are you sure you want to delete this customer?</p>
            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4">Delete</button>
        </div>
    );
}

export default Delete;
