import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function FormEdit({ roleId }) {
    const [roleData, setRoleData] = useState({
        roleName: ''
    });

    useEffect(() => {
        const fetchRoleData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/roles/${roleId}`);
                const { roleName } = response.data;
                setRoleData({ roleName });
            } catch (error) {
                console.error('Error fetching role data:', error);
            }
        };

        fetchRoleData();
    }, [roleId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoleData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/roles/${roleId}`, roleData);
            toast.success('Role updated successfully', { position: toast.POSITION.TOP_CENTER });
            // Redirect or any other action after successful update
        } catch (error) {
            console.error('Error updating role:', error);
            toast.error('Failed to update role', { position: toast.POSITION.TOP_CENTER });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="roleName" className="block text-gray-700 font-bold mb-2">Role Name:</label>
                <input type="text" id="roleName" name="roleName" value={roleData.roleName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update Role</button>
        </form>
    );
}

export default FormEdit;
