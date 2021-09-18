import { firebaseService } from 'service';
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    const unsubscribe = firebaseService.auth.onAuthStateChanged(user => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return {
    authUser,
  };
};
