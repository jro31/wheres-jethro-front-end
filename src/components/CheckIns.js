import useFlyToLocation from '../hooks/use-fly-to-location';
import styles from './CheckIns.module.css';

const CheckIns = props => {
  const flyToLocation = useFlyToLocation();

  const locationRowClickHandler = location => {
    props.setSelectedMarker(location);
    flyToLocation(location, props.viewport, props.setViewport);
  };

  return (
    <div>
      {props.checkInLocations.map(location => (
        <div
          key={location.id}
          onClick={() => locationRowClickHandler(location)}
          className={styles['location-row']}
        >
          <div>{location.name}</div>
          <div>{location.description}</div>
        </div>
      ))}
    </div>
  );
};

export default CheckIns;
