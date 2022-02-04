import { useEffect } from 'react';
import MapGL, { Marker, Popup } from 'react-map-gl';

import useCentreMap from '../hooks/use-centre-map';
import styles from './Map.module.css';
import './Mapbox.css';

const Map = props => {
  const markerClickHandler = location => {
    props.setSelectedMarker(location);
  };
  const centreMap = useCentreMap();

  const selectedLocationIndex = selectedLocation => {
    let selectedLocationIndex = 0;
    if (props.checkInLocations) {
      for (const [index, location] of props.checkInLocations.entries()) {
        if (location.id === selectedLocation.id) {
          selectedLocationIndex = index;
          break;
        }
      }
    }
    return selectedLocationIndex;
  };

  const popUpColorClass = selectedLocation => {
    switch (selectedLocationIndex(selectedLocation) % 5) {
      case 0:
        return styles['pop-up-pink'];
      case 1:
        return styles['pop-up-green'];
      case 2:
        return styles['pop-up-purple'];
      case 3:
        return styles['pop-up-blue'];
      case 4:
        return styles['pop-up-maroon'];
      default:
        return styles['pop-up-pink'];
    }
  };

  const popUpContentOuterContainerColorClass = selectedLocation => {
    switch (selectedLocationIndex(selectedLocation) % 5) {
      case 0:
        return styles['outer-container-pink'];
      case 1:
        return styles['outer-container-green'];
      case 2:
        return styles['outer-container-purple'];
      case 3:
        return styles['outer-container-blue'];
      case 4:
        return styles['outer-container-maroon'];
      default:
        return styles['outer-container-pink'];
    }
  };

  const popUpContentInnerContainerColorClass = selectedLocation => {
    switch (selectedLocationIndex(selectedLocation) % 5) {
      case 0:
        return styles['inner-container-pink'];
      case 1:
        return styles['inner-container-green'];
      case 2:
        return styles['inner-container-purple'];
      case 3:
        return styles['inner-container-blue'];
      case 4:
        return styles['inner-container-maroon'];
      default:
        return styles['inner-container-pink'];
    }
  };

  useEffect(() => {
    centreMap(props.checkInLocations, props.setSelectedMarker, props.viewport, props.setViewport);
  }, [props.checkInLocations]);

  return (
    <MapGL
      {...props.viewport}
      mapStyle='mapbox://styles/mapbox/satellite-streets-v11'
      onViewportChange={nextViewport => props.setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      className={styles.map}
    >
      {props.checkInLocations &&
        props.checkInLocations.map(location => (
          <Marker
            key={location.id}
            latitude={location.latitude}
            longitude={location.longitude}
            onClick={() => markerClickHandler(location)}
            className={styles.marker}
          >
            {location.icon || '📍'}
          </Marker>
        ))}

      {props.selectedMarker && (
        <Popup
          latitude={props.selectedMarker.latitude}
          longitude={props.selectedMarker.longitude}
          onClose={() => props.setSelectedMarker(null)}
          offsetLeft={17}
          closeButton={false}
          dynamicPosition={false}
          className={popUpColorClass(props.selectedMarker)}
        >
          <div
            className={`${
              styles['pop-up-content-outer-container']
            } ${popUpContentOuterContainerColorClass(props.selectedMarker)}`}
          >
            <div
              className={`${
                styles['pop-up-content-inner-container']
              } ${popUpContentInnerContainerColorClass(props.selectedMarker)}`}
            >
              <div className={styles['pop-up-heading-container']}>
                <div className={styles['pop-up-heading']}>{props.selectedMarker.name}</div>
                <div className={styles['pop-up-datetime-container']}>
                  <div className={styles['pop-up-date']}>
                    {props.selectedMarker.datetime_humanized.date}
                  </div>
                  <div className={styles['pop-up-time']}>
                    {props.selectedMarker.datetime_humanized.time}
                  </div>
                </div>
              </div>
              {props.selectedMarker.description && (
                <div className={styles['pop-up-description']}>
                  {props.selectedMarker.description}
                </div>
              )}
              {props.selectedMarker.photo_url && (
                <div className={styles['pop-up-photo']}>
                  <img src={props.selectedMarker.photo_url} alt={props.selectedMarker.name} />
                </div>
              )}
            </div>
          </div>
        </Popup>
      )}
    </MapGL>
  );
};

export default Map;
