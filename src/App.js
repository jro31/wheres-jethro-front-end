import { useEffect, useState } from 'react';

import CheckIns from './components/CheckIns';
import Controls from './components/Controls';
import Map from './components/Map';
import styles from './App.module.css';

const App = () => {
  const [checkInLocations, setCheckInLocations] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [displayCheckIns, setDisplayCheckIns] = useState(false);
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight - 42,
    latitude: 51.4197877,
    longitude: -0.0828316,
    zoom: 8,
  });

  const fetchCheckInLocations = async () => {
    try {
      // TODO - Update URL depending on environment
      const response = await fetch(`http://localhost:3001/api/v1/check_ins`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error_message || 'Unable to fetch check-ins');
      }

      setCheckInLocations(data.check_ins);
    } catch (error) {
      // TODO - Display this error somehow
      console.log(error.message);
    }
  };

  const arrowClickHandler = () => {
    setDisplayCheckIns(displayCheckIns => !displayCheckIns);
  };

  useEffect(() => {
    fetchCheckInLocations();
  }, []);

  return (
    <div>
      <div className={styles['map-container']}>
        <Map
          checkInLocations={checkInLocations}
          selectedMarker={selectedMarker}
          setSelectedMarker={setSelectedMarker}
          viewport={viewport}
          setViewport={setViewport}
        />
      </div>
      <div
        className={`${styles['outer-container']} ${
          displayCheckIns ? styles['display-check-ins'] : styles['hide-check-ins']
        }`}
      >
        <div onClick={arrowClickHandler} className={styles['arrow-container']}>
          {displayCheckIns && (
            <img src='/icons/down-arrow.svg' alt='Hide' className={styles.arrow} />
          )}
          {!displayCheckIns && (
            <img src='/icons/up-arrow.svg' alt='Show' className={styles.arrow} />
          )}
        </div>
        <div className={styles['check-ins-container']}>
          {/* <Controls
            checkInLocations={checkInLocations}
            selectedMarker={selectedMarker}
            setSelectedMarker={setSelectedMarker}
            viewport={viewport}
            setViewport={setViewport}
          /> */}
          <CheckIns
            checkInLocations={checkInLocations}
            selectedMarker={selectedMarker}
            setSelectedMarker={setSelectedMarker}
            viewport={viewport}
            setViewport={setViewport}
            setDisplayCheckIns={setDisplayCheckIns}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
