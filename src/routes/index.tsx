import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import type { RootState } from '../store';
import { useSelector } from 'react-redux';


interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const user = useSelector((state: RootState) => state.user);
    if(!user.user){
      return <Navigate to='/login' replace />
    }
    return children;
}

export function AppRoutes() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <PrivateRoute>
            <Home/>
          </PrivateRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
