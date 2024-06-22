import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthState from '../hooks/useAuthState.hook';

interface ProtectedRouteProps {
  component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const { isAuthenticated } = useAuthState();
  const location = useLocation();

  if (isAuthenticated === null) {
    // You can show a loading indicator here if desired
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <Component />
  ) : (
    <Navigate to="/auth/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoute;
