import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditProduct = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState<number>(0);
  const [productStock, setProductStock] = useState<number>(0);
  const [msg, setMsg] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching product details from server...");
    const getProductById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${id}`
        );
        setProductName(response.data.productName);
        setProductDescription(response.data.productDescription);
        setProductPrice(response.data.productPrice);
        setProductStock(response.data.productStock);
        console.log("Product details fetched successfully:", response.data);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
          console.error("Error fetching product details:", error.response.data);
        }
      }
    };
    getProductById();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting product update form...");
    try {
      await axios.patch(`http://localhost:5000/products/${id}`, {
        productName: productName,
        productDescription: productDescription,
        productPrice: productPrice,
        productStock: productStock
      });
      console.log("Product updated successfully!");
      navigate("/products");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        console.error("Error updating product:", error.response.data);
      }
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      {msg && <p className="text-red-500">{msg}</p>}
      <div className="mb-4">
        <label htmlFor="productName" className="block text-gray-700 text-sm font-bold mb-2">Product Name:</label>
        <input type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="productDescription" className="block text-gray-700 text-sm font-bold mb-2">Product Description:</label>
        <input type="text" id="productDescription" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="productPrice" className="block text-gray-700 text-sm font-bold mb-2">Product Price:</label>
        <input type="number" id="productPrice" value={productPrice} onChange={(e) => setProductPrice(parseFloat(e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="productStock" className="block text-gray-700 text-sm font-bold mb-2">Product Stock:</label>
        <input type="number" id="productStock" value={productStock} onChange={(e) => setProductStock(parseFloat(e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="flex items-center justify-between">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update Product</button>
      </div>
    </form>
  );
};

export default FormEditProduct;
