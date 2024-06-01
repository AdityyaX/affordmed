// components/ProductCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from "../services/apiservice";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div>
      <Link to={`/product/${product.id}`}>
        <img src={product.imageUrl} alt={product.name} />
        <h3>{product.name}</h3>
        <p>Company: {product.company}</p>
        <p>Price: {product.price}</p>
        <p>Rating: {product.rating}</p>
        <p>Discount: {product.discount}</p>
        <p>Availability: {product.availability ? 'In Stock' : 'Out of Stock'}</p>
      </Link>
    </div>
  );
};

export default ProductCard;