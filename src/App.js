import { useState } from 'react';
import CheckIns from './components/CheckIns';
import Map from './components/Map';

const App = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
    <div>
      <Map selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} />
      <CheckIns selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} />
    </div>
  );
};

export default App;
