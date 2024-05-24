import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function FormAdd() {
    const [customerId, setCustomerId] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [customerOptions, setCustomerOptions] = useState([]);

    useEffect(() => {
        // Fetch customers from the server
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/customers');
                setCustomerOptions(response.data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        fetchCustomers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Kirim data ke server menggunakan axios
            await axios.post('http://localhost:5000/orders', { customerId, orderDate, totalAmount });
            // Tampilkan notifikasi
            toast.success('Order added successfully', { position: toast.POSITION.TOP_CENTER });
            // Redirect ke halaman orders setelah berhasil menambahkan order
            window.location.href = '/orders';
        } catch (error) {
            console.error('Error adding order:', error);
            toast.error('Failed to add order', { position: toast.POSITION.TOP_CENTER });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="customerId" className="block text-gray-700 font-bold mb-2">Customer ID:</label>
                <select
                    id="customerId"
                    name="customerId"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                >
                    <option value="">Select Customer</option>
                    {customerOptions.map((customer) => (
                        <option key={customer.customerId} value={customer.customerId}>{`${customer.customerName} (${customer.customerPhone})`}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="orderDate" className="block text-gray-700 font-bold mb-2">Order Date:</label>
                <input
                    type="date"
                    id="orderDate"
                    name="orderDate"
                    value={orderDate}
                    onChange={(e) => setOrderDate(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="totalAmount" className="block text-gray-700 font-bold mb-2">Total Amount:</label>
                <input
                    type="number"
                    id="totalAmount"
                    name="totalAmount"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Order</button>
        </form>
    );
}

export default FormAdd;
