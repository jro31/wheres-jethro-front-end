import { useState } from 'react';
import useCentreMap from '../hooks/use-centre-map';
import useGetCurrentLocation from '../hooks/use-get-current-location';

const Controls = props => {
  const [currentLocation, setCurrentLocation] = useState({});

  const centreMap = useCentreMap();
  const getCurrentLocation = useGetCurrentLocation();

  const getCurrentLocationHandler = () => {
    getCurrentLocation(setCurrentLocation);
  };

  console.log(currentLocation);

  return (
    <div>
      <button
        onClick={() =>
          centreMap(
            props.checkInLocations,
            props.setSelectedMarker,
            props.viewport,
            props.setViewport
          )
        }
      >
        Centre map
      </button>
      <button onClick={getCurrentLocationHandler}>Get current location</button>
    </div>
  );
};

export default Controls;
