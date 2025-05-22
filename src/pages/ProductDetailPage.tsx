import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Product } from '../types';
import { fetchProductById } from '../utils/api';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      fetchProductById(Number(id)).then(setProduct);
    }
  }, [id]);

  if (!product) return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-8">
      <div className="flex-1 flex justify-center items-center">
        <img
          src={product.image}
          alt={product.title}
          className="max-w-full max-h-[400px] object-contain rounded-lg shadow-md"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-extrabold mb-4">{product.title}</h1>
          <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>
        </div>

        <div className="mt-auto">
          <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
          <button
            onClick={() => addToCart(product)}
            className="w-full cursor-pointer md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
