import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Detail() {
    const { id } = useParams(); // Dapatkan parameter id dari URL
    const [inventoryTransaction, setInventoryTransaction] = useState(null);

    useEffect(() => {
        // Ambil data detail transaksi inventaris berdasarkan ID ketika komponen dimuat
        axios.get(`http://localhost:5000/inventory-transactions/${id}`)
            .then(response => {
                // Set data detail transaksi inventaris ke state inventoryTransaction
                setInventoryTransaction(response.data);
            })
            .catch(error => console.error('Error fetching inventory transaction:', error));
    }, [id]); // Gunakan id sebagai dependensi

    if (!inventoryTransaction) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Inventory Transaction Detail</h2>
            <table className="min-w-full bg-white shadow-md rounded my-6">
                <thead className="text-center bg-gray-200">
                    <tr>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Transaction ID</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Product ID</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Transaction Date</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Quantity</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Transaction Type</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    <tr>
                        <td className="text-left py-3 px-4">{inventoryTransaction.transactionId}</td>
                        <td className="text-left py-3 px-4">{inventoryTransaction.productId}</td>
                        <td className="text-left py-3 px-4">{inventoryTransaction.transactionDate}</td>
                        <td className="text-left py-3 px-4">{inventoryTransaction.quantity}</td>
                        <td className="text-left py-3 px-4">{inventoryTransaction.transactionType}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Detail;
