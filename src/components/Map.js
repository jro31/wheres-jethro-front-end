import { Fragment, useEffect } from 'react';
import MapGL, { Marker, Popup } from 'react-map-gl';

import useCentreMap from '../hooks/use-centre-map';
import styles from './Map.module.css';

const Map = props => {
  const markerClickHandler = location => {
    props.setSelectedMarker(location);
  };
  const centreMap = useCentreMap();
  useEffect(() => {
    centreMap(props.checkInLocations, props.setSelectedMarker, props.viewport, props.setViewport);
  }, []);

  return (
    <Fragment>
      <MapGL
        {...props.viewport}
        mapStyle='mapbox://styles/mapbox/satellite-streets-v11'
        onViewportChange={nextViewport => props.setViewport(nextViewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        {props.checkInLocations.map(location => (
          <Marker
            key={location.id}
            latitude={location.latitude}
            longitude={location.longitude}
            onClick={() => markerClickHandler(location)}
            className={styles.marker}
          >
            {location.icon}
          </Marker>
        ))}

        {props.selectedMarker && (
          <Popup
            latitude={props.selectedMarker.latitude}
            longitude={props.selectedMarker.longitude}
            onClose={() => props.setSelectedMarker(null)}
          >
            <h2>{props.selectedMarker.name}</h2>
            <p>{props.selectedMarker.description}</p>
          </Popup>
        )}
      </MapGL>
    </Fragment>
  );
};

export default Map;
