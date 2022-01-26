import React, { useState, useEffect } from 'react';
import MapGL, { Marker, Popup, WebMercatorViewport } from 'react-map-gl';
import linestring from 'turf-linestring';
import bbox from '@turf/bbox';

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
    width: window.innerWidth,
    height: window.innerHeight,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  const [selectedMarker, setSelectedMarker] = useState(null);

  const markerClickHandler = location => {
    setSelectedMarker(location);
  };

  useEffect(() => {
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
    });
  }, []);

  return (
    <MapGL
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
    </MapGL>
  );
};

export default Map;
