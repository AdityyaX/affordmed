interface Product {
  id: string;
  name: string;
  company: string;
  category: string;
  price: number;
  rating: number;
  discount: number;
  availability: boolean;
  imageUrl: string;
}

const API_BASE_URL = 'http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000';
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3MjIyOTk0LCJpYXQiOjE3MTcyMjI2OTQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjlmYWVkMjhkLTc1ZmEtNDgxZS1iYmU0LTkwZjRkYTk2NWQwYiIsInN1YiI6ImFkaXR5YS4yMTI1Y3NtZTEwMDhAa2lldC5lZHUifSwiY29tcGFueU5hbWUiOiJLSUVUIEdST1VQIE9GIElPTlNUSVRVVElPTlMiLCJjbGllbnRJRCI6IjlmYWVkMjhkLTc1ZmEtNDgxZS1iYmU0LTkwZjRkYTk2NWQwYiIsImNsaWVudFNlY3JldCI6IkhBYnpGeHdycldNYU1oeGQiLCJvd25lck5hbWUiOiJBZGl0eWEgUGFjaGF1cmkiLCJvd25lckVtYWlsIjoiYWRpdHlhLjIxMjVjc21lMTAwOEBraWV0LmVkdSIsInJvbGxObyI6IjIxMDAxOTE1MzAwMDQifQ.0xR8iWzXO4wjhKj8pQGDZON-M9smS5tZWYqNmprTjf8';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    headers: {
      'Authorization': `Bearer ${BEARER_TOKEN}`,
    },
  });
  const data = await response.json();
  return data.map((product: any) => ({
    id: generateUniqueId(product),
    ...product,
    imageUrl: getRandomImageUrl(),
  }));
};

export const fetchProductDetails = async (id: string): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    headers: {
      'Authorization': `Bearer ${BEARER_TOKEN}`,
    },
  });
  const data = await response.json();
  return {
    id,
    ...data,
    imageUrl: getRandomImageUrl(),
  };
};

const generateUniqueId = (product: any): string => {
  if (product.id) {
    return product.id;
  }
  return '';
};

const getRandomImageUrl = (): string => {
  const images = [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/200',
    'https://via.placeholder.com/250',
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/350',
  ];
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

export type { Product };