import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      window.location.href = '/dashboard';
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      });
      console.log('Login berhasil:', response.data);

      sessionStorage.setItem('isLoggedIn', 'true');
      window.location.href = '/dashboard';
      fetchUserData();
    } catch (error) {
      console.error('Terjadi kesalahan saat login:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Login gagal. Mohon periksa kembali email dan password Anda.'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/me', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      });
      console.log('Data pengguna:', response.data);
    } catch (error) {
      console.error('Gagal mengambil data pengguna:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Login</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">Email</label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-800 font-semibold mb-2">Password</label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          disabled={loading}
        >
          {loading ? 'Sedang Login...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
