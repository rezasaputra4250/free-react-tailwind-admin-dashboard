import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Detail() {
    const { id } = useParams(); // Mengambil parameter id dari URL
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        // Mengambil data pelanggan berdasarkan ID saat komponen dimount
        axios.get(`http://localhost:5000/customers/${id}`)
            .then(response => {
                // Set data pelanggan ke state customer
                setCustomer(response.data);
            })
            .catch(error => console.error('Error fetching customer:', error));
    }, [id]); // Gunakan id sebagai dependency

    if (!customer) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Customer Detail</h2>
            <div className="mb-4">
                <p><strong>Name:</strong> {customer.customerName}</p>
                <p><strong>Email:</strong> {customer.customerEmail}</p>
                <p><strong>Phone:</strong> {customer.customerPhone}</p>
            </div>
        </div>
    );
}

export default Detail;
