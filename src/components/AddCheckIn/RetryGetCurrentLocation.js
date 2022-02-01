import useGetCurrentLocation from '../../hooks/use-get-current-location';
import Button from '../ui/Button';
import styles from './RetryGetCurrentLocation.module.css';

const RetryGetCurrentLocation = props => {
  const getCurrentLocation = useGetCurrentLocation();

  const buttonClickHandler = () => {
    props.setCurrentLocation({ success: null });
    getCurrentLocation(props.setCurrentLocation);
  };

  return (
    <div className={styles['page-container']}>
      <h3>Unable to fetch location</h3>
      <Button onClick={buttonClickHandler}>Try again</Button>
    </div>
  );
};

export default RetryGetCurrentLocation;
