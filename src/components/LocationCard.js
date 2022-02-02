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
        <div className={styles['content-container']}>SOME CONTENT</div>
      </div>
      {/* <div className={styles.number}>{index + 1}.</div>
            <div className={styles.details}>
              <div className={styles.name}>{location.name}</div>
              <div className={styles.description}>{location.description}</div>
            </div>
            <div className={styles.icon}>{location.icon}</div> */}
    </div>
  );
};

export default LocationCard;
