import { useState } from 'react';
import styles from './LoginForm.module.css';

const LoginForm = props => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const emailChangeHandler = event => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = event => {
    setEnteredPassword(event.target.value);
  };

  const canSubmit = () => {
    return /^\S+@\S+\.\S+$/.test(enteredEmail.trim()) && enteredPassword.trim().length;
  };

  const loginHandler = async event => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO - Update URL depending on environment
      const response = await fetch(`http://localhost:3001/api/v1/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: enteredEmail.trim(),
            password: enteredPassword.trim(),
          },
        }),
        credentials: 'include',
      });
      const data = await response.json();

      if (data && data.logged_in) {
        props.setLoggedIn(true);
      } else {
        throw new Error(data.error_message || 'Something went wrong');
      }
    } catch (error) {
      setIsSubmitting(false);
      setError(error.message);
    }
  };

  return (
    <div className={styles['form-container']}>
      <form id='login-form' className={styles.form} onSubmit={loginHandler}>
        <div className={styles['input-container']}>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            required
            id='email'
            value={enteredEmail}
            onChange={emailChangeHandler}
          />
        </div>
        <div className={styles['input-container']}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            required
            id='password'
            value={enteredPassword}
            onChange={passwordChangeHandler}
          />
        </div>
        {/* TODO - Handle is submitting being true */}
        {/* TODO - Display error message */}
        <button disabled={!canSubmit() || isSubmitting} form='login-form'>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
