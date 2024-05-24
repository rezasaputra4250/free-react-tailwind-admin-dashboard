import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { FaPlus, FaPrint, FaFilePdf, FaFileExcel, FaSearch, FaEye, FaPencilAlt, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function List() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/users/')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const filteredUsers = users.filter(user => {
        return (
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const pageNumbers = Math.ceil(filteredUsers.length / usersPerPage);
    const showPagination = pageNumbers > 1;

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this user data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/users/${id}`)
                    .then(() => {
                        // Filter out the deleted user from the list
                        setUsers(users.filter(user => user.id !== id));
                        Swal.fire('Deleted!', 'The user has been deleted.', 'success');
                    })
                    .catch(error => console.error('Error deleting user:', error));
            }
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold h1">Daftar Pengguna</h2>
                <div className="flex items-center">
                    <Link to="/users/add" className="flex items-center p-2 text-gray-700 hover:bg-gray-300 rounded-full transition-all size-max">
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
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Name</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Email</th>
                        <th className="py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {currentUsers.map((user, index) => (
                        <tr key={index}>
                            <td className="text-left py-3 px-4">{user.name}</td>
                            <td className="text-left py-3 px-4">{user.email}</td>
                            <td className="flex text-center py-3 px-4">
                                <Fragment>
                                    <Link to={`/users/detail/${user.uuid}`} className="p-2 rounded-full text-gray-700 hover:bg-gray-300">
                                        <FaEye />
                                    </Link>
                                    <Link to={`/users/edit/${user.uuid}`} className="p-2 rounded-full text-gray-700 hover:bg-gray-300">
                                        <FaPencilAlt />
                                    </Link>
                                    <button onClick={() => handleDelete(user.uuid)} className="p-2 rounded-full text-gray-700 hover:bg-gray-300">
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
                                        className={`relative block py-2 px-3 ml-0 mr-2 leading-tight bg-gray border border-gray-300 text-gray-700 hover:bg-gray-200 ${currentPage === index + 1 ? 'font-semibold' : ''}`}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )
            }
        </div>
    );
}

export default List;
