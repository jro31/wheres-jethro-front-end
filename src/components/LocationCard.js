import useFlyToLocation from '../hooks/use-fly-to-location';

import styles from './LocationCard.module.css';

const LocationCard = props => {
  const flyToLocation = useFlyToLocation();

  const cardColorClass = () => {
    switch (props.index % 4) {
      case 0:
        return styles['card-pink'];
      case 1:
        return styles['card-green'];
      case 2:
        return styles['card-purple'];
      case 3:
        return styles['card-yellow'];
      default:
        return styles['card-pink'];
    }
  };

  const locationCardClickHandler = location => {
    props.setSelectedMarker(location);
    flyToLocation(location, props.viewport, props.setViewport);
  };

  return (
    <div
      onClick={() => locationCardClickHandler(props.location)}
      className={`${styles['location-card-container']} ${
        props.selected ? styles['selected-location-card-container'] : ''
      }`}
    >
      <div className={`${styles.card} ${cardColorClass()}`}>
        <div className={styles['content-container']}>
          <div className={styles['activity-container']}>
            <div className={styles['icon-outer-container']}>
              <div className={styles['icon-inner-container']}>
                <div className={styles.icon}>{props.location.icon || '📍'}</div>
              </div>
            </div>
            <div className={styles.name}>{props.location.name}</div>
          </div>
          <div className={styles['date-container']}>
            <div className={styles.date}>{props.location.datetime}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
