import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Resizer from 'react-image-file-resizer';

import Button from '../ui/Button';
import Form from '../ui/Form';
import InputContainer from '../ui/InputContainer';

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const AddCheckInForm = props => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredDescription, setEnteredDescription] = useState('');
  const [enteredIcon, setEnteredIcon] = useState('');
  const [chosenPhoto, setChosenPhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const nameChangeHandler = event => {
    setEnteredName(event.target.value);
  };

  const descriptionChangeHandler = event => {
    setEnteredDescription(event.target.value);
  };

  const iconChangeHandler = event => {
    setEnteredIcon(event.target.value);
  };

  const photoChangeHandler = event => {
    setChosenPhoto(event.target.files[0]);
  };

  const resizePhoto = () => {
    if (!chosenPhoto) return;

    return new Promise(resolve => {
      Resizer.imageFileResizer(
        chosenPhoto,
        600, // maxWidth of the new image
        600, // maxHeight of the new image
        'JPEG', // Format of the new image
        100, // Quality of the new image
        0, // Rotation
        uri => {
          resolve(uri);
        },
        'file' // Output type
      );
    });
  };

  const addCheckInHandler = async event => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const resizedPhoto = await resizePhoto();

      const formData = new FormData();
      formData.append('check_in[name]', enteredName.trim());
      formData.append('check_in[description]', enteredDescription.trim());
      formData.append('check_in[icon]', enteredIcon.trim());
      if (resizedPhoto) formData.append('check_in[photo]', resizedPhoto);
      formData.append('check_in[latitude]', props.currentLocation.latitude);
      formData.append('check_in[longitude]', props.currentLocation.longitude);
      formData.append('check_in[accuracy]', props.currentLocation.accuracy);
      formData.append('check_in[time_zone]', timeZone);

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/check_ins`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      const data = await response.json();

      if (response.status !== 201) {
        throw new Error(data.error_message || 'Something went wrong');
      }
      navigate('/');
      // TODO - Open the pop-up of the created check-in
    } catch (error) {
      setError(error.message);
      setIsSubmitting(false);
    }
  };

  const canSubmit = () => {
    return (
      props.currentLocation.latitude &&
      props.currentLocation.longitude &&
      enteredName.trim().length > 0
    );
  };

  // TODO - Display error somewhere
  return (
    <Form onSubmit={addCheckInHandler} id='check-in-form'>
      <InputContainer>
        <label htmlFor='latitude'>Latitude</label>
        <input type='text' required id='latitude' disabled value={props.currentLocation.latitude} />
      </InputContainer>
      <InputContainer>
        <label htmlFor='longitude'>Longitude</label>
        <input
          type='text'
          required
          id='longitude'
          disabled
          value={props.currentLocation.longitude}
        />
      </InputContainer>
      <InputContainer>
        <label htmlFor='accuracy'>Accuracy</label>
        <input type='text' required id='accuracy' disabled value={props.currentLocation.accuracy} />
      </InputContainer>
      <InputContainer>
        <label htmlFor='time-zone'>Time zone</label>
        <input type='text' required id='time-zone' disabled value={timeZone} />
      </InputContainer>
      <InputContainer>
        <label htmlFor='name'>Name</label>
        <input type='text' required id='name' value={enteredName} onChange={nameChangeHandler} />
      </InputContainer>
      <InputContainer>
        <label htmlFor='description'>Description</label>
        <textarea
          type='text'
          id='description'
          value={enteredDescription}
          onChange={descriptionChangeHandler}
        />
      </InputContainer>
      <InputContainer>
        <label htmlFor='icon'>Icon</label>
        <input type='text' id='icon' value={enteredIcon} onChange={iconChangeHandler} />
      </InputContainer>
      <InputContainer>
        <label htmlFor='photo'>Photo</label>
        <input type='file' id='photo' onChange={photoChangeHandler} accept='image/*' />
      </InputContainer>
      {/* TODO - Handle isSubmitting being true */}
      <Button disabled={!canSubmit() || isSubmitting} form='check-in-form'>
        Submit
      </Button>
    </Form>
  );
};

export default AddCheckInForm;
