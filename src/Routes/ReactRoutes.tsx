import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import routesConfig from './routesConfig';
import ProtectedRoute from './ProtectedRoute';

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {routesConfig.map((route, index) => {
        const { path, component: Component, protected: isProtected } = route;
        return (
          <Route
            key={index}
            path={path}
            element={isProtected ? (
              <ProtectedRoute component={Component} /> 
            ) : (
              <Component />
            )}
          />
        );
      })}
    </Routes>
  </Suspense>
);

export default App;
