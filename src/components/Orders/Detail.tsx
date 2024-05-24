import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function OrderDetail() {
    const { id } = useParams(); // Dapatkan parameter id dari URL
    const [order, setOrder] = useState(null);

    useEffect(() => {
        // Ambil data pesanan berdasarkan ID ketika komponen dimuat
        axios.get(`http://localhost:5000/ordersdetails/${id}`)
            .then(response => {
                // Set data pesanan ke state order
                setOrder(response.data);
            })
            .catch(error => console.error('Error fetching order:', error));
    }, [id]); // Gunakan id sebagai dependensi

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Order Detail</h2>
            <div className="mb-4">
                <p><strong>Customer ID:</strong> {order.customerId}</p>
                <p><strong>Order Date:</strong> {order.orderDate}</p>
                <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
            </div>
        </div>
    );
}

export default OrderDetail;
