import useFlyToLocation from '../hooks/use-fly-to-location';

import styles from './LocationCard.module.css';

const LocationCard = props => {
  const flyToLocation = useFlyToLocation();

  const cardColorClass = () => {
    switch (props.index % 5) {
      case 0:
        return styles['card-pink'];
      case 1:
        return styles['card-green'];
      case 2:
        return styles['card-purple'];
      case 3:
        return styles['card-blue'];
      case 4:
        return styles['card-maroon'];
      default:
        return styles['card-pink'];
    }
  };

  const dateColorClass = () => {
    switch (props.index % 5) {
      case 0:
        return styles['date-pink'];
      case 1:
        return styles['date-green'];
      case 2:
        return styles['date-purple'];
      case 3:
        return styles['date-blue'];
      case 4:
        return styles['date-maroon'];
      default:
        return styles['date-pink'];
    }
  };

  const locationCardClickHandler = location => {
    props.setDisplayCheckIns(false);
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
          <div className={styles['date-outer-container']}>
            <div className={styles['date-inner-container']}>
              <div className={`${styles.date} ${dateColorClass()}`}>
                {props.location.datetime_humanized.date}
              </div>
              <div className={styles.time}>{props.location.datetime_humanized.time}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
