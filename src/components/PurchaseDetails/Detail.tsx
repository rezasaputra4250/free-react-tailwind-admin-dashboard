import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PurchaseDetailDetail() {
    const { id } = useParams(); // Dapatkan parameter id dari URL
    const [purchase, setPurchase] = useState(null);

    useEffect(() => {
        // Ambil data pembelian berdasarkan ID ketika komponen dipasang
        axios.get(`http://localhost:5000/purchases/${id}`)
            .then(response => {
                // Setel data pembelian ke dalam state purchase
                setPurchase(response.data);
            })
            .catch(error => console.error('Error fetching purchase:', error));
    }, [id]); // Gunakan id sebagai dependency

    if (!purchase) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Purchase Detail</h2>
            <div className="mb-4">
                <p><strong>Supplier ID:</strong> {purchase.supplierId}</p>
                <p><strong>Purchase Date:</strong> {purchase.purchaseDate}</p>
                <p><strong>Total Amount:</strong> ${purchase.totalAmount}</p>
            </div>
        </div>
    );
}

export default PurchaseDetailDetail;
