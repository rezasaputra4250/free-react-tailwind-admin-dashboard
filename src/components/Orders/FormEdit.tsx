import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function FormEdit() {
    const { id } = useParams(); // Get the id parameter from the URL
    const [formData, setFormData] = useState({
        customerId: '',
        orderDate: '',
        totalAmount: ''
    });
    const [customerOptions, setCustomerOptions] = useState([]);

    useEffect(() => {
        // Fetch order data based on ID when the component mounts
        axios.get(`http://localhost:5000/orders/${id}`)
            .then(response => {
                // Set order data to the formData state
                setFormData(response.data);
            })
            .catch(error => console.error('Error fetching order:', error));

        // Fetch customers from the server
        axios.get('http://localhost:5000/customers')
            .then(response => {
                // Set customer options for select dropdown
                setCustomerOptions(response.data);
            })
            .catch(error => console.error('Error fetching customers:', error));
    }, [id]);

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
            // Send the edited data to the server using axios
            await axios.patch(`http://localhost:5000/orders/${id}`, formData);
            alert('Order updated successfully!');
            // Redirect to the orders page after successfully updating
            window.location.href = '/orders';
        } catch (error) {
            console.error('Error updating order:', error);
            alert('Failed to update order.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="customerId" className="block text-gray-700 font-bold mb-2">Customer ID:</label>
                <select
                    id="customerId"
                    name="customerId"
                    value={formData.customerId}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                >
                    <option value="">Select Customer</option>
                    {customerOptions.map(customer => (
                        <option key={customer.customerId} value={customer.customerId}>{customer.customerName} ({customer.customerPhone})</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="orderDate" className="block text-gray-700 font-bold mb-2">Order Date:</label>
                <input type="date" id="orderDate" name="orderDate" value={formData.orderDate} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-6">
                <label htmlFor="totalAmount" className="block text-gray-700 font-bold mb-2">Total Amount:</label>
                <input type="number" id="totalAmount" name="totalAmount" value={formData.totalAmount} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update Order</button>
        </form>
    );
}

export default FormEdit;
