import { useEffect, useState } from 'react';

import CheckIns from './components/CheckIns';
import Controls from './components/Controls';
import Map from './components/Map';

const App = () => {
  const [checkInLocations, setCheckInLocations] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight - 150,
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

  useEffect(() => {
    fetchCheckInLocations();
  }, []);

  return (
    <div>
      <Map
        checkInLocations={checkInLocations}
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
        viewport={viewport}
        setViewport={setViewport}
      />
      <Controls
        checkInLocations={checkInLocations}
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
        viewport={viewport}
        setViewport={setViewport}
      />
      <CheckIns
        checkInLocations={checkInLocations}
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
        viewport={viewport}
        setViewport={setViewport}
      />
    </div>
  );
};

export default App;
