import { useEffect } from 'react';
import MapGL, { Marker, Popup, FlyToInterpolator } from 'react-map-gl';
import { Fragment } from 'react/cjs/react.production.min';
import useCentreMap from '../hooks/use-centre-map';

const Map = props => {
  const markerClickHandler = location => {
    props.setSelectedMarker(location);
  };
  const centreMap = useCentreMap();

  const flyToLocation = location => {
    props.setViewport({
      ...props.viewport,
      longitude: -74.1,
      latitude: 40.7,
      zoom: 14,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };

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
      {/* <button onClick={centreMap}>Centre map</button> */}
      {/* <button onClick={() => flyToLocation('')}>Fly to NYC</button> */}
    </Fragment>
  );
};

export default Map;
