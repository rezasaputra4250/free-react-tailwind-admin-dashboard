import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../BackButton';

const ProductsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<{
    productId: number;
    productName: string;
    productDescription: string;
    productPrice: number;
    productStock: number;
  }>({
    productId: 0,
    productName: '',
    productDescription: '',
    productPrice: 0,
    productStock: 0,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4"> {/* Flex container with items centered and space between */}
        <h3 className="text-lg font-semibold">Product Details</h3>
        <BackButton /> 
      </div>
      <div className="border rounded p-4">
        <p className="font-semibold">Product Name:</p>
        <p className="mb-2">{product.productName}</p>
        <p className="font-semibold">Description:</p>
        <p className="mb-2">{product.productDescription}</p>
        <p className="font-semibold">Price:</p>
        <p className="mb-2">{product.productPrice}</p>
        <p className="font-semibold">Stock:</p>
        <p className="mb-2">{product.productStock}</p>
      </div>
    </div>
  );
};

export default ProductsDetail;
