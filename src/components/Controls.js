import useCentreMap from '../hooks/use-centre-map';
import Button from './ui/Button';

import styles from './Controls.module.css';

const Controls = props => {
  const centreMap = useCentreMap();

  return (
    <div className={styles['controls-container']}>
      {/* TODO - This should also close the menu */}
      <Button
        onClick={() =>
          centreMap(
            props.checkInLocations,
            props.setSelectedMarker,
            props.viewport,
            props.setViewport
          )
        }
        className={styles.button}
      >
        Reset map
      </Button>
      <Button className={styles.button}>Load archived check-ins</Button>
    </div>
  );
};

export default Controls;
