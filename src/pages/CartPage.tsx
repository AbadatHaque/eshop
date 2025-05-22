import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart,decreaseFromCart, totalItems, totalPrice,addToCart } = useCart();

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map(({ product, quantity }) => (
            <div
  key={product.id}
  className="flex flex-col sm:flex-row sm:items-center gap-4 border rounded-lg p-4 shadow-sm hover:shadow-md transition"
>
  <img
    src={product.image}
    alt={product.title}
    className="w-28 h-28 object-contain self-center sm:self-auto"
  />

  <div className="flex-1">
    <h3 className="text-lg font-medium">{product.title}</h3>
    <p className="text-sm text-gray-600">Qty: {quantity}</p>
    <p className="text-sm text-gray-800 font-semibold mt-1">
      ${(product.price * quantity).toFixed(2)}
    </p>
  </div>

  <div className="flex items-center justify-center sm:justify-start gap-2">
    <button
      onClick={() => decreaseFromCart(product)}
      aria-label={`Remove one ${product.title} from cart`}
      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
    >
      -
    </button>
    <span className="min-w-[2rem] text-center">{quantity}</span>
    <button
      onClick={() => addToCart(product)}
      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        aria-label={`Add one ${product.title} to cart`}
    >
      +
    </button>
  </div>

  <button
    onClick={() => removeFromCart(product.id)}
    className="mt-2 sm:mt-0 sm:ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
  >
    Remove
  </button>
</div>

          ))}

          <div className="text-right mt-6 border-t pt-4">
            <p className="text-lg font-semibold">
              Total Items: <span className="font-bold">{totalItems}</span>
            </p>
            <p className="text-xl font-bold mt-1">
              Total Price: ${totalPrice.toFixed(2)}
            </p>
            <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
