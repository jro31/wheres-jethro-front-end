import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

import styles from './AddCheckInForm.module.css';

const AddCheckInForm = props => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredDescription, setEnteredDescription] = useState('');
  const [enteredIcon, setEnteredIcon] = useState('');
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

  const addCheckInHandler = async event => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO - Update URL depending on environment
      const response = await fetch(`http://localhost:3001/api/v1/check_ins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          check_in: {
            name: enteredName.trim(),
            description: enteredDescription.trim(),
            icon: enteredIcon.trim(),
            latitude: props.currentLocation.latitude,
            longitude: props.currentLocation.longitude,
            accuracy: props.currentLocation.accuracy,
          },
        }),
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
    <div className={styles['form-container']}>
      <form onSubmit={addCheckInHandler} className={styles.form} id='check-in-form'>
        <div className={styles['input-container']}>
          <label htmlFor='latitude'>Latitude</label>
          <input
            type='text'
            required
            id='latitude'
            disabled
            value={props.currentLocation.latitude}
          />
        </div>
        <div className={styles['input-container']}>
          <label htmlFor='longitude'>Longitude</label>
          <input
            type='text'
            required
            id='longitude'
            disabled
            value={props.currentLocation.longitude}
          />
        </div>
        <div className={styles['input-container']}>
          <label htmlFor='accuracy'>Accuracy</label>
          <input
            type='text'
            required
            id='accuracy'
            disabled
            value={props.currentLocation.accuracy}
          />
        </div>
        <div className={styles['input-container']}>
          <label htmlFor='name'>Name</label>
          <input type='text' required id='name' value={enteredName} onChange={nameChangeHandler} />
        </div>
        <div className={styles['input-container']}>
          <label htmlFor='description'>Description</label>
          <textarea
            type='text'
            id='description'
            value={enteredDescription}
            onChange={descriptionChangeHandler}
          />
        </div>
        <div className={styles['input-container']}>
          <label htmlFor='icon'>Icon</label>
          <input type='text' id='icon' value={enteredIcon} onChange={iconChangeHandler} />
        </div>
        {/* TODO - Handle isSubmitting being true */}
        <Button disabled={!canSubmit() || isSubmitting} form='check-in-form'>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddCheckInForm;
