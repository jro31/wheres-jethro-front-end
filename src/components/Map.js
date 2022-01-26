import * as React from 'react';
import { useState } from 'react';
import ReactMapGL from 'react-map-gl';

function Map() {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  return (
    <ReactMapGL
      {...viewport}
      mapStyle='mapbox://styles/mapbox/satellite-streets-v11'
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    />
  );
}

export default Map;
