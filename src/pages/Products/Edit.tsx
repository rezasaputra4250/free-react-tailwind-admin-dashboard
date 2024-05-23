// edit.tsximport React from 'react';
import React from 'react';
import FormEditProducts from '../../components/Products/formEditProducts';

const EditProductPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <FormEditProducts />
      </div>
    </div>
  );
};

export default EditProductPage;