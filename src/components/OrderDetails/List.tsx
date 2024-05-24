import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaPlus, FaPrint, FaFilePdf, FaFileExcel, FaSearch, FaEye, FaPencilAlt, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

function List() {
    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/ordersdetails/')
            .then(response => setOrderDetails(response.data))
            .catch(error => console.error('Error fetching order details:', error));
    }, []);

    const handleDelete = (orderDetailId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this order detail data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/ordersdetails/${orderDetailId}`)
                    .then(() => {
                        setOrderDetails(orderDetails.filter(detail => detail.orderDetailId !== orderDetailId));
                        Swal.fire('Deleted!', 'Your order detail has been deleted.', 'success');
                    })
                    .catch(error => console.error('Error deleting order detail:', error));
            }
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold h1">Daftar Pesanan</h2>
                <div className="flex items-center">
                    <Link to="/orderDetails/add" className="flex items-center p-2 text-gray-700 hover:bg-gray-300 rounded-full transition-all size-max">
                        <FaPlus />
                    </Link>
                </div>
            </div>
            <div className="flex justify-between items-center mb-4">
                <div className="flex item-center">
                    <div className="m-2">
                        <button className="p-2 text-gray-700 hover:bg-gray-300 rounded-full transition-all size-max">
                            <FaPrint />
                            <span className="sr-only">Print</span>
                        </button>
                    </div>
                    <div className="m-2">
                        <button className="p-2 text-gray-700 hover:bg-gray-300 rounded-full transition-all size-max">
                            <FaFilePdf />
                            <span className="sr-only">Export to PDF</span>
                        </button>
                    </div>
                    <div className="m-2">
                        <button className="p-2 text-gray-700 hover:bg-gray-300 rounded-full transition-all size-max">
                            <FaFileExcel />
                            <span className="sr-only">Export to Excel</span>
                        </button>
                    </div>
                </div>
                <div className='flex items-center '>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-2 py-1 border border-gray-300 rounded-full transition-all size-max mr-2"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="p-2 text-gray-700 hover:bg-gray-300 rounded-full transition-all size-max">
                        <FaSearch />
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div >
            <table className="min-w-full bg-white shadow-md rounded my-6">
                <thead className="text-center bg-gray-200">
                    <tr>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Order Detail ID</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Order ID</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Product ID</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Quantity</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Price</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {orderDetails.map((detail, index) => (
                        <tr key={index}>
                            <td className="text-left py-3 px-4">{detail.orderDetailId}</td>
                            <td className="text-left py-3 px-4">{detail.orderId}</td>
                            <td className="text-left py-3 px-4">{detail.productId}</td>
                            <td className="text-left py-3 px-4">{detail.quantity}</td>
                            <td className="text-left py-3 px-4">{detail.price}</td>
                            <td className="flex text-center py-3 px-4">
                                <Link to={`/order-details/edit/${detail.orderDetailId}`} className="p-2 rounded-full text-gray-700 hover:bg-gray-300">
                                    <FaPencilAlt />
                                </Link>
                                <button onClick={() => handleDelete(detail.orderDetailId)} className="p-2 rounded-full text-gray-700 hover:bg-gray-300">
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
