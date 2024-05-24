import React, { useState, useEffect, Fragment } from 'react';
import { FaEye, FaPencilAlt, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function List() {
    const [purchaseDetails, setPurchaseDetails] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/purchase-details/')
            .then(response => setPurchaseDetails(response.data))
            .catch(error => console.error('Error fetching purchase details:', error));
    }, [isSuccess]);

    useEffect(() => {
        if (isSuccess) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Purchase detail added successfully',
                confirmButtonText: 'OK'
            });
            setIsSuccess(false);
        }
    }, [isSuccess]);

    const handleDelete = (purchaseDetailId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this purchase detail data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/purchase-details/${purchaseDetailId}`)
                    .then(() => {
                        setIsSuccess(true);
                    })
                    .catch(error => console.error('Error deleting purchase detail:', error));
            }
        });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Purchase Detail List</h2>
            <table className="min-w-full bg-white shadow-md rounded my-6">
                <thead className="text-center bg-gray-200">
                    <tr>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Select</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Purchase Detail ID</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Purchase ID</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Product ID</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Quantity</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Price</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {purchaseDetails.map((detail, index) => (
                        <tr key={index}>
                            <td className="text-center py-3 px-4">
                                <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
                            </td>
                            <td className="text-left py-3 px-4">{detail.purchaseDetailId}</td>
                            <td className="text-left py-3 px-4">{detail.purchaseId}</td>
                            <td className="text-left py-3 px-4">{detail.productId}</td>
                            <td className="text-left py-3 px-4">{detail.quantity}</td>
                            <td className="text-left py-3 px-4">{detail.price}</td>
                            <td className="flex text-center py-3 px-4">
                                <Fragment>
                                    <Link to={`/purchase-details/detail/${detail.purchaseDetailId}`} className="p-2 rounded-full text-gray-700 hover:bg-gray-300">
                                        <FaEye />
                                    </Link>
                                    <Link to={`/purchase-details/edit/${detail.purchaseDetailId}`} className="p-2 rounded-full text-gray-700 hover:bg-gray-300">
                                        <FaPencilAlt />
                                    </Link>
                                    <button onClick={() => handleDelete(detail.purchaseDetailId)} className="p-2 rounded-full text-gray-700 hover:bg-gray-300">
                                        <FaTrash />
                                    </button>
                                </Fragment>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
}

export default List;
