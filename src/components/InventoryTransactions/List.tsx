import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

function List() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/inventory-transactions/')
            .then(response => setTransactions(response.data))
            .catch(error => console.error('Error fetching inventory transactions:', error));
    }, []);

    const handleDelete = (transactionId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this inventory transaction data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/inventory-transactions/${transactionId}`)
                    .then(() => {
                        setTransactions(transactions.filter(transaction => transaction.transactionId !== transactionId));
                        Swal.fire('Deleted!', 'Your inventory transaction has been deleted.', 'success');
                    })
                    .catch(error => console.error('Error deleting inventory transaction:', error));
            }
        });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Inventory Transaction List</h2>
            <table className="min-w-full bg-white shadow-md rounded my-6">
                <thead className="text-center bg-gray-200">
                    <tr>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Transaction ID</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Product ID</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Transaction Date</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Quantity</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Transaction Type</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td className="text-left py-3 px-4">{transaction.transactionId}</td>
                            <td className="text-left py-3 px-4">{transaction.productId}</td>
                            <td className="text-left py-3 px-4">{transaction.transactionDate}</td>
                            <td className="text-left py-3 px-4">{transaction.quantity}</td>
                            <td className="text-left py-3 px-4">{transaction.transactionType}</td>
                            <td className="flex text-center py-3 px-4">
                                <Link to={`/inventory-transactions/edit/${transaction.transactionId}`} className="p-2 rounded-full text-gray-700 hover:bg-gray-300">
                                    <FaPencilAlt />
                                </Link>
                                <button onClick={() => handleDelete(transaction.transactionId)} className="p-2 rounded-full text-gray-700 hover:bg-gray-300">
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default List;
