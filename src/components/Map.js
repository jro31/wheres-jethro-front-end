import { useState, useEffect } from 'react';
import MapGL, {
  Marker,
  Popup,
  LinearInterpolator,
  WebMercatorViewport,
  FlyToInterpolator,
} from 'react-map-gl';
import linestring from 'turf-linestring';
import bbox from '@turf/bbox';
import { Fragment } from 'react/cjs/react.production.min';

export const DUMMY_DATA = [
  {
    id: 1,
    latitude: 37.7577,
    longitude: -122.4376,
    name: 'San Francisco',
    description: 'Bunch of smug fuckers',
    icon: '🖕',
  },
  {
    id: 2,
    latitude: 0,
    longitude: 0,
    name: 'Middle of the sea',
    description: 'Good for swimming',
    icon: '🤿',
  },
];

const Map = props => {
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight - 150,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  const markerClickHandler = location => {
    props.setSelectedMarker(location);
  };

  const centreMap = () => {
    props.setSelectedMarker(null);
    const coordinates = DUMMY_DATA.map(location => [location.longitude, location.latitude]);
    const line = linestring(coordinates);
    const [minLng, minLat, maxLng, maxLat] = bbox(line);

    const vp = new WebMercatorViewport(viewport);

    const { longitude, latitude, zoom } = vp.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      {
        padding: 40,
      }
    );

    setViewport({
      ...viewport,
      longitude,
      latitude,
      zoom,
      transitionInterpolator: new LinearInterpolator(),
      transitionDuration: 2000,
    });
  };

  const flyToLocation = location => {
    setViewport({
      ...viewport,
      longitude: -74.1,
      latitude: 40.7,
      zoom: 14,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
      // transitionEasing: d3.easeCubic,
    });
  };

  useEffect(() => {
    centreMap();
  }, []);

  return (
    <Fragment>
      <MapGL
        {...viewport}
        mapStyle='mapbox://styles/mapbox/satellite-streets-v11'
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        {DUMMY_DATA.map(location => (
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
      <button onClick={centreMap}>Centre map</button>
      <button onClick={() => flyToLocation('')}>Fly to NYC</button>
    </Fragment>
  );
};

export default Map;
