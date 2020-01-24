import React, { useEffect, useState } from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook';
import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  // Without useEffect, we would fetch data on each re-render, which would trigger a re-render thus infinite loop
  useEffect(() => {
    try {
      (async () => {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        );

        setLoadedUsers(responseData);
      })();
    } catch (error) {}

    // dont use async await w/ useEffect - it doesn't want a promise, so we need to use a IIFE
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </>
  );
};

export default Users;
