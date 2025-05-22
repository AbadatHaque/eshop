const handleResponse = async (res: Response) => {
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
};

export const fetchProducts = async () => {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    return await handleResponse(res);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};

export const fetchProductById = async (id: number) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    return await handleResponse(res);
  } catch (error) {
    console.error(`Failed to fetch product with ID ${id}:`, error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const res = await fetch('https://fakestoreapi.com/products/categories');
    return await handleResponse(res);
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw error;
  }
};

export const fetchByCategory = async (category: string) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`);
    return await handleResponse(res);
  } catch (error) {
    console.error(`Failed to fetch products by category "${category}":`, error);
    throw error;
  }
};
