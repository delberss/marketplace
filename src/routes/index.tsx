import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import type { RootState } from '../store';
import { useSelector } from 'react-redux';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { Cart } from '../pages/Cart';
import { ProductDetail } from '../components/ProductDetail';
import { Checkout } from '../pages/Checkout';


interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user);
  if (!user.user) {
    return <Navigate to='/login' replace />
  }
  return children;
}

export function AppRoutes() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          element={
            <PrivateRoute>
              <DefaultLayout />
            </PrivateRoute>}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />}/>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
