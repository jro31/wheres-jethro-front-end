import * as React from 'react';
import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

const DUMMY_DATA = [
  {
    latitude: 37.7577,
    longitude: -122.4376,
    name: 'San Francisco',
    description: 'Bunch of smug fuckers',
    icon: '🖕',
  },
  {
    latitude: 0,
    longitude: 0,
    name: 'Middle of the sea',
    description: 'Good for swimming',
    icon: '🤿',
  },
];

const Map = () => {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  const [selectedMarker, setSelectedMarker] = useState(null);

  const markerClickHandler = location => {
    setSelectedMarker(location);
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle='mapbox://styles/mapbox/satellite-streets-v11'
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    >
      {DUMMY_DATA.map(location => (
        <Marker
          key={location.latitude}
          latitude={location.latitude}
          longitude={location.longitude}
          onClick={() => markerClickHandler(location)}
        >
          {location.icon}
        </Marker>
      ))}

      {selectedMarker && (
        <Popup
          latitude={selectedMarker.latitude}
          longitude={selectedMarker.longitude}
          onClose={() => setSelectedMarker(null)}
        >
          <h2>{selectedMarker.name}</h2>
          <p>{selectedMarker.description}</p>
        </Popup>
      )}
    </ReactMapGL>
  );
};

export default Map;
