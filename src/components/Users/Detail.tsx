import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RoleDetail() {
    const { id } = useParams(); // Mengambil parameter id dari URL
    const [role, setRole] = useState(null);

    useEffect(() => {
        // Mengambil data peran berdasarkan ID saat komponen dimount
        axios.get(`http://localhost:5000/roles/${id}`)
            .then(response => {
                // Set data peran ke state role
                setRole(response.data);
            })
            .catch(error => console.error('Error fetching role:', error));
    }, [id]); // Gunakan id sebagai dependency

    if (!role) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Role Detail</h2>
            <div className="mb-4">
                <p><strong>Role Name:</strong> {role.roleName}</p>
            </div>
        </div>
    );
}

export default RoleDetail;
