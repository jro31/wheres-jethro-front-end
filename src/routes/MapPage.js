import { useEffect, useRef, useState } from 'react';

import CheckIns from '../components/CheckIns';
import Controls from '../components/Controls';
import Map from '../components/Map';

import styles from './MapPage.module.css';

export const numberOfCheckInsToDisplayOnLoad = 10;

const MapPage = () => {
  const [checkInLocations, setCheckInLocations] = useState(null);
  const [displayCheckIns, setDisplayCheckIns] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isFetchingCheckIns, setIsFetchingCheckIns] = useState(false);
  const [error, setError] = useState('');
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight - 42,
    latitude: 51.4197877,
    longitude: -0.0828316,
    zoom: 8,
  });
  const checkInsContainerRef = useRef();

  const fetchCheckInLocations = async (limit = null, offset = null, scrollLeft = 0) => {
    setError('');
    setIsFetchingCheckIns(true);

    const params = () => {
      if (!limit && !offset) return '';

      return `?${limit ? `limit=${limit}` : ''}${offset ? `offset=${offset}` : ''}`;
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/check_ins${params()}`);
      const data = await response.json();

      setIsFetchingCheckIns(false);

      if (!response.ok) {
        throw new Error(data.error_message || 'Unable to fetch check-ins');
      }

      if (offset) {
        setCheckInLocations(() => [...checkInLocations, ...data.check_ins]);
        setDisplayCheckIns(false);
      } else {
        setCheckInLocations(data.check_ins);
      }
      checkInsContainerRef.current.scrollLeft = scrollLeft;
    } catch (error) {
      setError(error.message);
    }
  };

  const arrowClickHandler = () => {
    setDisplayCheckIns(displayCheckIns => !displayCheckIns);
  };

  useEffect(() => {
    fetchCheckInLocations(numberOfCheckInsToDisplayOnLoad);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles['page-container']} style={{ height: window.innerHeight }}>
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
          {isFetchingCheckIns && (
            <div className={styles['fetching-check-ins']}>Fetching check-ins...</div>
          )}
          {error && <div className={styles.error}>{error}</div>}
        </div>
        <div ref={checkInsContainerRef} className={styles['check-ins-container']}>
          <CheckIns
            checkInLocations={checkInLocations}
            selectedMarker={selectedMarker}
            setSelectedMarker={setSelectedMarker}
            viewport={viewport}
            setViewport={setViewport}
            setDisplayCheckIns={setDisplayCheckIns}
          />
          <Controls
            checkInLocations={checkInLocations}
            selectedMarker={selectedMarker}
            setSelectedMarker={setSelectedMarker}
            viewport={viewport}
            setViewport={setViewport}
            setDisplayCheckIns={setDisplayCheckIns}
            fetchCheckInLocations={fetchCheckInLocations}
            checkInsContainerRef={checkInsContainerRef}
          />
        </div>
      </div>
    </div>
  );
};

export default MapPage;
