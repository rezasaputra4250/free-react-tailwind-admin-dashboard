import React from 'react';
import axios from 'axios';

interface DeleteProductProps {
  productId: number; // Properti productId untuk mengidentifikasi produk yang akan dihapus
  onSuccess: () => void; // Fungsi callback yang akan dipanggil jika penghapusan berhasil
  onError: (error: any) => void; // Fungsi callback yang akan dipanggil jika terjadi kesalahan saat penghapusan
}

const DeleteProduct: React.FC<DeleteProductProps> = ({ productId, onSuccess, onError }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`);
      onSuccess(); // Panggil fungsi callback onSuccess jika penghapusan berhasil
    } catch (error) {
      onError(error); // Panggil fungsi callback onError dan kirimkan error jika terjadi kesalahan saat penghapusan
    }
  };

  return (
    <div>
      <h2>Delete Product</h2>
      <button onClick={handleDelete}>Delete Product</button>
    </div>
  );
};

export default DeleteProduct;
