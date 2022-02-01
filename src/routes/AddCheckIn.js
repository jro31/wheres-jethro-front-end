import { Fragment, useCallback, useEffect, useState } from 'react';

import AddCheckInForm from '../components/AddCheckIn/AddCheckInForm';
import FullPageSpinner from '../components/AddCheckIn/FullPageSpinner';
import LoginForm from '../components/AddCheckIn/LoginForm';
import RetryGetCurrentLocation from '../components/AddCheckIn/RetryGetCurrentLocation';
import useGetCurrentLocation from '../hooks/use-get-current-location';

const AddCheckIn = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginStatusChecked, setLoginStatusChecked] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ success: null });
  const [logoutError, setLogoutError] = useState('');
  const getCurrentLocation = useGetCurrentLocation();

  const checkLoginStatus = useCallback(async () => {
    // TODO - Update URL depending on environment
    const response = await fetch(`http://localhost:3001/api/v1/logged_in`, {
      credentials: 'include',
    });
    const data = await response.json();

    if (data.logged_in) {
      setLoggedIn(true);
    }
    setLoginStatusChecked(true);
  }, []);

  const logoutHandler = async () => {
    try {
      // TODO - Update URL depending on environment
      const response = await fetch(`http://localhost:3001/api/v1/logout`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Unable to logout');
      }

      const data = await response.json();

      if (data.logged_out) {
        setLoggedIn(false);
      } else {
        throw new Error('Unable to logout');
      }
    } catch (error) {
      setLogoutError(error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  useEffect(() => {
    if (loggedIn) {
      setCurrentLocation({ success: null });
      getCurrentLocation(setCurrentLocation);
    }
  }, [loggedIn]);

  return (
    <Fragment>
      {loginStatusChecked && (
        <Fragment>
          {loggedIn && (
            <Fragment>
              {currentLocation.success && <AddCheckInForm currentLocation={currentLocation} />}
              {currentLocation.success === false && <RetryGetCurrentLocation />}
              {currentLocation.success === null && (
                <FullPageSpinner text='Getting current location' />
              )}
              {/* TODO - Display logout error */}
              <button onClick={logoutHandler}>Logout</button>
            </Fragment>
          )}
          {!loggedIn && <LoginForm setLoggedIn={setLoggedIn} />}
        </Fragment>
      )}
      {!loginStatusChecked && <FullPageSpinner text='Checking login status' />}
    </Fragment>
  );
};

export default AddCheckIn;
