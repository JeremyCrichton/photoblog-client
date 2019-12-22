import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();

  // Without useEffect, we would fetch data on each re-render, which would trigger a re-render thus infinite loop
  // An empty array arg means it will only run once
  useEffect(() => {
    setIsLoading(true);

    try {
      (async () => {
        const response = await fetch('http://localhost:5000/api/users');
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        console.log(responseData);
        setLoadedUsers(responseData);
        setIsLoading(false);
      })();
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }

    // dont use async await w/ useEffect - it doesn't want a promise, so we need to use a IIFE
  }, []);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </>
  );
};

export default Users;
