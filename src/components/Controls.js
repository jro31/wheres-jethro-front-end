import useCentreMap from '../hooks/use-centre-map';
import Button from './ui/Button';

import styles from './Controls.module.css';

const Controls = props => {
  const centreMap = useCentreMap();

  const resetMapHandler = () => {
    centreMap(props.checkInLocations, props.setSelectedMarker, props.viewport, props.setViewport);
    props.setDisplayCheckIns(false);
  };

  const loadArchivedCheckInsHandler = () => {
    props.fetchCheckInLocations(null, 10, props.checkInsContainerRef.current.scrollLeft);
  };

  return (
    <div className={styles['controls-container']}>
      <Button onClick={resetMapHandler} className={styles.button}>
        Reset map
      </Button>
      <Button onClick={loadArchivedCheckInsHandler} className={styles.button}>
        Load archived check-ins
      </Button>
    </div>
  );
};

export default Controls;
