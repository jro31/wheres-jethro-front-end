import { useState } from 'react';

import CheckIns from './components/CheckIns';
import Controls from './components/Controls';
import Map from './components/Map';

const DUMMY_DATA = [
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

const App = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight - 150,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  return (
    <div>
      <Map
        checkInLocations={DUMMY_DATA}
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
        viewport={viewport}
        setViewport={setViewport}
      />
      <Controls
        checkInLocations={DUMMY_DATA}
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
        viewport={viewport}
        setViewport={setViewport}
      />
      <CheckIns
        checkInLocations={DUMMY_DATA}
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
        viewport={viewport}
        setViewport={setViewport}
      />
    </div>
  );
};

export default App;
