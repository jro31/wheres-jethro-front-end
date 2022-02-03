import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const addCheckInHandler = async event => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('check_in[name]', enteredName.trim());
      formData.append('check_in[description]', enteredDescription.trim());
      formData.append('check_in[icon]', enteredIcon.trim());
      formData.append('check_in[photo]', chosenPhoto);
      formData.append('check_in[latitude]', props.currentLocation.latitude);
      formData.append('check_in[longitude]', props.currentLocation.longitude);
      formData.append('check_in[accuracy]', props.currentLocation.accuracy);
      formData.append('check_in[time_zone]', timeZone);

      // TODO - Update URL depending on environment
      const response = await fetch(`http://localhost:3001/api/v1/check_ins`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      const data = await response.json();

      if (response.status !== 201) {
        throw new Error(data.error_message || 'Something went wrong');
      }
      navigate('/');
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
      <input type='file' id='photo' onChange={photoChangeHandler} accept='image/*' />
      {/* TODO - Handle isSubmitting being true */}
      <Button disabled={!canSubmit() || isSubmitting} form='check-in-form'>
        Submit
      </Button>
    </Form>
  );
};

export default AddCheckInForm;
