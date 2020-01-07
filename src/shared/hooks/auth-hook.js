import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);

    // If an expirationDate already exists (ie if user logged in before and is being auto-logged in here)
    // then use that, otherwise generate a new date
    const loginTokenExpirationDate = new Date(
      expirationDate || new Date().getTime() + 1000 * 60 * 60
    );
    setTokenExpirationDate(loginTokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token,
        expiration: loginTokenExpirationDate.toISOString() // toISOString to ensure no data gets lost when stringified
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  // Automantically logout user
  useEffect(() => {
    // When we login, set a new timer
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      // When we logout, clear the time
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  // Check local storage for a token when the component mounts (non-rerenders)
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));

    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expirationDate > new Date())
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  // return access to login & logout fns && access to state
  return { token, userId, login, logout };
};
