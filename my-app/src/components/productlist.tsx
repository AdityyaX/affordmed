import React, { useState, useEffect } from 'react';
import { fetchProducts, Product } from '../services/apiservice';

import Filters from '../components/filters';
import Pagination from '../components/filters';

interface FilterValues {
  category?: string;
  company?: string;
  rating?: string;
  priceRange?: string;
  availability?: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterValues>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    fetchData();
  }, []);

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const filteredProducts = products.filter((product) => {
    // Apply filters based on category, company, rating, price range, availability
    return true; // Implement your filtering logic
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    // Sort products based on price, rating, discount, etc.
    return 0; // Implement your sorting logic
  });

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <Filters onFilterChange={handleFilterChange} />
      <div>
       
      </div>

    </div>
  );
};

export default ProductList;
