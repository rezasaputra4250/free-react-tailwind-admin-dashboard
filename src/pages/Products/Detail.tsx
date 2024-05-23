import React from 'react';
import ProductsDetail from '../../components/Products/productsDetail';

const DetailProductPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <ProductsDetail />
      </div>
    </div>
  );
};

export default DetailProductPage;
