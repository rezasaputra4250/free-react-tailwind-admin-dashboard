import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Detail() {
    const { id } = useParams(); // Dapatkan parameter id dari URL
    const [orderDetail, setOrderDetail] = useState([]);

    useEffect(() => {
        // Ambil data detail pesanan berdasarkan ID ketika komponen dimuat
        axios.get(`http://localhost:5000/ordersdetails/${id}`)
            .then(response => {
                // Set data detail pesanan ke state orderDetail
                setOrderDetail(response.data);
            })
            .catch(error => console.error('Error fetching order detail:', error));
    }, [id]); // Gunakan id sebagai dependensi

    if (orderDetail.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Order Detail</h2>
            <table className="min-w-full bg-white shadow-md rounded my-6">
                <thead className="text-center bg-gray-200">
                    <tr>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Order Detail ID</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Order ID</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Product ID</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Quantity</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Price</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {orderDetail.map((detail, index) => (
                        <tr key={index}>
                            <td className="text-left py-3 px-4">{detail.orderDetailId}</td>
                            <td className="text-left py-3 px-4">{detail.orderId}</td>
                            <td className="text-left py-3 px-4">{detail.productId}</td>
                            <td className="text-left py-3 px-4">{detail.quantity}</td>
                            <td className="text-left py-3 px-4">${detail.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Detail;
