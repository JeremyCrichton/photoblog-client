import React from 'react';

import PlaceList from '../components/PlaceList';

const UserPlaces = () => {
  const DUMMY_PLACES = [
    {
      id: 'p1',
      title: 'Garuda Wisnu Kencana Cultural Park',
      description:
        'Expansive park featuring monumental Hindu sculptures plus frequent dance performances & concerts.',
      imageUrl:
        'https://img.jakpost.net/c/2018/11/28/2018_11_28_59559_1543399591._large.jpg',
      address:
        'Jl. Raya Uluwatu, Ungasan, Kec. Kuta Sel., Kabupaten Badung, Bali 80364',
      location: {
        lat: -8.8104228,
        lng: 115.1654046
      },
      creator: 'u1'
    },
    {
      id: 'p2',
      title: 'Garuda Wisnu Kencana Cultural Park 2',
      description:
        'Expansive park featuring monumental Hindu sculptures plus frequent dance performances & concerts. 2.',
      imageUrl:
        'https://img.jakpost.net/c/2018/11/28/2018_11_28_59559_1543399591._large.jpg',
      address:
        'Jl. Raya Uluwatu, Ungasan, Kec. Kuta Sel., Kabupaten Badung, Bali 80364',
      location: {
        lat: -8.8104228,
        lng: 115.1654046
      },
      creator: 'u2'
    }
  ];

  return <PlaceList items={DUMMY_PLACES} />;
};

export default UserPlaces;
