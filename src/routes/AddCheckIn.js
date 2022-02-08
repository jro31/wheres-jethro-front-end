import { Fragment, useCallback, useEffect, useState } from 'react';

import AddCheckInForm from '../components/AddCheckIn/AddCheckInForm';
import FullPageSpinner from '../components/AddCheckIn/FullPageSpinner';
import LoginForm from '../components/AddCheckIn/LoginForm';
import RetryGetCurrentLocation from '../components/AddCheckIn/RetryGetCurrentLocation';
import useGetCurrentLocation from '../hooks/use-get-current-location';
import Navbar from '../components/AddCheckIn/Navbar';
import styles from './AddCheckIn.module.css';

const AddCheckIn = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginStatusChecked, setLoginStatusChecked] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ success: null });
  const getCurrentLocation = useGetCurrentLocation();

  const checkLoginStatus = useCallback(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/logged_in`, {
      credentials: 'include',
    });
    const data = await response.json();

    if (data.logged_in) {
      setLoggedIn(true);
    }
    setLoginStatusChecked(true);
  }, []);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  useEffect(() => {
    if (loggedIn) {
      setCurrentLocation({ success: null });
      getCurrentLocation(setCurrentLocation);
    }
  }, [loggedIn]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles['page-container']}>
      {loggedIn && currentLocation.success !== null && <Navbar setLoggedIn={setLoggedIn} />}
      {loginStatusChecked && (
        <Fragment>
          {loggedIn && (
            <Fragment>
              {currentLocation.success && <AddCheckInForm currentLocation={currentLocation} />}
              {currentLocation.success === false && (
                <RetryGetCurrentLocation setCurrentLocation={setCurrentLocation} />
              )}
              {currentLocation.success === null && (
                <FullPageSpinner text='Getting current location' />
              )}
            </Fragment>
          )}
          {!loggedIn && <LoginForm setLoggedIn={setLoggedIn} />}
        </Fragment>
      )}
      {!loginStatusChecked && <FullPageSpinner text='Checking login status' />}
    </div>
  );
};

export default AddCheckIn;
