import React, { useEffect } from 'react';
import axios from 'axios';

const Logout: React.FC = () => {
    useEffect(() => {
        const logoutUser = async () => {
            try {
                // Kirim permintaan DELETE ke endpoint logout
                await axios.delete('http://localhost:5000/logout');

                // Clear any user authentication data or tokens
                // For example, if using localStorage:
                localStorage.removeItem('accessToken');

                // Set isLoggedIn to false only if there is an error during logout
                sessionStorage.setItem('isLoggedIn', 'false');

                // Redirect to the login page or any other desired page after logout
                window.location.href = '/login';
            } catch (error) {
                console.error('Error logging out:', error);
                // Handle any errors here
            }
        };

        logoutUser();
    }, []);

    return (
        <div>
            <h1>Logging out...</h1>
            {/* You can add a loading spinner or message here if needed */}
        </div>
    );
};

export default Logout;
