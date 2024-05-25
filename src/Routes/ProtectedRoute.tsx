import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  component: React.ComponentType;
  
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component, ...props }) => {
    
    const isAuthenticated = false; // Mock authentication state

    return (
        <Route
            {...props}
            element={isAuthenticated ? React.createElement(component, props) : <Navigate to="/login" replace />}
        />
    );
};

export default ProtectedRoute;