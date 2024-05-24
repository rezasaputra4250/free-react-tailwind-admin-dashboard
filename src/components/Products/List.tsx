import React, { useEffect, useState, Fragment } from 'react';
import { FaPlus, FaEye, FaPencilAlt, FaTrash, FaPrint, FaFilePdf, FaFileExcel, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function List() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/products/')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, [isSuccess]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const filteredProducts = products.filter(product => {
        return (
            product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.productDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.productPrice.toString().includes(searchTerm.toLowerCase()) ||
            product.productStock.toString().includes(searchTerm.toLowerCase())
        );
    });
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const pageNumbers = Math.ceil(filteredProducts.length / productsPerPage);
    const showPagination = pageNumbers > 1;

    useEffect(() => {
        if (isSuccess) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Product added successfully',
                confirmButtonText: 'OK'
            });
            setIsSuccess(false);
        }
    }, [isSuccess]);

    const handleDelete = (productId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this product data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/products/${productId}`)
                    .then(() => {
                        setIsSuccess(true);
                    })
                    .catch(error => console.error('Error deleting product:', error));
            }
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold h1">Daftar Produk</h2>
                <div className="flex items-center">
                    <Link to="/products/add" className="flex items-center p-2 text-gray-700 hover:bg-gray-300 rounded-full transition-all size-max">
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
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Select</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Name</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Description</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Price</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Stock</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {currentProducts.map((product, index) => (
                        <tr key={index}>
                            <td className="text-center py-3 px-4">
                                <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
                            </td>
                            <td className="text-left py-3 px-4">{product.productName}</td>
                            <td className="text-left py-3 px-4">{product.productDescription}</td>
                            <td className="text-left py-3 px-4">{product.productPrice}</td>
                            <td className="text-left py-3 px-4">{product.productStock}</td>
                            <td className="flex text-center py-3 px-4">
                                <Fragment>
                                    <Link to={`/products/detail/${product.productId}`} className="p-2 rounded-full text-gray-700 hover:bg-gray-300">
                                        <FaEye />
                                    </Link>
                                    <Link to={`/products/edit/${product.productId}`} className="p-2 rounded-full text-gray-700 hover:bg-gray-300">
                                        <FaPencilAlt />
                                    </Link>
                                    <button onClick={() => handleDelete(product.productId)} className="p-2 rounded-full text-gray-700 hover:bg-gray-300">
                                        <FaTrash />
                                    </button>
                                </Fragment>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination */}
            {
                showPagination && (
                    <nav className="block">
                        <ul className="flex pl-0 rounded-full transition-all size-max list-none flex-wrap">
                            {Array.from({ length: pageNumbers }, (_, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => paginate(index + 1)}
                                        className={`relative block py-2 px-3ml-0 mr-2 leading-tight bg-gray border border-gray-300 text-gray-700 hover:bg-gray-200 ${currentPage === index + 1 ? 'font-semibold' : ''}`}>
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )
            }
        </div >
    );
}

export default List;
