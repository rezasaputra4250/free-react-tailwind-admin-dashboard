import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiEye, FiEdit, FiTrash2, FiSearch, FiPrinter, FiFileText, FiFile } from 'react-icons/fi';
import axios from 'axios';

interface Product {
  productId: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  productStock: number;
}

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(10);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Handle pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleDelete = async (productId: number) => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`);
      // If deletion successful, update product list by removing the deleted product
      setProducts(products.filter(product => product.productId !== productId));
      console.log('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  const HeaderSection = () => (
    <div className="row flex justify-between mb-3">
      <div className="col-end-12">
        <h2 className="text-2xl font-bold">Daftar Products</h2>
      </div>
      <div className='flex items-center'>
        <Link to="/products/add" className="text-blue-500 p-2 hover:bg-blue-100 rounded-full font-bold ">
          <FiPlus className='size-max' />
        </Link>
      </div>
    </div>
  );

  // Membuat komponen untuk bagian tombol aksi
  const ActionButtons = () => (
    <div className="row flex justify-between mb-3">
      <div className="col-end-12">
        <div className="flex items-center">
          <button className="text-blue-500 p-2 hover:bg-blue-100 rounded-full transition-all">
            <FiPlus className="size-max" />
          </button>
          <button className="text-yellow-500 p-2 hover:bg-yellow-100 rounded-full transition-all">
            <FiEdit className="size-max" />
          </button>
          <button className="text-red-500 p-2 hover:bg-red-100 rounded-full transition-all">
            <FiTrash2 className="size-max" />
          </button>
          <button className="text-green-500 p-2 hover:bg-green-100 rounded-full transition-all">
            <FiPrinter className="size-max" />
          </button>
          <button className="text-purple-500 p-2 hover:bg-purple-100 rounded-full transition-all">
            <FiFileText className="size-max" />
          </button>
          <button className="text-yellow-500 p-2 hover:bg-yellow-100 rounded-full transition-all">
            <FiFile className="size-max" />
          </button>
        </div>

      </div>
      <div className="flex items-center">
        <div className="flex border p-1 rounded-md">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-none focus:outline-none"
          />
          <button className="text-blue-500 p-2 hover:bg-blue-100 rounded-full font-bold -l-none">
            <FiSearch className="size-max" />
          </button>
        </div>
      </div>
    </div>
  );

  // ... Bagian tabel dan pagination tetap sama ...

  return (
    <div>
      <HeaderSection />
      <ActionButtons />
      <table className="w-full border border-collapse border-black text-white rounded-md overflow-hidden">
        <thead className="bg-zinc-600">
          <tr>
            <th className="border p-1">#</th>
            <th className="border p-1">Name</th>
            <th className="border p-1">Description</th>
            <th className="border p-1">Price</th>
            <th className="border p-1">Stock</th>
            <th className="border p-1">Actions</th>
          </tr>
        </thead>
        <tbody className='bg-zinc-200 text-black'>
          {currentProducts.map((product) => (
            <tr key={product.productId} className="transition-all hover:bg-gray-50">
              <td className="border p-1 text-center">
                <input type="checkbox" className="mr-2" />
              </td>
              <td className="border p-1">{product.productName}</td>
              <td className="border p-1">{product.productDescription}</td>
              <td className="border p-1">{product.productPrice}</td>
              <td className="border p-1">{product.productStock}</td>
              <td className="border p-1">
                <div className="flex justify-center gap-2">
                  <Link to={`/products/detail/${product.productId}`} className="text-blue-500  p-2 hover:bg-blue-100 transition-all rounded-full">
                    <FiEye />
                  </Link>
                  <Link to={`/products/edit/${product.productId}`} className="text-green-500  p-2 hover:bg-green-100 transition-all rounded-full">
                    <FiEdit />
                  </Link>
                  <button onClick={() => handleDelete(product.productId)} className="text-red-500  p-2 hover:bg-red-100 transition-all rounded-full">
                    <FiTrash2 />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mr-2 px-4 py-2 border rounded-md ${currentPage === i + 1 ? 'text-blue-500 bg- ' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-700'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );

};

export default ProductsList;
