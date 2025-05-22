import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { totalItems } = useCart();
  return (
    <header className="p-4 shadow-md flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">E-Shop</Link>
      <Link to="/cart" className="text-md">Cart ({totalItems})</Link>
    </header>
  );
};

export default Header;