import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../Context/AuthContext';

function useAuthState() {
  const { checkUser } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const verifyUser = useCallback(async () => {
    const authenticated = await checkUser();
    setIsAuthenticated(authenticated);
  }, [checkUser]);

  useEffect(() => {
    verifyUser();
  }, []);

  return {
    isAuthenticated
  };
}

export default useAuthState;
