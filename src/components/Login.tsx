import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      });
      console.log('Login berhasil:', response.data);

      // Simpan informasi sesi
      sessionStorage.setItem('isLoggedIn', 'true'); // Anda dapat menggunakan local storage juga jika sesi harus persisten

      // Arahkan pengguna ke halaman dashboard
      window.location.href = '/dashboard'; // Arahkan secara langsung dengan mengubah window.location.href

      // Ambil data pengguna setelah login berhasil
      fetchUserData();
    } catch (error) {
      setError('Login gagal. Mohon periksa kembali email dan password Anda.');
      console.error('Terjadi kesalahan saat login:', error);
      window.location.href = '/login'; // Arahkan pengguna kembali ke halaman login
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/me', {
        // Tambahkan konfigurasi untuk menyertakan token atau informasi sesi yang diperlukan
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` // Misalnya, token diambil dari sessionStorage
        }
      });
      console.log('Data pengguna:', response.data);
      // Lakukan apa pun yang diperlukan dengan data pengguna di sini
    } catch (error) {
      console.error('Gagal mengambil data pengguna:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Login</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
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
          className={`w-full px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
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
