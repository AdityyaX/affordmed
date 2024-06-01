import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductDetails, Product } from '../services/apiservice';

interface RouteParams {
  id: string;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProductDetails(id);
      setProduct(data);
    };
    fetchData();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Company: {product.company}</p>
      <p>Category: {product.category}</p>
      <p>Price: {product.price}</p>
      <p>Rating: {product.rating}</p>
      <p>Discount: {product.discount}</p>
      <p>Availability: {product.availability ? 'In Stock' : 'Out of Stock'}</p>
      <img src={product.imageUrl} alt={product.name} />
    </div>
  );
};

export default ProductDetails;
