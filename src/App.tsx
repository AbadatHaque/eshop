import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <AppRoutes />
      </Router>
    </CartProvider>
  );
}

export default App;