import { DUMMY_DATA } from './Map';

import styles from './CheckIns.module.css';

const CheckIns = props => {
  const locationRowClickHandler = location => {
    props.setSelectedMarker(location);
  };

  return (
    <div>
      {DUMMY_DATA.map(location => (
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
