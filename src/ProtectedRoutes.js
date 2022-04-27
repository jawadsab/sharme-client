import { Outlet } from 'react-router-dom';
import { useAuthUser } from './hooks';
import { Navigate } from 'react-router-dom';
const ProtectedRoutes = () => {
  const { data: authData, isLoading } = useAuthUser();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return authData?.data.user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
