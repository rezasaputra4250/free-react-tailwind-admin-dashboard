// edit.tsx
import React from 'react';
import ListOfProducts from '../../components/Products/productsList'; // Mengganti nama komponen yang diimpor

const ProductsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <ListOfProducts /> {/* Menggunakan nama yang sudah diperbaiki */}
      </div>
    </div>
  );
};

export default ProductsPage; // Mengubah nama ekspor menjadi ProductsListPage
