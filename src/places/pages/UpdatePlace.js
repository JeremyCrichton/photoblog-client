import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css';

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

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

  useEffect(() => {
    // If staetment, in case user goes to url of place id that doesn't exist
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true
          },
          description: {
            value: identifiedPlace.description,
            isValid: true
          }
        },
        true
      );
    }
    setIsLoading(false); // once we get our data
  }, [setFormData, identifiedPlace]);
  // identifiedPlace will not change w/ every re-render cycle (it will always find the exact same object in memory). It wont' chagne so useEffect shouldn't trigger again
  // setForm data will also not change because in our hook we wrap it with useCallback

  if (!identifiedPlace) {
    return (
      <div className='center'>
        <Card>
          <h2>Couldn't find place!</h2>
        </Card>
      </div>
    );
  }

  // Don't share this w/ useForm hook because submission logic is very specific to component
  const placeUpdateSubmitHandler = e => {
    e.preventDefault();
    console.log(formState.inputs); // Send this to the backend
  };

  // Temporary - to be replaced once backend complete
  if (isLoading) {
    return (
      <div className='center'>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
      <Input
        id='title'
        element='input'
        type='text'
        label='Title'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid title.'
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialIsValid={formState.inputs.title.isValid}
      />
      <Input
        id='description'
        element='textarea'
        label='Description'
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText='Please enter a valid description (min. 5 characters).'
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialIsValid={formState.inputs.description.isValid}
      />
      <Button type='submit' disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
