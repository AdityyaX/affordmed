import React, { useState, ChangeEvent } from 'react';

interface FilterValues {
  category?: string;
  company?: string;
  rating?: string;
  priceRange?: string;
  availability?: string;
}

interface FiltersProps {
  onFilterChange: (filters: FilterValues) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterValues>({
    category: '',
    company: '',
    rating: '',
    priceRange: '',
    availability: '',
  });

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <div>
      <div>
        <label>
          Category:
          <select name="category" value={filters.category} onChange={handleFilterChange}>
            <option value="">All</option>
          
          </select>
        </label>
      </div>
     
      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
};

export default Filters;