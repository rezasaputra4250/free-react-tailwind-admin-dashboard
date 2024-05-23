import React from 'react';
import FormAddProducts from '../../components/Products/formAddProducts';

const AddProductPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <FormAddProducts />
      </div>
    </div>
  );
};

export default AddProductPage;
