import { useEffect, useState } from 'react';

import AddCheckInForm from '../components/AddCheckIn/AddCheckInForm';
import GettingCurrentLocation from '../components/AddCheckIn/GettingCurrentLocation';
import RetryGetCurrentLocation from '../components/AddCheckIn/RetryGetCurrentLocation';
import useGetCurrentLocation from '../hooks/use-get-current-location';

import styles from './AddCheckIn.module.css';

// TODO - Redirect unless logged-in
const AddCheckIn = () => {
  const [currentLocation, setCurrentLocation] = useState({ success: null });
  const getCurrentLocation = useGetCurrentLocation();

  const getCurrentLocationHandler = () => {
    getCurrentLocation(setCurrentLocation);
  };

  useEffect(() => {
    getCurrentLocationHandler();
  }, []);

  return (
    <div className={styles.container}>
      <h1>CHECK IN</h1>

      {currentLocation.success && <AddCheckInForm currentLocation={currentLocation} />}
      {currentLocation.success === false && <RetryGetCurrentLocation />}
      {currentLocation.success === null && <GettingCurrentLocation />}
    </div>
  );
};

export default AddCheckIn;
