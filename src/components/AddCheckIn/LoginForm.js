import { useState } from 'react';
import Button from '../ui/Button';
import Form from '../ui/Form';
import InputContainer from '../ui/InputContainer';
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
    return /^\S+@\S+\.\S+$/.test(enteredEmail.trim()) && enteredPassword.trim().length > 0;
  };

  const loginHandler = async event => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/sessions`, {
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
    <Form onSubmit={loginHandler} id='login-form'>
      <InputContainer>
        <label htmlFor='email'>Email</label>
        <input type='text' required id='email' value={enteredEmail} onChange={emailChangeHandler} />
      </InputContainer>
      <InputContainer>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          required
          id='password'
          value={enteredPassword}
          onChange={passwordChangeHandler}
        />
      </InputContainer>
      {/* TODO - Handle is submitting being true */}
      {error && <div className={styles.error}>{error}</div>}
      <Button disabled={!canSubmit() || isSubmitting} form='login-form'>
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
