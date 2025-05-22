import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { Product } from '../types';
import { fetchProducts, fetchCategories, fetchByCategory } from '../utils/api';

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategories = searchParams.getAll('category');
  console.log(selectedCategories, 'selectedCategories 009')
  const sortOrder = searchParams.get('sort') || '';

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        let data: Product[] = [];
  
        if (selectedCategories.length > 0) {
          const results = await Promise.all(selectedCategories.map(fetchByCategory));
          data = results?.flat();
        } else {
          data = await fetchProducts();
        }
  
        const unique = Array.from(new Map(data?.map((p) => [p.id, p]))?.values());
  
        if (sortOrder === 'price-asc') {
          unique.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'price-desc') {
          unique.sort((a, b) => b.price - a.price);
        }
  
        setProducts(unique);
      } catch (error) {
        console.log(error);
      }

    };

    fetchData();
  }, [selectedCategories.join(','), sortOrder]);

  const toggleCategory = (category: string) => {
    const current = new Set(searchParams.getAll('category'));
    if (current.has(category)) {
      current.delete(category);
    } else {
      current.add(category);
    }

    const newParams: any = {};
    if (current.size > 0) newParams.category = [...current];
    if (sortOrder) newParams.sort = sortOrder;
    setSearchParams(newParams);
  };

  // const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const newSort = e.target.value;
  //   const current = Object.fromEntries(searchParams.entries());
  //   const newParams = {
  //     ...current,
  //     sort: newSort,
  //   };
  //   console.log({newSort,current},newParams,searchParams)

  //   setSearchParams(newParams);
  // };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const newSort = e.target.value;


  const categories = searchParams.getAll("category");

  const newParams = new URLSearchParams();
  categories.forEach((cat) => newParams.append("category", cat));

  if (newSort) {
    newParams.set("sort", newSort);
  }

  setSearchParams(newParams);
};


  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Products</h2>
<div className="flex flex-wrap items-center gap-2 mb-4">
  <button
    onClick={() => setSearchParams({})}
    className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-medium"
  >
    Clear Filters
  </button>

  {categories.map((cat) => (
    <button
      key={cat}
      onClick={() => toggleCategory(cat)}
      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
        selectedCategories.includes(cat)
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
      }`}
    >
      {cat}
    </button>
  ))}

  <div className="ml-auto mt-2 sm:mt-0">
    <select
      value={sortOrder}
      onChange={handleSortChange}
      className="px-4 py-2 border rounded text-sm"
    >
      <option value="">Sort by</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
    </select>
  </div>
</div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <Link
            key={p.id}
            to={`/product/${p.id}`}
            className="border p-2 rounded shadow hover:shadow-lg"
          >
            <img src={p.image} alt={p.title} className="h-40 object-contain mx-auto" />
            <div className="mt-2">
              <h3 className="text-sm font-medium">{p.title}</h3>
              <p className="text-lg font-bold">${p.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
