import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Detail() {
    const { id } = useParams(); // Mengambil parameter id dari URL
    const [supplier, setSupplier] = useState(null);

    useEffect(() => {
        // Mengambil data pemasok berdasarkan ID saat komponen dimount
        axios.get(`http://localhost:5000/suppliers/${id}`)
            .then(response => {
                // Set data pemasok ke state supplier
                setSupplier(response.data);
            })
            .catch(error => console.error('Error fetching supplier:', error));
    }, [id]); // Gunakan id sebagai dependency

    if (!supplier) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Supplier Detail</h2>
            <div className="mb-4">
                <p><strong>Name:</strong> {supplier.supplierName}</p>
                <p><strong>Email:</strong> {supplier.supplierEmail}</p>
                <p><strong>Phone:</strong> {supplier.supplierPhone}</p>
            </div>
        </div>
    );
}

export default Detail;
