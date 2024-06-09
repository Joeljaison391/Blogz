import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

interface ProtectedRouteProps {
  component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {

  let isAuthenticated = false;

  const {user} = useAuth();

  if(user) {
    isAuthenticated = true;
  }else{
    isAuthenticated = false;
  }

   
  const location = useLocation();

  return isAuthenticated ? (
    <Component />
  ) : (
    <Navigate to="/auth/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoute;
