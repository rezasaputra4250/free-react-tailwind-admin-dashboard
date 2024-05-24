import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Detail() {
    const { id } = useParams(); // Get the id parameter from the URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Fetch product data based on ID when the component mounts
        axios.get(`http://localhost:5000/products/${id}`)
            .then(response => {
                // Set product data to the product state
                setProduct(response.data);
            })
            .catch(error => console.error('Error fetching product:', error));
    }, [id]); // Use id as a dependency

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Product Detail</h2>
            <div className="mb-4">
                <p><strong>Name:</strong> {product.productName}</p>
                <p><strong>Description:</strong> {product.productDescription}</p>
                <p><strong>Price:</strong> ${product.productPrice}</p>
                <p><strong>Stock:</strong> {product.productStock}</p>
            </div>
        </div>
    );
}

export default Detail;
