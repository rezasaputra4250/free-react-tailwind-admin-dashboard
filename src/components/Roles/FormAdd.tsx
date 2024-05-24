import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function RoleFormAdd() {
    const [roleData, setRoleData] = useState({
        roleName: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Kirim data ke server dengan axios
            await axios.post('http://localhost:5000/roles', roleData);
            // Menampilkan notifikasi
            toast.success('Role added successfully', { position: toast.POSITION.TOP_CENTER });
            // Redirect ke halaman peran setelah berhasil menambahkan peran
            window.location.href = '/roles';
        } catch (error) {
            console.error('Error adding role:', error);
            toast.error('Failed to add role', { position: toast.POSITION.TOP_CENTER });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoleData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="roleName" className="block text-gray-700 font-bold mb-2">Role Name:</label>
                <input type="text" id="roleName" name="roleName" value={roleData.roleName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Role</button>
        </form>
    );
}

export default RoleFormAdd;
