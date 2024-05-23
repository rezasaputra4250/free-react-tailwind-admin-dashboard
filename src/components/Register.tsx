import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [roleId, setRoleId] = useState<number>(2); // Biarkan roleId tetap
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Cek status login saat komponen dimuat
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      // Jika pengguna sudah login, arahkan langsung ke halaman dashboard
      window.location.href = '/dashboard';
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/register', {
        name,
        email,
        password,
        roleId
      });
      console.log('Registrasi berhasil:', response.data);

      // Arahkan pengguna ke halaman login setelah berhasil mendaftar
      window.location.href = '/login';
    } catch (error) {
      setError('Registrasi gagal. Mohon periksa kembali data yang Anda masukkan.');
      console.error('Terjadi kesalahan saat registrasi:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Register</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-800 font-semibold mb-2">Name</label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div className="mb-4">
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
          className={`w-full px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Sedang Registrasi...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
