import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function FormAdd() {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        roleId: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Kirim data ke server dengan axios
            await axios.post('http://localhost:5000/users', userData);
            // Menampilkan notifikasi
            toast.success('User added successfully', { position: toast.POSITION.TOP_CENTER });
            // Redirect ke halaman pengguna setelah berhasil menambahkan pengguna
            window.location.href = '/users';
        } catch (error) {
            console.error('Error adding user:', error);
            toast.error('Failed to add user', { position: toast.POSITION.TOP_CENTER });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
                <input type="text" id="name" name="name" value={userData.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
                <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password:</label>
                <input type="password" id="password" name="password" value={userData.password} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-6">
                <label htmlFor="roleId" className="block text-gray-700 font-bold mb-2">Role ID:</label>
                <input type="text" id="roleId" name="roleId" value={userData.roleId} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add User</button>
        </form>
    );
}

export default FormAdd;
