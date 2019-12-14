import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Jer',
      image:
        'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?cs=srgb&dl=animal-pet-cute-kitten-45201.jpg&fm=jpg',
      places: 3
    }
  ];
  return <UsersList items={USERS} />;
};

export default Users;
